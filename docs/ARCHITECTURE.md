# Arquitetura

> Documento vivo. Reflete a **arquitetura-alvo proposta**; será ajustado conforme decisões em [DECISIONS.md](DECISIONS.md) forem fechadas.

## Visão geral

bloCkly é uma SPA (single-page application) que roda no navegador. O fluxo central é um pipeline unidirecional:

```
[Blocos do usuário] ──> [Modelo Blockly] ──> [Gerador C] ──> [Código C] ──> [Execução] ──> [Saída]
       arrasta              XML/JSON          AST/string       texto         runtime        stdout
```

O usuário manipula apenas a primeira etapa (os blocos). Todo o resto é derivado automaticamente.

## Camadas

### 1. Editor visual (Blockly)
- Hospeda o workspace Blockly e a *toolbox* (paleta de blocos).
- Define os **blocos customizados** de C (ver [BLOCKS.md](BLOCKS.md)).
- Emite eventos de mudança que disparam a regeneração do código.
- Persiste o estado do workspace (serialização JSON do Blockly) em `localStorage` e/ou export de arquivo.

### 2. Gerador de código C
- Um *generator* Blockly que percorre os blocos e produz texto C.
- Responsável por: indentação, `#include`s necessários, declaração de `main`, ordem de declarações.
- Deve produzir **C compilável** — não pseudo-código.
- Ponto de atenção: gerenciar headers (ex.: incluir `<stdio.h>` só quando há `printf`).

### 3. Painel de código
- Exibe o C gerado (editor de texto — Monaco ou CodeMirror).
- MVP: somente leitura, com realce de sintaxe.
- Futuro: edição bidirecional (texto → blocos) é **fora de escopo** inicial por complexidade.

### 4. Runtime de execução
- Recebe o código C, compila/interpreta e devolve stdout/stderr.
- **Decisão em aberto** (ver DECISIONS.md): execução no navegador (WASM) vs. backend com compilador. Esta camada é isolada atrás de uma interface `CRunner` para que a escolha não vaze para o resto da app.

```ts
interface CRunner {
  run(source: string, stdin?: string): Promise<{ stdout: string; stderr: string; exitCode: number }>;
}
```

### 5. Trilha de aprendizado (fase posterior)
- Lições com objetivo, blocos liberados e validação da solução.
- Estado de progresso do aluno.

## Fluxo de dados

1. Usuário arrasta/edita blocos → Blockly dispara `workspace.changeEvent`.
2. Handler (com *debounce*) chama o gerador → string C.
3. String C atualiza o painel de código.
4. Ao clicar em **Executar**, a string é enviada ao `CRunner`.
5. Resultado é exibido no console de saída.

## Estrutura de pastas (proposta)

```
src/
  blocks/        # definições dos blocos customizados de C
  generators/    # gerador Blockly -> C
  components/    # UI (workspace, painel de código, console, toolbar)
  runner/        # implementações de CRunner
  lessons/       # conteúdo da trilha de aprendizado
  state/         # persistência / estado global
  i18n/          # configuração e traduções (PT-BR/EN)
  App.tsx
docker/          # config do nginx para a imagem de produção
docs/
Dockerfile       # build de produção (multi-stage -> nginx)
Dockerfile.dev   # dev server (Vite + HMR)
docker-compose.yml
```

## Empacotamento (Docker)

O projeto é dockerizado (requisito transversal — ver [DECISIONS.md → D7](DECISIONS.md)):
- **Produção:** build estático servido por nginx com fallback de SPA.
- **Desenvolvimento:** dev server do Vite com HMR e bind mount do código.

Quando a Fase 3 introduzir o runtime de execução de C, se ele exigir um serviço separado, esse serviço entra no `docker-compose.yml`.

## Princípios

- **Pipeline unidirecional**: blocos são a fonte da verdade; código é derivado.
- **Runtime plugável**: a execução de C fica atrás de uma interface.
- **C real**: o código gerado deve compilar de verdade — o valor pedagógico depende disso.
