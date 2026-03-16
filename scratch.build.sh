#!/usr/bin/sh
sudo systemctl restart docker
img_id=tmp
docker rm tmp 2>/dev/null || true
docker build -t $img_id .
docker create --name $img_id $img_id
docker cp $img_id:/lo/scratch /junk/_ws_/scratch
docker rm $img_id
