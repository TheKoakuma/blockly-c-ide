# CLAUDE.md

Contexto para retomar o trabalho neste repositório em sessões futuras.

## O que é
**bloCkly** — IDE web para aprender linguagem **C** com blocos visuais (Blockly). O aluno monta blocos, o app gera C compilável ao vivo, mostra o código e o executa.

## Estado atual
**Fase 3 concluída.** App Vite + React + TS: blocos de C → gerador ao vivo (CodeMirror) → **execução no navegador** (clang real em WASM via `@wasmer/sdk`, atrás de `CRunner` em `src/runner/`). UI com botão Executar, console (stdout/stderr/exit), stdin. Isolamento cross-origin (COOP/COEP) no Vite e nginx. Verificado no navegador (compila e roda de verdade, inclusive scanf/stdin). Próximo: **Fase 4** — trilha de aprendizado (lições).

Detalhe do runtime: o `@wasmer/sdk` é carregado via **import dinâmico do CDN** (`SDK_URL` em `src/runner/wasmerRunner.ts`, pinado em 0.10.0), não como dependência npm — evita atrito do bundler com o worker do SDK. Execução é preguiçosa (baixa o clang só no 1º Executar).

Blocos disponíveis (ver docs/BLOCKS.md): além do MVP (main, variáveis, printf/scanf, if/else, for, while, operadores, literais), há **funções** (com tipo de retorno + return + chamada), **vetores**, **matrizes**, **structs** e **ponteiros** (`&`/`*`). Structs/funções são blocos de topo (como o main) — coloque-os acima do main (ordem de geração segue a posição vertical). Nota: `field_multilinetext` NÃO está registrado nesta build do Blockly — por isso campos de struct usam `field_input` separado por `;`. Em DEV, `window.__cgen` também expõe o gerador para depuração.

Comandos: `npm run dev` | `npm run build` | `npm run preview`.
Docker (requisito transversal — D7): `docker compose --profile dev up` (5173) | `docker compose --profile prod up --build` (8088). Manter o compose atualizado ao adicionar serviços.

Estrutura: `src/blocks/` (cBlocks = definições dos blocos de C, toolbox), `src/generators/c.ts` (gerador Blockly→C), `src/runner/` (CRunner + wasmerRunner), `src/components/` (BlocklyWorkspace, CodePanel, OutputConsole), `src/state/` (persistence), `src/i18n/` (locales), `src/App.tsx`. Em DEV, `window.__ws`/`window.__Blockly` expõem o workspace para depuração (removido no build de produção).

## Onde olhar primeiro
- [README.md](README.md) — visão geral e índice.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — pipeline blocos → C → execução e camadas.
- [docs/ROADMAP.md](docs/ROADMAP.md) — fases; a próxima ação está aqui.
- [docs/BLOCKS.md](docs/BLOCKS.md) — quais blocos gerar e o C de cada um.
- [docs/DECISIONS.md](docs/DECISIONS.md) — decisões em aberto (stack, runtime de C).

## Decisões já fechadas (ver DECISIONS.md)
1. **Stack:** Vite + React + TypeScript.
2. **Runtime de C:** execução no navegador via WASM (atrás da interface `CRunner`). Toolchain WASM específico ainda a escolher na Fase 3.

Próxima ação: **Fase 1 — scaffold** (ver ROADMAP.md).

## Princípios do projeto
- Blocos são a fonte da verdade; o código C é **derivado** (pipeline unidirecional).
- O C gerado deve **compilar de verdade** — é o valor pedagógico.
- Execução fica atrás da interface `CRunner` para ser plugável.

## Ambiente
- Windows, shell padrão PowerShell. Git instalado.
- Quando houver app: atualizar README com os comandos de `dev`/`build`.
