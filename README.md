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

🚧 **Fases 1–3 concluídas + extensões.** O aluno monta blocos, vê o C gerado ao vivo e **executa** no navegador (compilador clang real em WASM via `@wasmer/sdk`), com saída, stdin e código de saída. Além do MVP há blocos de **funções** (com retorno), **vetores, matrizes, structs, ponteiros** e **memória dinâmica** (malloc/calloc/free). Próximo: trilha de aprendizado (Fase 4). Ver [ROADMAP](docs/ROADMAP.md).

> ⚠️ A execução exige **isolamento cross-origin** (headers COOP/COEP, já configurados) e baixa o compilador clang (~100 MB) do registro Wasmer no primeiro uso. Ver [D8](docs/DECISIONS.md).

## Documentação

| Documento | Para quê |
|-----------|----------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Como o sistema é estruturado (camadas, fluxo de dados, módulos). |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Fases de desenvolvimento e o que entregar em cada uma. |
| [docs/BLOCKS.md](docs/BLOCKS.md) | Catálogo de blocos e seu mapeamento para C. |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Decisões técnicas e questões em aberto (stack, execução de C, Docker). |
| [CLAUDE.md](CLAUDE.md) | Contexto rápido para retomar o trabalho em sessões futuras. |

## Stack

Vite + React + TypeScript, com Blockly. Execução do C no navegador via WebAssembly. Ver [DECISIONS.md](docs/DECISIONS.md).

## Como rodar

### Local (Node)

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # typecheck + build de produção
npm run preview  # servir o build localmente
```

### Docker

```bash
docker compose --profile dev up            # dev com HMR  -> http://localhost:5173
docker compose --profile prod up --build   # produção     -> http://localhost:8088
```

## Deploy

O build (`npm run build`) gera arquivos **estáticos** em `dist/`, serviíveis por qualquer web server.

### ⚠️ HTTPS é obrigatório em produção

A execução de C usa **`SharedArrayBuffer`**, que o navegador só habilita em **contexto seguro**:
**HTTPS** ou `localhost`. Acessar por `http://` num domínio ou IP **não funciona** — o navegador
desativa o isolamento cross-origin e a execução falha (erro parecido com CORS ao clicar em
Executar), **mesmo com os headers COOP/COEP corretos**. Não há como contornar isso em código.

Além do HTTPS, o servidor precisa enviar os headers de isolamento cross-origin:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: credentialless
```
A imagem de produção (nginx) já os envia — ver [docker/nginx.conf](docker/nginx.conf). Se você usar
um **proxy reverso** na frente, garanta que ele **repasse** esses headers (não os remova) e um
fallback de SPA para `index.html`.

### Opção turnkey: HTTPS automático (Caddy + Let's Encrypt)

O perfil `https` do compose sobe o app (nginx interno) atrás de um [Caddy](https://caddyserver.com/)
que emite e renova o certificado TLS sozinho. Requer que o **DNS do domínio aponte para o servidor**
e que as **portas 80 e 443** estejam abertas.

```bash
DOMAIN=meusite.com docker compose --profile https up --build -d
# app disponível em https://meusite.com
```

### Alternativa: seu próprio proxy TLS

Se já administra nginx/Apache/Traefik com TLS, faça proxy para o container `prod` (porta 8088) e
**preserve os headers COOP/COEP** (ou os defina no próprio proxy).

Não há variáveis de ambiente nem segredos a configurar no app (ver [.env.example](.env.example)).

## Licença

A definir.
