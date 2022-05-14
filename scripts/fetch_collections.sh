
collections=`cat ./public/collections.txt`

IFS=$'\n'
for collection in $collections; do
  echo "----- -----"
  echo $collection

  firstoutfile="./public/collections/$collection-0-50.json"
  if [ -e $firstoutfile ]; then
    total=`cat $firstoutfile | jq -r .totalResult`
    echo $total

    i=51
    while [ "$i" -le $total ]; do
      echo $i
      outfile="./public/collections/$collection-$i-$(($i+49)).json"
      echo $outfile
      if [ ! -e $outfile ]; then
        sleep 1
        curl \
          -s \
          -o - \
          -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36" \
          https://api.louisvuitton.com/api/jpn-jp/catalog/filter/$collection?range=$i-$(($i+49)) | jq . > $outfile
      fi
      i=$((i+50))
      echo $i
    done
  else
    sleep 1

    curl \
      -s \
      -o - \
      -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36" \
      https://api.louisvuitton.com/api/jpn-jp/catalog/filter/$collection?range=0-50 | jq . > $firstoutfile
  fi
  echo "----- -----"
done
