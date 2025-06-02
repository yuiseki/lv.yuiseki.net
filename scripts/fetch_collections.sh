
collections=`cat ./tmp/collections_uniq.txt`

curl 'https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/td4mq4v?page=0&attributes=brandContent&viewMore=true' \


IFS=$'\n'
for collection in $collections; do
  echo "----- ----- ----- -----"
  echo $collection

  firstoutfile="./tmp/collections/$collection-0.json"
  if [ ! -s $firstoutfile ]; then
    url="https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=0&attributes=brandContent&viewMore=true"
    echo $url
    sleep 0.1

    time curl \
      -s \
      -o - \
      -H 'accept: application/json, text/plain, */*' \
      -H 'accept-language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7' \
      -H 'cache-control: no-cache' \
      -H 'client_id: 607e3016889f431fb8020693311016c9' \
      -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
      -H 'origin: https://jp.louisvuitton.com' \
      -H 'pragma: no-cache' \
      -H 'priority: u=1, i' \
      -H 'referer: https://jp.louisvuitton.com/jpn-jp/homepage' \
      -H 'sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'sec-ch-ua-platform: "Windows"' \
      -H 'sec-fetch-dest: empty' \
      -H 'sec-fetch-mode: cors' \
      -H 'sec-fetch-site: same-site' \
      -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36' \
      $url | jq . > $firstoutfile
  fi

  echo $firstoutfile
  total=`cat $firstoutfile | jq -r .nbPages`
  total=$((total-1))
  echo $total

  i=1
  while [ "$i" -le $total ]; do
    echo "----- -----"
    echo "$i / $total"
    outfile="./tmp/collections/$collection-$i.json"
    echo $outfile
    if [ ! -s $outfile ]; then
      url="https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=$i&attributes=brandContent&viewMore=true"
      echo $url
      sleep 0.1

      time curl \
        -s \
        -o - \
        -H 'accept: application/json, text/plain, */*' \
        -H 'accept-language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7' \
        -H 'cache-control: no-cache' \
        -H 'client_id: 607e3016889f431fb8020693311016c9' \
        -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
        -H 'origin: https://jp.louisvuitton.com' \
        -H 'pragma: no-cache' \
        -H 'priority: u=1, i' \
        -H 'referer: https://jp.louisvuitton.com/jpn-jp/homepage' \
        -H 'sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'sec-ch-ua-platform: "Windows"' \
        -H 'sec-fetch-dest: empty' \
        -H 'sec-fetch-mode: cors' \
        -H 'sec-fetch-site: same-site' \
        -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36' \
        $url | jq . > $outfile
    fi
    i=$((i+1))
    echo $i
    echo "----- -----"
  done
  echo "----- ----- ----- -----"
done
