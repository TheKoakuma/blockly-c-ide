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

## Estruturas de dados e funções ✅ implementado

### Funções (categoria "Funções")
| Bloco | Gera |
|-------|------|
| **Função** | `tipo nome(params) { … return valor; }` — tipo de retorno por dropdown (incl. `void`); parâmetros num campo de texto (ex.: `int a, int b`); retorno omitido quando `void` |
| **return** | `return v;` ou `return;` |
| **Chamar** | `nome(args)` (expressão) — argumentos num campo de texto |

### Vetores (categoria "Vetores")
| Bloco | Gera |
|-------|------|
| **Declarar** | `int v[10];` |
| **Atribuir** | `v[i] = x;` |
| **Ler** | `v[i]` |

### Matrizes (categoria "Matrizes")
| Bloco | Gera |
|-------|------|
| **Declarar** | `int m[3][3];` |
| **Atribuir** | `m[i][j] = x;` |
| **Ler** | `m[i][j]` |

### Structs (categoria "Structs")
| Bloco | Gera |
|-------|------|
| **Definir** | `struct Nome { … };` — campos num campo de texto separados por `;` (ex.: `int x; int y;`) |
| **Declarar** | `struct Nome p;` |
| **Atribuir campo** | `p.x = v;` |
| **Ler campo** | `p.x` |

### Ponteiros (categoria "Ponteiros")
| Bloco | Gera |
|-------|------|
| **Declarar** | `int *p = …;` (valor opcional) |
| **Endereço de** | `&x` |
| **Desreferenciar (ler)** | `*p` |
| **Desreferenciar (atribuir)** | `*p = v;` |

### Memória dinâmica (categoria "Memória")
| Bloco | Gera |
|-------|------|
| **malloc** | `malloc(n * sizeof(tipo))` (expressão; encaixe num ponteiro) |
| **calloc** | `calloc(n, sizeof(tipo))` |
| **free** | `free(p);` |

> Estes blocos adicionam `#include <stdlib.h>` automaticamente. O gerador inclui
> headers sob demanda (sempre `<stdio.h>`; `<stdlib.h>` quando há alocação dinâmica).

> Funções, structs e definições ficam em **blocos de topo separados** (como o `main`).
> Coloque-os **acima do `main`** no canvas — a ordem de geração segue a posição vertical,
> e em C o tipo/função precisa aparecer antes do uso.

## Ainda não implementado
- `do/while`, `switch`

## Diretrizes de design dos blocos
- **Tipos por dropdown**, não por blocos separados — reduz a paleta.
- Inferir `#include`s e formatos de `printf`/`scanf` a partir do uso; não obrigar o aluno a gerenciá-los no MVP.
- Nomes de variáveis via campo de texto com validação de identificador C (`[A-Za-z_][A-Za-z0-9_]*`, não-reservado).
- Cada categoria de bloco com cor própria na toolbox para leitura visual.
- O C gerado precisa **compilar** — validar cada bloco contra um compilador real.
