
browser="User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"

products=`cat ./public/products.txt`

IFS=$'\n'
for product in $products; do
  echo "----- ----- ----- -----"
  echo $product

  outfile="./public/products/$product.json"
  if [ ! -e $outfile ]; then
    date '+%F %T'
    sleep 1

    time curl \
      -s \
      -o - \
      -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
      -H 'accept-language: ja-JP,ja;q=0.9' \
      -H 'priority: u=0, i' \
      -H 'sec-ch-ua: "Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'sec-ch-ua-platform: "Windows"' \
      -H 'sec-fetch-dest: document' \
      -H 'sec-fetch-mode: navigate' \
      -H 'sec-fetch-site: none' \
      -H 'sec-fetch-user: ?1' \
      -H 'upgrade-insecure-requests: 1' \
      -H 'referer: https://jp.louisvuitton.com/jpn-jp/sitemap' \
      -H 'client_id: 607e3016889f431fb8020693311016c9' \
      -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
      -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' \
      https://api.louisvuitton.com/api/jpn-jp/catalog/product/$product | jq . > $outfile
    date '+%F %T'
    # echo path
    echo $outfile
  fi
done
