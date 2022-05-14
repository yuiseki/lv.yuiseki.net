
ls ./public/collections/*.json | xargs jq -r '.searchResults.recordList[].productId' | sort | uniq > ./public/products.txt
