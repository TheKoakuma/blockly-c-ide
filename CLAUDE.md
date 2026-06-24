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

## Antes de codar
Duas decisões ainda **não fechadas** (ver DECISIONS.md) e que bloqueiam o scaffold:
1. **Stack** (proposta: Vite + React + TS).
2. **Runtime de execução de C** (WASM no navegador vs. backend) — a mais crítica.

## Princípios do projeto
- Blocos são a fonte da verdade; o código C é **derivado** (pipeline unidirecional).
- O C gerado deve **compilar de verdade** — é o valor pedagógico.
- Execução fica atrás da interface `CRunner` para ser plugável.

## Ambiente
- Windows, shell padrão PowerShell. Git instalado.
- Quando houver app: atualizar README com os comandos de `dev`/`build`.
