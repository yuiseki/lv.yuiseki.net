# lv.yuiseki.net

## What is it

- https://lv.yuiseki.net/ のコードです
- https://jp.louisvuitton.com/ の商品を全部一覧できる Web サイトです

## How it works

- シェルスクリプトで jp.louisvuitton.com の HTML を解析し、 api.louisvuitton.com を呼び出すことで商品情報を収集します
- Vite (React + Typescript) で収集したデータを表示します
- Next.js で作り直す可能性があります……


## Development

### Requirements

- bash
- make
- ls
- date
- cat
- sort
- uniq
- rev
- cut
- grep
- sed
- xargs
- curl
- jq
- htmlq


### Build and Launch

```
make
npm ci
npm run dev
```

Open http://localhost:3000/
