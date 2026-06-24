# CLAUDE.md

Contexto para retomar o trabalho neste repositório em sessões futuras.

## O que é
**bloCkly** — IDE web para aprender linguagem **C** com blocos visuais (Blockly). O aluno monta blocos, o app gera C compilável ao vivo, mostra o código e o executa.

## Estado atual
Fase 0 (planejamento). Só git + documentação; **ainda não há código de aplicação**.

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
