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

/** Mapeia um tipo C para o especificador de formato de printf/scanf. */
function specForType(t: string | undefined): string {
  if (t === 'char') return '%c';
  if (t === 'float' || t === 'double') return '%f';
  return '%d';
}

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
    case 'c_var_get':
    case 'c_array_get':
    case 'c_matrix_get':
    case 'c_deref_get':
      return specForType(varTypes[sanitizeId(target.getFieldValue('NAME'))]);
    case 'c_address_of':
      return '%p';
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

// ---- Funções ----
cGenerator.forBlock['c_function'] = function (block, gen: Gen) {
  const type = block.getFieldValue('TYPE');
  const name = sanitizeId(block.getFieldValue('NAME'));
  const params = String(block.getFieldValue('PARAMS') || '').trim() || 'void';
  const body = gen.statementToCode(block, 'BODY');
  let code = `${type} ${name}(${params}) {\n${body}`;
  if (type !== 'void') {
    const ret = gen.valueToCode(block, 'RETURN', Order.NONE) || '0';
    code += `${gen.INDENT}return ${ret};\n`;
  }
  return code + '}\n\n';
};

cGenerator.forBlock['c_return'] = function (block, gen: Gen) {
  const value = gen.valueToCode(block, 'VALUE', Order.NONE);
  return value ? `return ${value};\n` : 'return;\n';
};

cGenerator.forBlock['c_call'] = function (block) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const args = String(block.getFieldValue('ARGS') || '').trim();
  return [`${name}(${args})`, Order.ATOMIC];
};

// ---- Vetores ----
cGenerator.forBlock['c_array_declare'] = function (block) {
  const type = block.getFieldValue('TYPE');
  const name = sanitizeId(block.getFieldValue('NAME'));
  const size = block.getFieldValue('SIZE');
  return `${type} ${name}[${size}];\n`;
};

cGenerator.forBlock['c_array_set'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const index = gen.valueToCode(block, 'INDEX', Order.NONE) || '0';
  const value = gen.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
  return `${name}[${index}] = ${value};\n`;
};

cGenerator.forBlock['c_array_get'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const index = gen.valueToCode(block, 'INDEX', Order.NONE) || '0';
  return [`${name}[${index}]`, Order.ATOMIC];
};

// ---- Matrizes ----
cGenerator.forBlock['c_matrix_declare'] = function (block) {
  const type = block.getFieldValue('TYPE');
  const name = sanitizeId(block.getFieldValue('NAME'));
  return `${type} ${name}[${block.getFieldValue('ROWS')}][${block.getFieldValue('COLS')}];\n`;
};

cGenerator.forBlock['c_matrix_set'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const row = gen.valueToCode(block, 'ROW', Order.NONE) || '0';
  const col = gen.valueToCode(block, 'COL', Order.NONE) || '0';
  const value = gen.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
  return `${name}[${row}][${col}] = ${value};\n`;
};

cGenerator.forBlock['c_matrix_get'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const row = gen.valueToCode(block, 'ROW', Order.NONE) || '0';
  const col = gen.valueToCode(block, 'COL', Order.NONE) || '0';
  return [`${name}[${row}][${col}]`, Order.ATOMIC];
};

// ---- Structs ----
cGenerator.forBlock['c_struct_define'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const fields = String(block.getFieldValue('FIELDS') || '')
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean)
    .map((f) => `${gen.INDENT}${f};`)
    .join('\n');
  return `struct ${name} {\n${fields}${fields ? '\n' : ''}};\n\n`;
};

cGenerator.forBlock['c_struct_declare'] = function (block) {
  const type = sanitizeId(block.getFieldValue('TYPE'));
  const name = sanitizeId(block.getFieldValue('NAME'));
  return `struct ${type} ${name};\n`;
};

cGenerator.forBlock['c_struct_set'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const member = sanitizeId(block.getFieldValue('MEMBER'));
  const value = gen.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
  return `${name}.${member} = ${value};\n`;
};

cGenerator.forBlock['c_struct_get'] = function (block) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const member = sanitizeId(block.getFieldValue('MEMBER'));
  return [`${name}.${member}`, Order.ATOMIC];
};

// ---- Ponteiros ----
cGenerator.forBlock['c_pointer_declare'] = function (block, gen: Gen) {
  const type = block.getFieldValue('TYPE');
  const name = sanitizeId(block.getFieldValue('NAME'));
  const value = gen.valueToCode(block, 'VALUE', Order.ASSIGNMENT);
  return value ? `${type} *${name} = ${value};\n` : `${type} *${name};\n`;
};

cGenerator.forBlock['c_address_of'] = function (block) {
  return [`&${sanitizeId(block.getFieldValue('NAME'))}`, Order.UNARY];
};

cGenerator.forBlock['c_deref_get'] = function (block) {
  return [`*${sanitizeId(block.getFieldValue('NAME'))}`, Order.UNARY];
};

cGenerator.forBlock['c_deref_set'] = function (block, gen: Gen) {
  const name = sanitizeId(block.getFieldValue('NAME'));
  const value = gen.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
  return `*${name} = ${value};\n`;
};

// ---- Ciclo de vida do gerador ----
const DECLARE_BLOCKS = new Set([
  'c_var_declare',
  'c_array_declare',
  'c_matrix_declare',
  'c_pointer_declare',
]);

cGenerator.init = function (workspace) {
  for (const k of Object.keys(varTypes)) delete varTypes[k];
  for (const b of workspace.getAllBlocks(false)) {
    if (DECLARE_BLOCKS.has(b.type)) {
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

if (import.meta.env.DEV) {
  (window as unknown as { __cgen?: unknown }).__cgen = cGenerator;
}
