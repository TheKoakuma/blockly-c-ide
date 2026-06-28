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

// Tipos numéricos reutilizados em vários blocos.
const NUMERIC_TYPES = [
  ['int', 'int'],
  ['float', 'float'],
  ['double', 'double'],
  ['char', 'char'],
];

Blockly.defineBlocksWithJsonArray([
  // ---- Funções ----
  {
    type: 'c_function',
    message0: '%1 %2 ( %3 )',
    args0: [
      { type: 'field_dropdown', name: 'TYPE', options: [...NUMERIC_TYPES, ['void', 'void']] },
      { type: 'field_input', name: 'NAME', text: 'minhaFuncao' },
      { type: 'field_input', name: 'PARAMS', text: '' },
    ],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'BODY' }],
    message2: 'return %1',
    args2: [{ type: 'input_value', name: 'RETURN' }],
    colour: 290,
    tooltip:
      'Define uma função: tipo de retorno, nome, parâmetros (ex.: int a, int b) e o valor retornado. Use void para função sem retorno.',
  },
  {
    type: 'c_return',
    message0: 'return %1',
    args0: [{ type: 'input_value', name: 'VALUE' }],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 290,
    tooltip: 'Retorna um valor da função (ou nada, se vazio).',
  },
  {
    type: 'c_call',
    message0: '%1 ( %2 )',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'minhaFuncao' },
      { type: 'field_input', name: 'ARGS', text: '' },
    ],
    output: null,
    inputsInline: true,
    colour: 290,
    tooltip: 'Chama uma função e usa o valor que ela retorna. Argumentos separados por vírgula.',
  },

  // ---- Vetores ----
  {
    type: 'c_array_declare',
    message0: '%1 %2 [ %3 ]',
    args0: [
      { type: 'field_dropdown', name: 'TYPE', options: NUMERIC_TYPES },
      { type: 'field_input', name: 'NAME', text: 'v' },
      { type: 'field_number', name: 'SIZE', value: 10, min: 1, precision: 1 },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 20,
    tooltip: 'Declara um vetor (array) de tamanho fixo.',
  },
  {
    type: 'c_array_set',
    message0: '%1 [ %2 ] = %3',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'v' },
      { type: 'input_value', name: 'INDEX' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 20,
    tooltip: 'Atribui um valor a uma posição do vetor.',
  },
  {
    type: 'c_array_get',
    message0: '%1 [ %2 ]',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'v' },
      { type: 'input_value', name: 'INDEX' },
    ],
    output: null,
    inputsInline: true,
    colour: 20,
    tooltip: 'Lê o valor de uma posição do vetor.',
  },

  // ---- Matrizes ----
  {
    type: 'c_matrix_declare',
    message0: '%1 %2 [ %3 ] [ %4 ]',
    args0: [
      { type: 'field_dropdown', name: 'TYPE', options: NUMERIC_TYPES },
      { type: 'field_input', name: 'NAME', text: 'm' },
      { type: 'field_number', name: 'ROWS', value: 3, min: 1, precision: 1 },
      { type: 'field_number', name: 'COLS', value: 3, min: 1, precision: 1 },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 40,
    tooltip: 'Declara uma matriz (array 2D) de tamanho fixo.',
  },
  {
    type: 'c_matrix_set',
    message0: '%1 [ %2 ] [ %3 ] = %4',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'm' },
      { type: 'input_value', name: 'ROW' },
      { type: 'input_value', name: 'COL' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 40,
    tooltip: 'Atribui um valor a uma posição da matriz.',
  },
  {
    type: 'c_matrix_get',
    message0: '%1 [ %2 ] [ %3 ]',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'm' },
      { type: 'input_value', name: 'ROW' },
      { type: 'input_value', name: 'COL' },
    ],
    output: null,
    inputsInline: true,
    colour: 40,
    tooltip: 'Lê o valor de uma posição da matriz.',
  },

  // ---- Structs ----
  {
    type: 'c_struct_define',
    message0: 'struct %1 { %2 }',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'Ponto' },
      { type: 'field_input', name: 'FIELDS', text: 'int x; int y;' },
    ],
    inputsInline: true,
    colour: 60,
    tooltip: 'Define um tipo struct. Campos separados por ponto e vírgula (ex.: int x; float y;).',
  },
  {
    type: 'c_struct_declare',
    message0: 'struct %1 %2',
    args0: [
      { type: 'field_input', name: 'TYPE', text: 'Ponto' },
      { type: 'field_input', name: 'NAME', text: 'p' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 60,
    tooltip: 'Declara uma variável de um tipo struct.',
  },
  {
    type: 'c_struct_set',
    message0: '%1 . %2 = %3',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'p' },
      { type: 'field_input', name: 'MEMBER', text: 'x' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 60,
    tooltip: 'Atribui um valor a um campo da struct.',
  },
  {
    type: 'c_struct_get',
    message0: '%1 . %2',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'p' },
      { type: 'field_input', name: 'MEMBER', text: 'x' },
    ],
    output: null,
    inputsInline: true,
    colour: 60,
    tooltip: 'Lê o valor de um campo da struct.',
  },

  // ---- Ponteiros ----
  {
    type: 'c_pointer_declare',
    message0: '%1 * %2 = %3',
    args0: [
      { type: 'field_dropdown', name: 'TYPE', options: NUMERIC_TYPES },
      { type: 'field_input', name: 'NAME', text: 'p' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 340,
    tooltip: 'Declara um ponteiro. Deixe o valor vazio para não inicializar.',
  },
  {
    type: 'c_address_of',
    message0: '& %1',
    args0: [{ type: 'field_input', name: 'NAME', text: 'x' }],
    output: null,
    inputsInline: true,
    colour: 340,
    tooltip: 'Endereço de uma variável (&x).',
  },
  {
    type: 'c_deref_get',
    message0: '* %1',
    args0: [{ type: 'field_input', name: 'NAME', text: 'p' }],
    output: null,
    inputsInline: true,
    colour: 340,
    tooltip: 'Valor apontado por um ponteiro (*p).',
  },
  {
    type: 'c_deref_set',
    message0: '* %1 = %2',
    args0: [
      { type: 'field_input', name: 'NAME', text: 'p' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 340,
    tooltip: 'Atribui ao valor apontado (*p = ...).',
  },
]);
