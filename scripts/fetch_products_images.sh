
products=`cat ./public/products.txt`
IFS=$'\n'
for product in $products; do
  echo "----- -----"
  echo $product

  models=`cat ./public/products/$product.json | jq -r .model[].identifier`
  IFS=$'\n'
  for model in $models; do
    echo $model
    outdir="./public/images/$product/$model"
    mkdir -p $outdir
    outfile="./public/images/$product/$model/1.png"
    if [ ! -e $outfile ]; then
      contentUrl=`cat ./public/products/$product.json | jq -r ".model[] | select(.identifier == \"$model\") | .image[0].contentUrl"`
      echo $contentUrl
      contentUrl=${contentUrl// /\%20}
      contentUrl=${contentUrl/jpg/png}
      contentUrl=${contentUrl/\{IMG_WIDTH\}/656}
      contentUrl=${contentUrl/\{IMG_HEIGHT\}/656}
      echo $contentUrl

      sleep 1
      curl \
        -s \
        -o $outfile \
        -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36" \
        $contentUrl
    fi
  done

  echo "----- -----"
done