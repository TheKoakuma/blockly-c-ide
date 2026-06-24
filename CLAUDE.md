# CLAUDE.md

Contexto para retomar o trabalho neste repositório em sessões futuras.

## O que é
**bloCkly** — IDE web para aprender linguagem **C** com blocos visuais (Blockly). O aluno monta blocos, o app gera C compilável ao vivo, mostra o código e o executa.

## Estado atual
**Fase 1 concluída.** App Vite + React + TS funcionando: workspace Blockly com toolbox nativa, persistência em localStorage, i18n PT-BR/EN e painel de código CodeMirror (somente-leitura, mostrando placeholder). Próximo: **Fase 2** — blocos de C + gerador `blocos → C` (plugar em `App.handleWorkspaceChange`).

Comandos: `npm run dev` | `npm run build` | `npm run preview`.
Docker (requisito transversal — D7): `docker compose --profile dev up` (5173) | `docker compose --profile prod up --build` (8088). Manter o compose atualizado ao adicionar serviços.

Estrutura: `src/blocks/` (toolbox), `src/components/` (BlocklyWorkspace, CodePanel), `src/state/` (persistence), `src/i18n/` (locales), `src/App.tsx`.

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
