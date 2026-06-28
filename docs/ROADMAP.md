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
- [x] **Dockerização**: Dockerfile de produção (nginx) + Dockerfile.dev + docker-compose (perfis dev/prod)
- **Entrega:** ✅ dá pra arrastar blocos e o estado sobrevive ao reload; app roda em container.

> **Requisito transversal — Dockerização:** o projeto deve ser executável via Docker em
> qualquer fase. Mudanças futuras (ex.: backend de execução na Fase 3) precisam ser
> refletidas no `docker-compose.yml`. Ver [DECISIONS.md → D7](DECISIONS.md#d7--dockerização).

## Fase 2 — Blocos de C + geração de código ✅
- [x] Definir blocos de C do MVP (ver [BLOCKS.md](BLOCKS.md)): `main`, variável, `printf`, `scanf`, `if/else`, `for`, `while`, operadores, literais
- [x] Implementar o gerador Blockly → C (`src/generators/c.ts`), com precedência/parênteses e inferência de formato do `printf`/`scanf`
- [x] Painel de código com realce de sintaxe mostrando o C ao vivo
- [x] Bloco `main` semeado por padrão; toolbox por categorias de C
- **Entrega:** ✅ montar blocos gera C compilável visível na tela.
  Validado em compilador real (gcc 14, `-Wall -Wextra`, sem avisos).

## Fase 3 — Execução ✅
- [x] Toolchain escolhido: `@wasmer/sdk` + `clang/clang` (compilador C real em WASM) — ver D8
- [x] Implementar `CRunner` (`src/runner/`) com a impl. Wasmer
- [x] Botão **Executar** + console de saída (stdout/stderr) com estados (baixando/compilando/executando)
- [x] Suporte a stdin
- [x] Tratamento de erros de compilação/execução na UI
- [x] Headers de isolamento cross-origin (COOP/COEP) no Vite e no nginx
- **Entrega:** ✅ aluno monta, gera e **roda** um programa em C.
  Validado no navegador: compila e executa de verdade (saída + stdin/scanf + exit code).

## Extensão — Estruturas de dados e funções ✅
Adicionada a pedido, além do MVP (ver [BLOCKS.md](BLOCKS.md)):
- [x] Bloco de **função** com tipo de retorno + `return` + bloco de **chamada**
- [x] **Vetores** (declarar/atribuir/ler)
- [x] **Matrizes** 2D (declarar/atribuir/ler)
- [x] **Structs** (definir/declarar/atribuir campo/ler campo)
- [x] **Ponteiros** (declarar, `&`, `*` leitura e atribuição)
- **Validado:** programa usando todos eles compila e roda (gcc `-Wall -Wextra` e no navegador via Wasmer → `8 / 8 / 7 / 9`).

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
