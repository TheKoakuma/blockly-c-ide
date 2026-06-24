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

**A investigar na Fase 3:** qual toolchain/interpretador em WASM usar (ex.: Clang/Emscripten para compilação real, ou um interpretador leve como tcc-wasm/picoc). Avaliar tamanho de bundle vs. completude da linguagem.

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
**Status:** proposta

**Proposta:** CodeMirror 6 (mais leve) ou Monaco (mais recursos). MVP só precisa de realce de sintaxe e somente-leitura → CodeMirror tende a bastar.

---

## D4 — Persistência
**Status:** proposta

`localStorage` para o workspace e progresso no MVP. Sem backend/contas. Export/import de arquivo `.json` como backup manual.

---

## Questões em aberto
- Idioma da interface no MVP: só PT, ou PT/EN desde já?
- Público-alvo (idade/nível) — afeta o tom das lições e a profundidade dos blocos.
- Licença do projeto.
