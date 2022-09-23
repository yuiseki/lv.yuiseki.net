
all: \
	tmp/homepage.html \
	tmp/collections.txt \
	fetch_collections \
	extract_product_id \
	fetch_products_json \
	build_search_csv

user_agent = Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36

echo:
	echo $(user_agent)

clean:
	rm ./tmp/homepage.html
	rm ./tmp/collections.txt
	rm ./tmp/collections/*

tmp/homepage.html:
	curl -s -o tmp/homepage.html -H "User-Agent: $(user_agent)" https://jp.louisvuitton.com/jpn-jp/homepage

tmp/collections.txt:
	cat tmp/homepage.html | htmlq --attribute href a | grep "N-" | rev | cut -d '/' -f 1 | rev | sed -e 's/N-//' > tmp/collections.txt

.PHONY: fetch_homepage
fetch_homepage:
	mkdir -p ./tmp/collections
	bash ./scripts/fetch_homepage.sh

.PHONY: fetch_collections
fetch_collections:
	mkdir -p ./tmp/collections
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
