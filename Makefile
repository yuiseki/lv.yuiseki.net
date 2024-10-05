
all: \
	tmp/homepage.html \
	tmp/sitemap.html \
	tmp/collections.txt \
	fetch_collections \
	extract_product_id \
	fetch_products_json \
	build_search_csv

curl_options = -s \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'priority: u=0, i' \
  -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'

clean:
	rm -f ./tmp/homepage.html
	rm -f ./tmp/collections.txt
	rm -f ./tmp/collections_uniq.txt
	rm -f ./tmp/collections/*

clean-all:
	rm -f ./public/products.txt
	rm -f ./public/search_*.csv

tmp/homepage.html:
	curl -o tmp/homepage.html $(curl_options) https://jp.louisvuitton.com/jpn-jp/homepage

tmp/sitemap.html:
	curl -o tmp/sitemap.html $(curl_options) https://jp.louisvuitton.com/jpn-jp/sitemap

tmp/collections.txt:
	cat tmp/homepage.html | htmlq --attribute href a | grep "N-" | rev | cut -d '/' -f 1 | rev | sed -e 's/N-//' > tmp/collections.txt
	cat tmp/sitemap.html | htmlq --attribute href a | grep "N-" | rev | cut -d '/' -f 1 | rev | sed -e 's/N-//' >> tmp/collections.txt
	cat tmp/collections.txt | sort | uniq > tmp/collections_uniq.txt

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
