
browser="User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
collections=`cat ./tmp/collections_uniq.txt`

IFS=$'\n'
for collection in $collections; do
  echo "----- ----- ----- -----"
  echo $collection

  firstoutfile="./tmp/collections/$collection-0.json"
  if [ ! -e $firstoutfile ]; then
    sleep 1

    time curl \
      -s \
      -o - \
      -H $browser \
      https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=0 | jq . > $firstoutfile
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
    if [ ! -e $outfile ]; then
      sleep 1

      time curl \
        -s \
        -o - \
        -H $browser \
        https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=$i | jq . > $outfile
    fi
    i=$((i+1))
    echo $i
    echo "----- -----"
  done
  echo "----- ----- ----- -----"
done
