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
