#!/bin/bash

#Computes the suggested PG count similar to this http://ceph.com/pgcalc/

#Reguirements:
#  - must run on ceph admin
#  - depends on awk, wc and bc commands

#Limitations:
#  - Assumes same OSD# for all pools

POOL_DETAIL=$(ceph osd pool ls detail 2> /dev/null)
DF=$(ceph df 2> /dev/null)
NUM_OSD=$(ceph osd ls 2> /dev/null | wc -l)

FORMAT="%-15s %8s %8s %8s %8s %8s %11s %11s %8s\n"
printf "$FORMAT" "POOL" "SIZE" "OSD#" "%DATA" "PG(100)" "PG(200)" "PG(100@80%)" "PG(200@80%)" "PG(NOW)"
printf "$FORMAT" | tr ' ' -

power2() {
  if [ $1 -lt 1 ]; then echo 2; return; fi
  echo "x=l($1)/l(2); scale=0; 2^((x+0.5)/1)" | bc -l
}

pgcalc(){
  TARGET_POOL="$1"
  SIZE=$(echo -n "$POOL_DETAIL" | grep $TARGET_POOL | awk '{print $6}')
  PG_NOW=$(echo -n "$POOL_DETAIL" | grep $TARGET_POOL | awk '{print $16}')
  PCT_DATA=$(echo -n "$DF" | grep $TARGET_POOL | awk '{print $4}')

  PG_100="$(power2 $(echo "(100 * $NUM_OSD * $PCT_DATA*0.01) / $SIZE" | bc))"
  PG_100_80_PCT=$(power2 $(echo "(100 * $NUM_OSD * 80*0.01) / $SIZE" | bc))
  PG_200=$(power2 $(echo "(200 * $NUM_OSD * $PCT_DATA*0.01) / $SIZE" | bc))
  PG_200_80_PCT=$(power2 $(echo "(200 * $NUM_OSD * 80*0.01) / $SIZE" | bc))

  printf "$FORMAT" "$TARGET_POOL" "$SIZE" "$NUM_OSD" "$PCT_DATA" "$PG_100" "$PG_200" "$PG_100_80_PCT" "$PG_200_80_PCT" "$PG_NOW"
}

for pool in $(echo -n "$POOL_DETAIL" | awk '{print $3}' | tr -d \'); do
  pgcalc $pool
done
