
ls -t -1 public/products/*.json | xargs cat | \
  jq -r '.model[] | [.productId, .name, .offers.priceSpecification.price, .macroColor, .disambiguatingDescription, ([.category[] | .name] | join(":"))] | @csv' > tmp/search.csv

split -l 10000 -d tmp/search.csv public/search_ --additional-suffix=.csv
