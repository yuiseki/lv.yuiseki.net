
ls -v -1 public/products/*.json | cut -d '/' -f 3 | sed -e 's/\.json//' > ./public/products.txt

ls -v -1 public/products/*.json | head -n 100 | xargs cat | \
  jq -r '.model[] | [.productId, .identifier, .name, .macroColor, .disambiguatingDescription, ([.category[] | .name] | join(":"))] | @csv' > public/search.csv
