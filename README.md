# bloCkly

IDE web para **aprendizado da linguagem C** usando blocos visuais ([Blockly](https://developers.google.com/blockly)).

O aluno monta o programa arrastando blocos; a aplicação gera o código C equivalente em tempo real, mostra esse código lado a lado e permite executá-lo — fechando o ciclo entre "lógica visual" e "sintaxe da linguagem".

## Objetivo

Reduzir a barreira de entrada da linguagem C. Em vez de lutar contra ponto-e-vírgula, chaves e declaração de tipos logo no início, o aluno raciocina com blocos e **observa** a sintaxe C correspondente sendo construída. À medida que avança, faz a transição do bloco para o texto.

## Funcionalidades-alvo

- **Workspace Blockly** com um conjunto de blocos mapeados para construções de C (variáveis, tipos, `if`/`else`, laços, funções, `printf`/`scanf`, arrays).
- **Geração de código C** ao vivo a partir dos blocos.
- **Painel de código** mostrando o C gerado (somente leitura no MVP).
- **Execução** do programa com exibição de saída (stdout) e entrada (stdin).
- **Trilha de aprendizado**: lições/desafios progressivos.

## Status

🚧 **Fase 0 — Planejamento.** Ainda sem código de aplicação. A documentação abaixo guia as próximas etapas.

## Documentação

| Documento | Para quê |
|-----------|----------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Como o sistema é estruturado (camadas, fluxo de dados, módulos). |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Fases de desenvolvimento e o que entregar em cada uma. |
| [docs/BLOCKS.md](docs/BLOCKS.md) | Catálogo de blocos e seu mapeamento para C. |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Decisões técnicas e questões em aberto (stack, execução de C). |
| [CLAUDE.md](CLAUDE.md) | Contexto rápido para retomar o trabalho em sessões futuras. |

## Stack

Vite + React + TypeScript, com Blockly. Execução do C no navegador via WebAssembly. Ver [DECISIONS.md](docs/DECISIONS.md).

## Como começar (após o scaffold)

> Ainda não há aplicação. Os comandos de `dev`/`build` serão preenchidos quando a Fase 1 (scaffold) for iniciada — ver [ROADMAP](docs/ROADMAP.md).

## Licença

A definir.
