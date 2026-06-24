# Roadmap

Fases incrementais. Cada fase termina com algo **demonstrável**. Marque `[x]` ao concluir.

## Fase 0 — Planejamento ✅ (atual)
- [x] Inicializar repositório git
- [x] Documentação de navegação (este conjunto de docs)
- [x] Fechar decisões críticas em [DECISIONS.md](DECISIONS.md): **stack** (Vite + React + TS) e **runtime** (WASM no navegador)

## Fase 1 — Scaffold + Workspace Blockly ✅
- [x] Scaffold com Vite + React + TypeScript e rodar `dev`
- [x] Integrar Blockly e renderizar um workspace vazio
- [x] Toolbox mínima com blocos nativos do Blockly (lógica, laços, matemática, texto, variáveis)
- [x] Persistência do workspace em `localStorage` (com debounce)
- [x] Base de i18n (PT-BR/EN) e painel de código CodeMirror somente-leitura
- **Entrega:** ✅ dá pra arrastar blocos e o estado sobrevive ao reload.

## Fase 2 — Blocos de C + geração de código
- [ ] Definir blocos de C do MVP (ver [BLOCKS.md](BLOCKS.md)): `main`, variável, `printf`, `if/else`, `for`, `while`, operadores
- [ ] Implementar o gerador Blockly → C
- [ ] Painel de código com realce de sintaxe mostrando o C ao vivo
- **Entrega:** montar blocos gera C compilável visível na tela.

## Fase 3 — Execução
- [ ] Escolher toolchain/interpretador C em WASM (ver D2)
- [ ] Implementar `CRunner` em WebAssembly
- [ ] Botão **Executar** + console de saída (stdout/stderr)
- [ ] Suporte a stdin
- [ ] Tratamento de erros de compilação/execução na UI
- **Entrega:** aluno monta, gera e **roda** um programa em C.

## Fase 4 — Trilha de aprendizado
- [ ] Modelo de lição (objetivo, blocos disponíveis, validação)
- [ ] 3–5 lições iniciais (olá mundo → variáveis → condicionais → laços)
- [ ] Progresso do aluno
- **Entrega:** percurso guiado de aprendizado funcional.

## Fase 5 — Polimento
- [ ] Responsividade / layout
- [ ] Acessibilidade e i18n (PT/EN)
- [ ] Export/import de projeto do aluno
- [ ] Testes (gerador de C e validação de lições)

## Fora de escopo (por enquanto)
- Edição bidirecional texto → blocos
- Ponteiros avançados, structs, alocação dinâmica
- Multiusuário / contas / backend de persistência
