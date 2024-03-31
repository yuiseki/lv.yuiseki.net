
collections=`cat ./tmp/collections_uniq.txt`

IFS=$'\n'
for collection in $collections; do
  echo "----- ----- ----- -----"
  echo $collection

  firstoutfile="./tmp/collections/$collection-0.json"
  if [ ! -s $firstoutfile ]; then
    url="https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=0&attributes=brandContent"
    echo $url
    sleep 1

    time curl \
      -s \
      -o - \
      -H 'sec-ch-ua: "Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"' \
      -H 'sec-ch-ua-platform: "Windows"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Referer: https://jp.louisvuitton.com/jpn-jp/homepage' \
      -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
      -H 'client_id: 607e3016889f431fb8020693311016c9' \
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
      url="https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=$i&attributes=brandContent"
      echo $url
      sleep 1

      time curl \
        -s \
        -o - \
        -H 'sec-ch-ua: "Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"' \
        -H 'sec-ch-ua-platform: "Windows"' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' \
        -H 'Accept: application/json, text/plain, */*' \
        -H 'Referer: https://jp.louisvuitton.com/jpn-jp/homepage' \
        -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
        -H 'client_id: 607e3016889f431fb8020693311016c9' \
        $url | jq . > $outfile
    fi
    i=$((i+1))
    echo $i
    echo "----- -----"
  done
  echo "----- ----- ----- -----"
done
