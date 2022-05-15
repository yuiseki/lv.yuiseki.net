
all: fetch_homepage fetch_collections extract_product_id fetch_products

clean:
	rm ./tmp/homepage.html

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



