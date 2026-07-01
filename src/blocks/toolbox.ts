import type * as Blockly from 'blockly';

/**
 * Toolbox da Fase 2: blocos de C customizados (ver cBlocks.ts e docs/BLOCKS.md).
 * As cores de cada categoria acompanham a cor dos blocos correspondentes.
 */
export const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Estrutura',
      colour: '200',
      contents: [{ kind: 'block', type: 'c_main' }],
    },
    {
      kind: 'category',
      name: 'Variáveis',
      colour: '330',
      contents: [
        { kind: 'block', type: 'c_var_declare' },
        { kind: 'block', type: 'c_var_set' },
        { kind: 'block', type: 'c_var_get' },
      ],
    },
    {
      kind: 'category',
      name: 'Entrada / Saída',
      colour: '160',
      contents: [
        { kind: 'block', type: 'c_printf' },
        { kind: 'block', type: 'c_scanf' },
      ],
    },
    {
      kind: 'category',
      name: 'Controle',
      colour: '210',
      contents: [
        { kind: 'block', type: 'c_if' },
        { kind: 'block', type: 'c_for' },
        { kind: 'block', type: 'c_while' },
      ],
    },
    {
      kind: 'category',
      name: 'Operadores',
      colour: '230',
      contents: [
        { kind: 'block', type: 'c_arithmetic' },
        { kind: 'block', type: 'c_compare' },
        { kind: 'block', type: 'c_logic' },
        { kind: 'block', type: 'c_not' },
      ],
    },
    {
      kind: 'category',
      name: 'Funções',
      colour: '290',
      contents: [
        { kind: 'block', type: 'c_function' },
        { kind: 'block', type: 'c_return' },
        { kind: 'block', type: 'c_call' },
      ],
    },
    {
      kind: 'category',
      name: 'Vetores',
      colour: '20',
      contents: [
        { kind: 'block', type: 'c_array_declare' },
        { kind: 'block', type: 'c_array_set' },
        { kind: 'block', type: 'c_array_get' },
      ],
    },
    {
      kind: 'category',
      name: 'Matrizes',
      colour: '40',
      contents: [
        { kind: 'block', type: 'c_matrix_declare' },
        { kind: 'block', type: 'c_matrix_set' },
        { kind: 'block', type: 'c_matrix_get' },
      ],
    },
    {
      kind: 'category',
      name: 'Structs',
      colour: '60',
      contents: [
        { kind: 'block', type: 'c_struct_define' },
        { kind: 'block', type: 'c_struct_declare' },
        { kind: 'block', type: 'c_struct_set' },
        { kind: 'block', type: 'c_struct_get' },
      ],
    },
    {
      kind: 'category',
      name: 'Ponteiros',
      colour: '340',
      contents: [
        { kind: 'block', type: 'c_pointer_declare' },
        { kind: 'block', type: 'c_address_of' },
        { kind: 'block', type: 'c_deref_get' },
        { kind: 'block', type: 'c_deref_set' },
      ],
    },
    {
      kind: 'category',
      name: 'Memória',
      colour: '0',
      contents: [
        { kind: 'block', type: 'c_malloc' },
        { kind: 'block', type: 'c_calloc' },
        { kind: 'block', type: 'c_free' },
      ],
    },
    {
      kind: 'category',
      name: 'Valores',
      colour: '100',
      contents: [
        { kind: 'block', type: 'c_number' },
        { kind: 'block', type: 'c_text' },
        { kind: 'block', type: 'c_char' },
      ],
    },
  ],
};
