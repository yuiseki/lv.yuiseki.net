
outfile="./tmp/homepage.html"
if [ ! -e $outfile ]; then
  curl \
    -s \
    -o $outfile \
    -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36" \
    https://jp.louisvuitton.com/jpn-jp/homepage

  cat $outfile | htmlq --attribute href a | grep "N-" | rev | cut -d '/' -f 1 | rev | sed -e 's/N-//' > ./public/collections.txt
fi

