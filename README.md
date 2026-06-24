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

🚧 **Fase 1 concluída** — scaffold + workspace Blockly funcionando. Próximo: blocos de C e geração de código (Fase 2). Ver [ROADMAP](docs/ROADMAP.md).

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

## Como rodar

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # typecheck + build de produção
npm run preview  # servir o build localmente
```

## Licença

A definir.
