# Decisões técnicas

Registro de decisões (estilo ADR leve). Status: **proposta** | **aceita** | **revisar**.

---

## D1 — Stack de frontend
**Status:** ✅ aceita (2026-06-24)

**Decisão:** Vite + React + TypeScript.

**Razão:** Blockly tem boa integração com React; Vite dá dev server rápido e build simples; TypeScript ajuda a manter o gerador de C correto. Tudo client-side, sem necessidade de framework full-stack no MVP.

**Alternativas consideradas:** Vue, Svelte, ou JS puro com Blockly. Todas viáveis — a escolha não afeta a arquitetura em camadas.

---

## D2 — Como executar o código C
**Status:** ✅ aceita (2026-06-24) — **Opção A (WASM no navegador)**

**Decisão:** executar C no próprio navegador via WebAssembly, mantendo o projeto 100% client-side. A camada fica atrás da interface `CRunner` para permitir trocar a implementação sem reescrever a app.

**Toolchain (definido na Fase 3):** **`@wasmer/sdk`** rodando **`clang/clang`** (compilador C real) em WebAssembly. Segue o padrão oficial: escreve o `.c` num `Directory`, compila para `.wasm` e executa o resultado. Detalhes em [D8](#d8--toolchain-de-execução-wasmer--clang).

Opções consideradas:

### Opção A — Execução no navegador (WASM)
Compilar/interpretar C dentro do browser.
- **Prós:** zero backend, zero custo de servidor, funciona offline, sem latência de rede.
- **Contras:** integrar um toolchain C em WASM (ex.: Clang/Emscripten ou um interpretador como picoc/tcc-wasm) é trabalhoso; bundle grande.

### Opção B — Backend com compilador
Enviar o código a um serviço que roda `gcc`/`clang` em sandbox (próprio ou via API tipo Judge0).
- **Prós:** C real, completo e confiável; fácil de começar.
- **Contras:** exige servidor, sandbox de segurança, custo, latência; offline não funciona.

---

## D3 — Editor de código (painel C)
**Status:** ✅ aceita (2026-06-24)

**Decisão:** CodeMirror 6. O MVP só precisa de realce de sintaxe de C em modo somente-leitura — bundle pequeno e suficiente. Monaco ficou descartado por ser exagero para o caso de uso.

---

## D4 — Persistência
**Status:** proposta

`localStorage` para o workspace e progresso no MVP. Sem backend/contas. Export/import de arquivo `.json` como backup manual.

---

## D5 — Gerenciador de pacotes
**Status:** ✅ aceita (2026-06-24)

**Decisão:** npm. Já vem com o Node, zero atrito de setup.

---

## D6 — Internacionalização
**Status:** ✅ aceita (2026-06-24)

**Decisão:** i18n desde o início com **react-i18next**, idiomas PT-BR e EN. Evita retrabalho de extrair strings depois. PT-BR é o idioma padrão.

---

## D7 — Dockerização
**Status:** ✅ aceita (2026-06-24) — **requisito transversal**

**Decisão:** o projeto deve rodar em container Docker em todas as fases. Setup entregue:

- **`Dockerfile`** — produção, multi-stage: build com `node:22-alpine` → serve estático com `nginx:alpine` (config SPA em `docker/nginx.conf`).
- **`Dockerfile.dev`** — desenvolvimento, roda o dev server do Vite (`--host`) com HMR.
- **`docker-compose.yml`** — perfis `dev` (porta 5173, bind mount do código) e `prod` (porta 8088).
- **`.dockerignore`** — exclui `node_modules`, `dist`, `.git` etc.

**Comandos:**
```bash
docker compose --profile dev up            # dev com HMR  -> http://localhost:5173
docker compose --profile prod up --build   # produção     -> http://localhost:8088
```

**Manutenção:** ao introduzir novos serviços (ex.: backend/execução de C na Fase 3), adicioná-los ao `docker-compose.yml` para manter o ambiente reproduzível com um único comando.

> Nota: a porta de produção é **8088** (a 8080 estava ocupada no ambiente de dev). Ajustável no compose.

---

## D8 — Toolchain de execução (Wasmer + clang)
**Status:** ✅ aceita (2026-06-24)

**Decisão:** `@wasmer/sdk` + pacote `clang/clang` do registro Wasmer, compilando e executando no navegador.

**Fluxo** (`src/runner/wasmerRunner.ts`, atrás de `CRunner`):
1. `init()` do SDK (carregado sob demanda do CDN no primeiro Executar).
2. `Wasmer.fromRegistry('clang/clang')` baixa o compilador (cacheado).
3. Escreve o `.c` num `Directory`, roda o clang → `.wasm`.
4. `Wasmer.fromFile(wasm)` executa; captura stdout/stderr/exit code e aceita stdin.

**Implicações técnicas:**
- **Isolamento cross-origin obrigatório** (SharedArrayBuffer): headers `Cross-Origin-Opener-Policy: same-origin` e `Cross-Origin-Embedder-Policy: credentialless`, configurados no dev server do Vite e no nginx (produção). Sem isso a execução falha.
- **Online no primeiro uso:** o pacote clang (~100 MB descomprimido) é baixado do registro Wasmer e cacheado pelo navegador. Execução é preguiçosa (só ao clicar em Executar).
- O SDK é carregado via import dinâmico do CDN para evitar atrito do bundler com o Web Worker/wasm do SDK.

**Trade-off aceito:** download grande e dependência de rede no primeiro uso, em troca de um **compilador C real** (precisão total) sem backend próprio.

---

## Questões em aberto
- Público-alvo (idade/nível) — afeta o tom das lições e a profundidade dos blocos.
- Licença do projeto.
- Reduzir/cachear melhor o download do clang (avaliar empacotar offline no futuro).
