
all: fetch_homepage fetch_collections extract_product_id fetch_products_json build_search_csv

clean:
	rm ./tmp/homepage.html
	rm ./tmp/collections/*

.PHONY: fetch_homepage
fetch_homepage:
	bash ./scripts/fetch_homepage.sh

.PHONY: fetch_collections
fetch_collections:
	bash ./scripts/fetch_collections.sh
	bash ./scripts/fetch_collections.sh

.PHONY: extract_product_id
extract_product_id:
	bash ./scripts/extract_product_id.sh

.PHONY: fetch_products_json
fetch_products_json:
	bash ./scripts/fetch_products_json.sh

.PHONY: fetch_products_image
fetch_products_image:
	bash ./scripts/fetch_products_image.sh

.PHONY: build_search_csv
build_search_csv:
	bash ./scripts/build_search_csv.sh
