
ls -v -1 ./tmp/collections/*.json | xargs cat | \
  jq -r '.searchResults.recordList[] | .productId' | \
    sort -V | uniq > ./public/products.txt