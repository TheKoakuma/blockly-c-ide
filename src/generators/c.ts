import * as Blockly from 'blockly';

/**
 * Gerador Blockly → C.
 *
 * Precedência de operadores (menor número = liga mais forte), seguindo C.
 * `valueToCode` usa esses valores para decidir quando inserir parênteses.
 */
export const Order = {
  ATOMIC: 0,
  UNARY: 2,
  MULTIPLICATIVE: 3,
  ADDITIVE: 4,
  RELATIONAL: 6,
  EQUALITY: 7,
  LOGICAL_AND: 11,
  LOGICAL_OR: 12,
  ASSIGNMENT: 14,
  NONE: 99,
} as const;

export const cGenerator = new Blockly.Generator('C');
cGenerator.INDENT = '  ';

/** Garante um identificador C válido a partir do texto digitado pelo aluno. */
function sanitizeId(raw: string): string {
  const cleaned = (raw || '').replace(/[^A-Za-z0-9_]/g, '_');
  return /^[A-Za-z_]/.test(cleaned) ? cleaned : `_${cleaned}`;
}

/** Tabela nome→tipo das variáveis, montada em `init` a partir dos blocos de declaração. */
const varTypes: Record<string, string> = {};

/** Especificador de formato de printf/scanf inferido do tipo da expressão. */
function formatSpecifier(target: Blockly.Block | null): string {
  if (!target) return '%d';
  switch (target.type) {
    case 'c_text':
      return '%s';
    case 'c_char':
      return '%c';
    case 'c_number':
      return String(target.getFieldValue('NUM')).includes('.') ? '%f' : '%d';
    case 'c_var_get': {
      const t = varTypes[sanitizeId(target.getFieldValue('NAME'))];
      if (t === 'char') return '%c';
      if (t === 'float' || t === 'double') return '%f';
      return '%d';
    }
    default:
      return '%d';
  }
}

type Gen = typeof cGenerator;

// ---- Estrutura ----
cGenerator.forBlock['c_main'] = function (block, gen: Gen) {
  const body = gen.statementToCode(block, 'BODY');
  return `int main(void) {\n${body}${gen.INDENT}return 0;\n}\n`;
};

// ---- Variáveis ----
cGenerator.forBlock['c_var_declare'] = function (block, gen: Gen) {
  const type = block.getFieldValue('TYPE');
  const name = sanitizeId(block.getFieldValue('NAME'));
  const value = gen.valueToCode(block, 'VALUE', Order.ASSIGNMENT);
  return value ? `${type} ${name} = ${value};\n` : `${type} ${name};\n`;
};

cGenerator.forBlock['c_var_set'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const value = gen.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
  return `${name} = ${value};\n`;
};

cGenerator.forBlock['c_var_get'] = function (block) {
  return [sanitizeId(block.getFieldValue('NAME')), Order.ATOMIC];
};

// ---- Entrada / Saída ----
cGenerator.forBlock['c_printf'] = function (block, gen: Gen) {
  const value = gen.valueToCode(block, 'VALUE', Order.NONE) || '0';
  const fmt = formatSpecifier(block.getInputTargetBlock('VALUE'));
  return `printf("${fmt}\\n", ${value});\n`;
};

cGenerator.forBlock['c_scanf'] = function (block) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const t = varTypes[name];
  const fmt = t === 'char' ? '%c' : t === 'float' || t === 'double' ? '%f' : '%d';
  return `scanf("${fmt}", &${name});\n`;
};

// ---- Controle ----
cGenerator.forBlock['c_if'] = function (block, gen: Gen) {
  const cond = gen.valueToCode(block, 'COND', Order.NONE) || '0';
  const doCode = gen.statementToCode(block, 'DO');
  let code = `if (${cond}) {\n${doCode}}`;
  const elseCode = gen.statementToCode(block, 'ELSE');
  if (elseCode.trim()) code += ` else {\n${elseCode}}`;
  return code + '\n';
};

cGenerator.forBlock['c_for'] = function (block, gen: Gen) {
  const v = sanitizeId(block.getFieldValue('VAR') || 'i');
  const from = gen.valueToCode(block, 'FROM', Order.ASSIGNMENT) || '0';
  const to = gen.valueToCode(block, 'TO', Order.RELATIONAL) || '0';
  const body = gen.statementToCode(block, 'DO');
  return `for (int ${v} = ${from}; ${v} <= ${to}; ${v}++) {\n${body}}\n`;
};

cGenerator.forBlock['c_while'] = function (block, gen: Gen) {
  const cond = gen.valueToCode(block, 'COND', Order.NONE) || '0';
  const body = gen.statementToCode(block, 'DO');
  return `while (${cond}) {\n${body}}\n`;
};

// ---- Operadores ----
cGenerator.forBlock['c_arithmetic'] = function (block, gen: Gen) {
  const op = block.getFieldValue('OP');
  const order = op === '+' || op === '-' ? Order.ADDITIVE : Order.MULTIPLICATIVE;
  const a = gen.valueToCode(block, 'A', order) || '0';
  const b = gen.valueToCode(block, 'B', order) || '0';
  return [`${a} ${op} ${b}`, order];
};

cGenerator.forBlock['c_compare'] = function (block, gen: Gen) {
  const op = block.getFieldValue('OP');
  const order = op === '==' || op === '!=' ? Order.EQUALITY : Order.RELATIONAL;
  const a = gen.valueToCode(block, 'A', order) || '0';
  const b = gen.valueToCode(block, 'B', order) || '0';
  return [`${a} ${op} ${b}`, order];
};

cGenerator.forBlock['c_logic'] = function (block, gen: Gen) {
  const op = block.getFieldValue('OP');
  const order = op === '&&' ? Order.LOGICAL_AND : Order.LOGICAL_OR;
  const a = gen.valueToCode(block, 'A', order) || '0';
  const b = gen.valueToCode(block, 'B', order) || '0';
  return [`${a} ${op} ${b}`, order];
};

cGenerator.forBlock['c_not'] = function (block, gen: Gen) {
  const a = gen.valueToCode(block, 'BOOL', Order.UNARY) || '0';
  return [`!${a}`, Order.UNARY];
};

// ---- Valores ----
cGenerator.forBlock['c_number'] = function (block) {
  return [String(block.getFieldValue('NUM')), Order.ATOMIC];
};

cGenerator.forBlock['c_text'] = function (block) {
  const text = String(block.getFieldValue('TEXT')).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return [`"${text}"`, Order.ATOMIC];
};

cGenerator.forBlock['c_char'] = function (block) {
  const ch = String(block.getFieldValue('CHAR') || ' ')
    .charAt(0)
    .replace(/'/g, "\\'");
  return [`'${ch}'`, Order.ATOMIC];
};

// ---- Ciclo de vida do gerador ----
cGenerator.init = function (workspace) {
  for (const k of Object.keys(varTypes)) delete varTypes[k];
  for (const b of workspace.getAllBlocks(false)) {
    if (b.type === 'c_var_declare') {
      const n = sanitizeId(b.getFieldValue('NAME'));
      if (n) varTypes[n] = b.getFieldValue('TYPE');
    }
  }
};

cGenerator.finish = function (code) {
  return `#include <stdio.h>\n\n${code}`;
};

// Encadeia o próximo bloco da pilha de statements.
// (cast: scrub_ é protegido na classe base.)
(cGenerator as unknown as {
  scrub_: (block: Blockly.Block, code: string, thisOnly?: boolean) => string;
}).scrub_ = function (this: Gen, block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + (this.blockToCode(nextBlock) as string);
  }
  return code;
};
