#!/bin/bash
# a => env; b => dir
a=$1
b=$2
c=$3
# task
rm -rf ./pack/$b
npm run build $b
if [ ${a} == 1 ];then
scp -r ./pack/$b root@192.168.0.5:/data/www/soft/template
else
./gtk -a http://192.168.0.5 -src ./pack/$b -dst template/newType/$b -t $c -refresh true  
fi
