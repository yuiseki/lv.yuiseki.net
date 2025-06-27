
products=`cat ./public/products.txt`

IFS=$'\n'
for product in $products; do
  echo "----- ----- ----- -----"
  echo $product

  outfile="./public/products/$product.json"
  if [ ! -e $outfile ]; then
    date '+%F %T'
    sleep 0.1

    time curl \
      -s \
      -o - \
      -H 'accept: application/json, text/plain, */*' \
      -H 'accept-language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7' \
      -H 'cache-control: no-cache' \
      -H 'checkout-channel: WEB' \
      -H 'client_id: 607e3016889f431fb8020693311016c9' \
      -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
      -H 'origin: https://jp.louisvuitton.com' \
      -H 'pragma: no-cache' \
      -H 'priority: u=1, i' \
      -H 'referer: https://jp.louisvuitton.com/jpn-jp/women/handbags/lv-icons/onthego/_/N-td4mq4v-akt29qbc' \
      -H 'sec-ch-ua: "Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'sec-ch-ua-platform: "Windows"' \
      -H 'sec-fetch-dest: empty' \
      -H 'sec-fetch-mode: cors' \
      -H 'sec-fetch-site: same-site' \
      -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36' \
      https://api.louisvuitton.com/api/jpn-jp/catalog/product/$product | jq . > $outfile
    date '+%F %T'
    # echo path
    echo $outfile
  fi
done
