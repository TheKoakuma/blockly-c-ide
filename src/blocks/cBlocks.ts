import * as Blockly from 'blockly';

/**
 * Definições dos blocos de C do MVP. Os rótulos usam palavras-chave e símbolos
 * da própria linguagem (printf, if, for, while, ==, &&) para serem o mais
 * neutros de idioma possível e já familiarizar o aluno com a sintaxe.
 *
 * Mapeamento bloco → C documentado em docs/BLOCKS.md.
 */
Blockly.defineBlocksWithJsonArray([
  // ---- Estrutura ----
  {
    type: 'c_main',
    message0: 'int main(void) %1',
    args0: [{ type: 'input_statement', name: 'BODY' }],
    colour: 200,
    tooltip: 'Função principal do programa. Tudo aqui dentro é executado.',
    helpUrl: '',
  },

  // ---- Variáveis ----
  {
    type: 'c_var_declare',
    message0: '%1 %2 = %3',
    args0: [
      {
        type: 'field_dropdown',
        name: 'TYPE',
        options: [
          ['int', 'int'],
          ['float', 'float'],
          ['double', 'double'],
          ['char', 'char'],
        ],
      },
      { type: 'field_input', name: 'NAME', text: 'x' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 330,
    tooltip: 'Declara uma variável com um tipo e valor inicial.',
  },
  {
    type: 'c_var_set',
    message0: '%1 = %2',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'x' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 330,
    tooltip: 'Atribui um novo valor a uma variável existente.',
  },
  {
    type: 'c_var_get',
    message0: '%1',
    args0: [{ type: 'field_input', name: 'NAME', text: 'x' }],
    output: null,
    colour: 330,
    tooltip: 'Lê o valor de uma variável.',
  },

  // ---- Entrada / Saída ----
  {
    type: 'c_printf',
    message0: 'printf %1',
    args0: [{ type: 'input_value', name: 'VALUE' }],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 160,
    tooltip: 'Imprime um valor na tela (com quebra de linha).',
  },
  {
    type: 'c_scanf',
    message0: 'scanf → %1',
    args0: [{ type: 'field_input', name: 'NAME', text: 'x' }],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: 'Lê um valor digitado pelo usuário para dentro de uma variável.',
  },

  // ---- Controle ----
  {
    type: 'c_if',
    message0: 'if ( %1 )',
    args0: [{ type: 'input_value', name: 'COND' }],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    message2: 'else %1',
    args2: [{ type: 'input_statement', name: 'ELSE' }],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: 'Executa um bloco se a condição for verdadeira; senão, o bloco else.',
  },
  {
    type: 'c_for',
    message0: 'for %1 = %2 to %3',
    args0: [
      { type: 'field_input', name: 'VAR', text: 'i' },
      { type: 'input_value', name: 'FROM' },
      { type: 'input_value', name: 'TO' },
    ],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 120,
    tooltip: 'Repete o bloco com um contador que vai de um valor inicial até um final.',
  },
  {
    type: 'c_while',
    message0: 'while ( %1 )',
    args0: [{ type: 'input_value', name: 'COND' }],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: 'Repete o bloco enquanto a condição for verdadeira.',
  },

  // ---- Operadores ----
  {
    type: 'c_arithmetic',
    message0: '%1 %2 %3',
    args0: [
      { type: 'input_value', name: 'A' },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['+', '+'],
          ['−', '-'],
          ['×', '*'],
          ['÷', '/'],
          ['%', '%'],
        ],
      },
      { type: 'input_value', name: 'B' },
    ],
    output: null,
    inputsInline: true,
    colour: 230,
    tooltip: 'Operação aritmética entre dois valores.',
  },
  {
    type: 'c_compare',
    message0: '%1 %2 %3',
    args0: [
      { type: 'input_value', name: 'A' },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['=', '=='],
          ['≠', '!='],
          ['<', '<'],
          ['>', '>'],
          ['≤', '<='],
          ['≥', '>='],
        ],
      },
      { type: 'input_value', name: 'B' },
    ],
    output: null,
    inputsInline: true,
    colour: 270,
    tooltip: 'Compara dois valores. Resulta em verdadeiro (1) ou falso (0).',
  },
  {
    type: 'c_logic',
    message0: '%1 %2 %3',
    args0: [
      { type: 'input_value', name: 'A' },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['&&', '&&'],
          ['||', '||'],
        ],
      },
      { type: 'input_value', name: 'B' },
    ],
    output: null,
    inputsInline: true,
    colour: 200,
    tooltip: 'E lógico (&&) / OU lógico (||).',
  },
  {
    type: 'c_not',
    message0: '! %1',
    args0: [{ type: 'input_value', name: 'BOOL' }],
    output: null,
    colour: 200,
    tooltip: 'Negação lógica.',
  },

  // ---- Valores ----
  {
    type: 'c_number',
    message0: '%1',
    args0: [{ type: 'field_number', name: 'NUM', value: 0 }],
    output: null,
    colour: 100,
    tooltip: 'Um número.',
  },
  {
    type: 'c_text',
    message0: '" %1 "',
    args0: [{ type: 'field_input', name: 'TEXT', text: 'texto' }],
    output: null,
    colour: 45,
    tooltip: 'Um texto (string).',
  },
  {
    type: 'c_char',
    message0: "' %1 '",
    args0: [{ type: 'field_input', name: 'CHAR', text: 'a' }],
    output: null,
    colour: 45,
    tooltip: 'Um único caractere.',
  },
]);
