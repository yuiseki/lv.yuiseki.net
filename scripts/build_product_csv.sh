
ls -v -1 public/products/*.json | xargs cat | \
  jq -r '.model[] | [.productId, .identifier, .name, .offers.priceSpecification.price, .macroColor, .disambiguatingDescription, ([.category[] | .name] | join(":"))] | @csv' > public/search.csv
