
collections=`cat ./tmp/collections_uniq.txt`

IFS=$'\n'
for collection in $collections; do
  echo "----- ----- ----- -----"
  echo $collection

  firstoutfile="./tmp/collections/$collection-0.json"
  if [ ! -s $firstoutfile ]; then
    url="https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=0"
    echo $url
    sleep 1

    time curl \
      -s \
      -o - \
      -H 'authority: api.louisvuitton.com' \
      -H 'accept: application/json, text/plain, */*' \
      -H 'accept-language: en-US,en;q=0.9' \
      -H 'cache-control: no-cache' \
      -H 'client_id: 607e3016889f431fb8020693311016c9' \
      -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
      -H 'cookie: AKA_A2=A; bm_sz=A580976823AE2C084E54B7176124D8DD~YAAQjK4sF6gBRjSGAQAALbAlrxOvIxo1UThRZdcApM+BU0Pa7ISk70CwOsLhSABk4cBLFbcvz9L2glLbzDKlnxKC39++yyswW9KzC+w11FRsHySZYjomXfSrz5S4OZb+1ZRv9TQ6Ik8HRg9fa0CNLIefA9nJH7eumbW4NhOvbLWnhRX5mYcGxdPt7dzz88GChF25OqS0k5MsrNlG0yeX4645wxLpuBEpqC0ctFDBJj1p4cI9P6iiZ4HnbOuX0uC7auUUUiqNooQSubb84Kg5Pq3Ulc0dq/lKR/LqRMg568IjQ4NZv3acJHw=~3749937~3158084; PIM-SESSION-ID=xNOMmOO820aELy9j; lv-dispatch=jpn-jp; ak_cc=JP; _cs_mk=0.2111649221590164_1677975726770; _scid=d8bdfd47-5840-471c-b82f-e6d2948f24db; ak_bmsc=4D4BA400992E1D357750FB4A5D8C4F54~000000000000000000000000000000~YAAQjK4sF60BRjSGAQAAO7QlrxNPMLIjOXz53GCqHdMGQHQuX/pTT8wL9Olvc8XHyPIgWhd2R7Cy/vEkPJBoJTTzUe81g1jVhs1dm1E38ZL/1cymHK6Ml0pnJvgjG24NZgLNwxWeFIwdEzuFKEvwsLTqeIDhG/+CVVyePyvwbIQYw9Jm4KO/Ud0NgQH4IjvOyrdpnIV6XQy16t38ZWZx3LPddgQE/NieTkG6d/4v1P2HavKDYS/gXgM6AeBaa0an91RZxVzM3Jmd9JB5+MdMWcNFDefCopFcRs4bSjUwV3NjJqZc2mtWeWj2+cZBPGrAfeuVBOuYAYZcVPGcEdqmldASIvM50x82Jd2ePCiZ3d6jqHXRPyrC6mqHfvUvaBqSCDbfc80g5ermb8X0RXaltHT1CxkepqJAp2Q042ze0Gqc2jcwBgY5u8AcB3PON9D8txpGaS33rxZv5m+W2W4xyIUxpsDQYtxeIGTmtqymPKSIehtQ6wqRMJR73bnlyrNVPtdiIJTzOY7lhi2/NnzfA8bmjRZDEitP; _gid=GA1.2.493114176.1677975727; _cs_c=1; _fbp=fb.1.1677975727297.1442669062; _gcl_au=1.1.757059510.1677975727; _sctr=1|1677942000000; _qubitTracker=qn76yo7xmyo-0leunf9qo-1crvi5k; _abck=946A75AC31AF9EF376CA7A949BA49B00~0~YAAQjK4sF7MDRjSGAQAAg2onrwklBWyUViIJZ1vsefSsh3gn37o9Rws9IuujOKg3/o5GFyuZmr87jMiwEPN3zokZ5ecDapcPKjh87bROBhET1Vn/YfsyoVe4vCE2mY/jE0BHPTRhzM7xrDuCOJrEqRSijV7QizwKcWgdgGvw8zwflIg2RV+9ZVHuylLcGZdhedWueDd7ldMHhdaQWWSaKjm9JqeGpZejSEB2v9/ebpd5e9LR6vlj48s8gP9qv3BjXsdj0+P3pf5rJrLebO1AnTL8VYpaV7hpVf4vzg+jxIxIPfg3umJIbNZt0RmIu42HinZL6Iqn2lhgboq6A8NC5TGCjVdFrJQxjqUVh7gYlky8X50LMgNq9zCv26mq7V7z52EzkhXcSF7YweypB+j50dzvwqumi/UtntdqF3uf~-1~-1~-1; bm_sv=1199D0F8773811792E8BC4C560352025~YAAQjK4sF1gbRjSGAQAA0MQ6rxNAuh3s7qZr5SJSjsbwOeLjn9hdyBLq/RLfcmUeqIgvBE00qVSNGqoFPTrOtKMgb+70I7t8kic0F98yt+tL5kPODZm7B3+L+9kfx+VwUN2paMyfbUBHZ+20iHArZOpD1TxtyVQK5Q8wOBOaKW5ZTHnZ4Z2aSmsmOzubwPdFVPDVRcf2UdXEUDPCQr0cSDaJi+1FHzhFIFbXC6iNnnXR+Ag5w9U3AUArXYMRHulMzOI1lvABtA==~1; lv-dispatch-url=https://jp.louisvuitton.com/jpn-jp/stories/capucines-icon; OPTOUTMULTI=0:0%7Cc1:0%7Cc2:0%7Cc4:0%7Cc3:0; utag_main=v_id:0186af25a8f30019ef2e1d4dacc20506f004906701788$_sn:1$_se:18$_ss:0$_st:1677978907682$ses_id:1677975726324%3Bexp-session$_pn:6%3Bexp-session$dc_visit:1$dc_event:18%3Bexp-session$dc_region:eu-central-1%3Bexp-session; qb_session=6:1:29::0:YavJbCD:0:0:0:0:.louisvuitton.com; qb_generic=t055-redirect=0=%:YavOr++:.louisvuitton.com; _cs_id=be90ed4f-e23e-a208-e8ad-91772b1ff052.1677975727.1.1677977108.1677975727.1.1712139727117; _cs_s=6.0.0.1677978908507; _ga=GA1.1.1385044941.1677975727; qb_permanent=qn76yo7xmyo-0leunf9qo-1crvi5k:6:6:1:1:0::0:1:0:BkA+Cw:BkA+YU:::::223.132.107.73:ota:35688:japan:JP:35.55:139.73:kanto:392001:tokyo:9492:migrated|1677977108923:::YavOsG7:YavJbCD:0:0:0::0:0:.louisvuitton.com:0; _ga_S6ED35NYJQ=GS1.1.1677975727.1.1.1677977122.39.0.0; RT="z=1&dm=louisvuitton.com&si=3d472900-2bdc-43c7-a2ea-045827dc08af&ss=leunf8cr&sl=6&tt=awq&bcn=%2F%2F684d0d47.akstat.io%2F&ld=toi0&nu=1i5fg6d&cl=u04t"' \
      -H 'origin: https://jp.louisvuitton.com' \
      -H 'pragma: no-cache' \
      -H 'referer: https://jp.louisvuitton.com/jpn-jp/' \
      -H 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'sec-ch-ua-platform: "Windows"' \
      -H 'sec-fetch-dest: empty' \
      -H 'sec-fetch-mode: cors' \
      -H 'sec-fetch-site: same-site' \
      -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
      $url | jq . > $firstoutfile
  fi

  echo $firstoutfile
  total=`cat $firstoutfile | jq -r .nbPages`
  total=$((total-1))
  echo $total

  i=1
  while [ "$i" -le $total ]; do
    echo "----- -----"
    echo "$i / $total"
    outfile="./tmp/collections/$collection-$i.json"
    echo $outfile
    if [ ! -s $outfile ]; then
      url="https://api.louisvuitton.com/eco-eu/search-merch-eapi/v1/jpn-jp/plp/products/$collection?page=$i"
      echo $url
      sleep 1

      time curl \
        -s \
        -o - \
        -H 'authority: api.louisvuitton.com' \
        -H 'accept: application/json, text/plain, */*' \
        -H 'accept-language: en-US,en;q=0.9' \
        -H 'cache-control: no-cache' \
        -H 'client_id: 607e3016889f431fb8020693311016c9' \
        -H 'client_secret: 60bbcdcD722D411B88cBb72C8246a22F' \
        -H 'cookie: AKA_A2=A; bm_sz=A580976823AE2C084E54B7176124D8DD~YAAQjK4sF6gBRjSGAQAALbAlrxOvIxo1UThRZdcApM+BU0Pa7ISk70CwOsLhSABk4cBLFbcvz9L2glLbzDKlnxKC39++yyswW9KzC+w11FRsHySZYjomXfSrz5S4OZb+1ZRv9TQ6Ik8HRg9fa0CNLIefA9nJH7eumbW4NhOvbLWnhRX5mYcGxdPt7dzz88GChF25OqS0k5MsrNlG0yeX4645wxLpuBEpqC0ctFDBJj1p4cI9P6iiZ4HnbOuX0uC7auUUUiqNooQSubb84Kg5Pq3Ulc0dq/lKR/LqRMg568IjQ4NZv3acJHw=~3749937~3158084; PIM-SESSION-ID=xNOMmOO820aELy9j; lv-dispatch=jpn-jp; ak_cc=JP; _cs_mk=0.2111649221590164_1677975726770; _scid=d8bdfd47-5840-471c-b82f-e6d2948f24db; ak_bmsc=4D4BA400992E1D357750FB4A5D8C4F54~000000000000000000000000000000~YAAQjK4sF60BRjSGAQAAO7QlrxNPMLIjOXz53GCqHdMGQHQuX/pTT8wL9Olvc8XHyPIgWhd2R7Cy/vEkPJBoJTTzUe81g1jVhs1dm1E38ZL/1cymHK6Ml0pnJvgjG24NZgLNwxWeFIwdEzuFKEvwsLTqeIDhG/+CVVyePyvwbIQYw9Jm4KO/Ud0NgQH4IjvOyrdpnIV6XQy16t38ZWZx3LPddgQE/NieTkG6d/4v1P2HavKDYS/gXgM6AeBaa0an91RZxVzM3Jmd9JB5+MdMWcNFDefCopFcRs4bSjUwV3NjJqZc2mtWeWj2+cZBPGrAfeuVBOuYAYZcVPGcEdqmldASIvM50x82Jd2ePCiZ3d6jqHXRPyrC6mqHfvUvaBqSCDbfc80g5ermb8X0RXaltHT1CxkepqJAp2Q042ze0Gqc2jcwBgY5u8AcB3PON9D8txpGaS33rxZv5m+W2W4xyIUxpsDQYtxeIGTmtqymPKSIehtQ6wqRMJR73bnlyrNVPtdiIJTzOY7lhi2/NnzfA8bmjRZDEitP; _gid=GA1.2.493114176.1677975727; _cs_c=1; _fbp=fb.1.1677975727297.1442669062; _gcl_au=1.1.757059510.1677975727; _sctr=1|1677942000000; _qubitTracker=qn76yo7xmyo-0leunf9qo-1crvi5k; _abck=946A75AC31AF9EF376CA7A949BA49B00~0~YAAQjK4sF7MDRjSGAQAAg2onrwklBWyUViIJZ1vsefSsh3gn37o9Rws9IuujOKg3/o5GFyuZmr87jMiwEPN3zokZ5ecDapcPKjh87bROBhET1Vn/YfsyoVe4vCE2mY/jE0BHPTRhzM7xrDuCOJrEqRSijV7QizwKcWgdgGvw8zwflIg2RV+9ZVHuylLcGZdhedWueDd7ldMHhdaQWWSaKjm9JqeGpZejSEB2v9/ebpd5e9LR6vlj48s8gP9qv3BjXsdj0+P3pf5rJrLebO1AnTL8VYpaV7hpVf4vzg+jxIxIPfg3umJIbNZt0RmIu42HinZL6Iqn2lhgboq6A8NC5TGCjVdFrJQxjqUVh7gYlky8X50LMgNq9zCv26mq7V7z52EzkhXcSF7YweypB+j50dzvwqumi/UtntdqF3uf~-1~-1~-1; bm_sv=1199D0F8773811792E8BC4C560352025~YAAQjK4sF1gbRjSGAQAA0MQ6rxNAuh3s7qZr5SJSjsbwOeLjn9hdyBLq/RLfcmUeqIgvBE00qVSNGqoFPTrOtKMgb+70I7t8kic0F98yt+tL5kPODZm7B3+L+9kfx+VwUN2paMyfbUBHZ+20iHArZOpD1TxtyVQK5Q8wOBOaKW5ZTHnZ4Z2aSmsmOzubwPdFVPDVRcf2UdXEUDPCQr0cSDaJi+1FHzhFIFbXC6iNnnXR+Ag5w9U3AUArXYMRHulMzOI1lvABtA==~1; lv-dispatch-url=https://jp.louisvuitton.com/jpn-jp/stories/capucines-icon; OPTOUTMULTI=0:0%7Cc1:0%7Cc2:0%7Cc4:0%7Cc3:0; utag_main=v_id:0186af25a8f30019ef2e1d4dacc20506f004906701788$_sn:1$_se:18$_ss:0$_st:1677978907682$ses_id:1677975726324%3Bexp-session$_pn:6%3Bexp-session$dc_visit:1$dc_event:18%3Bexp-session$dc_region:eu-central-1%3Bexp-session; qb_session=6:1:29::0:YavJbCD:0:0:0:0:.louisvuitton.com; qb_generic=t055-redirect=0=%:YavOr++:.louisvuitton.com; _cs_id=be90ed4f-e23e-a208-e8ad-91772b1ff052.1677975727.1.1677977108.1677975727.1.1712139727117; _cs_s=6.0.0.1677978908507; _ga=GA1.1.1385044941.1677975727; qb_permanent=qn76yo7xmyo-0leunf9qo-1crvi5k:6:6:1:1:0::0:1:0:BkA+Cw:BkA+YU:::::223.132.107.73:ota:35688:japan:JP:35.55:139.73:kanto:392001:tokyo:9492:migrated|1677977108923:::YavOsG7:YavJbCD:0:0:0::0:0:.louisvuitton.com:0; _ga_S6ED35NYJQ=GS1.1.1677975727.1.1.1677977122.39.0.0; RT="z=1&dm=louisvuitton.com&si=3d472900-2bdc-43c7-a2ea-045827dc08af&ss=leunf8cr&sl=6&tt=awq&bcn=%2F%2F684d0d47.akstat.io%2F&ld=toi0&nu=1i5fg6d&cl=u04t"' \
        -H 'origin: https://jp.louisvuitton.com' \
        -H 'pragma: no-cache' \
        -H 'referer: https://jp.louisvuitton.com/jpn-jp/' \
        -H 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'sec-ch-ua-platform: "Windows"' \
        -H 'sec-fetch-dest: empty' \
        -H 'sec-fetch-mode: cors' \
        -H 'sec-fetch-site: same-site' \
        -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
        $url | jq . > $outfile
    fi
    i=$((i+1))
    echo $i
    echo "----- -----"
  done
  echo "----- ----- ----- -----"
done
