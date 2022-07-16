
ls -v -1 ./tmp/collections/*.json | xargs cat | \
  jq -r '.hits[] | .productId' | \
    sort -V | uniq > ./public/products.txt
