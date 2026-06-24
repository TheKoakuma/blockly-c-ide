# Catálogo de blocos → C

Mapeamento entre os blocos visuais e o código C que cada um gera.

> Convenção: `▸` = encaixe de statement; `◅` = encaixe de valor (expressão).

## MVP ✅ implementado

Definições em `src/blocks/cBlocks.ts`; geração em `src/generators/c.ts`.
Os rótulos dos blocos usam palavras-chave/símbolos de C (`printf`, `if`, `for`, `==`, `&&`)
para serem neutros de idioma e já familiarizar o aluno com a sintaxe.

### Estrutura do programa
| Bloco | Gera | Notas |
|-------|------|-------|
| **Programa / `main`** | `int main(void) { … return 0; }` | Bloco raiz; recolhe `#include`s necessários no topo. |

### Variáveis e tipos
| Bloco | Gera |
|-------|------|
| **Declarar variável** `tipo nome = valor` | `int x = 0;` (tipo via dropdown: `int`, `float`, `double`, `char`) |
| **Atribuir** `nome = ◅` | `x = 5;` |
| **Ler variável** `nome` | `x` (expressão) |

### Entrada e saída
| Bloco | Gera | Header |
|-------|------|--------|
| **Imprimir** `printf(◅)` | `printf("%d\n", x);` (formato inferido pelo tipo) | `<stdio.h>` |
| **Ler** `scanf` | `scanf("%d", &x);` | `<stdio.h>` |

### Controle de fluxo
| Bloco | Gera |
|-------|------|
| **Se / senão** | `if (cond) { … } else { … }` |
| **Para (`for`)** | `for (int i = 0; i < n; i++) { … }` |
| **Enquanto (`while`)** | `while (cond) { … }` |

### Operadores
| Bloco | Gera |
|-------|------|
| **Aritmético** | `a + b`, `a - b`, `a * b`, `a / b`, `a % b` |
| **Comparação** | `a == b`, `!=`, `<`, `>`, `<=`, `>=` |
| **Lógico** | `a && b`, `a || b`, `!a` |
| **Literal** | número / `'c'` / `"texto"` |

## Fase posterior
- Arrays: `int v[10];`, acesso `v[i]`
- Funções definidas pelo usuário: `tipo nome(params) { … }` + chamada
- `do/while`, `switch`

## Diretrizes de design dos blocos
- **Tipos por dropdown**, não por blocos separados — reduz a paleta.
- Inferir `#include`s e formatos de `printf`/`scanf` a partir do uso; não obrigar o aluno a gerenciá-los no MVP.
- Nomes de variáveis via campo de texto com validação de identificador C (`[A-Za-z_][A-Za-z0-9_]*`, não-reservado).
- Cada categoria de bloco com cor própria na toolbox para leitura visual.
- O C gerado precisa **compilar** — validar cada bloco contra um compilador real.
