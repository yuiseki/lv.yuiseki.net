
browser="User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"

products=`cat ./public/products.txt`

IFS=$'\n'
for product in $products; do
  echo "----- ----- ----- -----"
  echo $product

  outfile="./public/products/$product.json"
  if [ ! -e $outfile ]; then
    date '+%F %T'
    sleep 1.5

    time curl \
      -s \
      -o - \
      -H $browser \
      https://api.louisvuitton.com/api/jpn-jp/catalog/product/$product | jq . > $outfile
    date '+%F %T'
  fi
done
