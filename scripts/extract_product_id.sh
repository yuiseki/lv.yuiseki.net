
ls -v -1 public/products/*.json | cut -d '/' -f 3 | sed -e 's/\.json//' > ./public/products.txt
