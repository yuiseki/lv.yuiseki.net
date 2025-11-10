#!/bin/bash

# Cookie保存先ディレクトリを作成
mkdir -p ./tmp

# ホームページにアクセスしてCookieを取得・保存
curl -c ./tmp/cookie.txt -b ./tmp/cookie.txt \
  -s \
  -o /dev/null \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'priority: u=0, i' \
  -H 'sec-ch-ua: "Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36' \
  'https://jp.louisvuitton.com/jpn-jp/homepage'

echo "Cookie saved to ./tmp/cookie.txt"
