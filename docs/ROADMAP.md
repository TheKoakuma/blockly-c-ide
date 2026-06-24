# Roadmap

Fases incrementais. Cada fase termina com algo **demonstrável**. Marque `[x]` ao concluir.

## Fase 0 — Planejamento ✅ (atual)
- [x] Inicializar repositório git
- [x] Documentação de navegação (este conjunto de docs)
- [ ] Fechar decisões críticas em [DECISIONS.md](DECISIONS.md): **stack** e **runtime de execução**

## Fase 1 — Scaffold + Workspace Blockly
- [ ] Scaffold do projeto (stack escolhida) e rodar `dev`
- [ ] Integrar Blockly e renderizar um workspace vazio
- [ ] Toolbox mínima com blocos nativos do Blockly (lógica, matemática, texto)
- [ ] Persistência do workspace em `localStorage`
- **Entrega:** dá pra arrastar blocos e o estado sobrevive ao reload.

## Fase 2 — Blocos de C + geração de código
- [ ] Definir blocos de C do MVP (ver [BLOCKS.md](BLOCKS.md)): `main`, variável, `printf`, `if/else`, `for`, `while`, operadores
- [ ] Implementar o gerador Blockly → C
- [ ] Painel de código com realce de sintaxe mostrando o C ao vivo
- **Entrega:** montar blocos gera C compilável visível na tela.

## Fase 3 — Execução
- [ ] Implementar `CRunner` conforme decisão (WASM ou backend)
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
