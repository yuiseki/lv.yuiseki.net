
all: fetch_homepage fetch_collections extract_product_id fetch_products build_product_csv

clean:
	rm ./tmp/homepage.html
	rm ./tmp/collections/*

.PHONY: fetch_homepage
fetch_homepage:
	bash ./scripts/fetch_homepage.sh

.PHONY: fetch_collections
fetch_collections:
	bash ./scripts/fetch_collections.sh

.PHONY: extract_product_id
extract_product_id:
	bash ./scripts/extract_product_id.sh

.PHONY: fetch_products
fetch_products:
	bash ./scripts/fetch_products.sh

.PHONY: build_product_csv
build_product_csv:
	bash ./scripts/build_product_csv.sh

