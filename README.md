# Backend introduction

Po stronie frondendu, który wykorzystuje *Node*, w *package.json* są zapisane skrytpy do wykonania za pomocą polecenia `npm run <nazwa skryptu>`

```json
{
  ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  ...
}
```
Po stronie backendu, który wykorzystuje *Deno*, w *deno.json* / *deno.jsonc* są zapisane skrytpy do wykonania za pomocą polecenia `deno task <nazwa skryptu>`

```json
{
  ...
      "tasks": {
        "dev": "deno run -A --unstable --watch main.ts"
    },
  ...
}
```