#!/usr/bin/env bash
cd /home
export app_root=/home/bookmarkd-prod
if [ -d "$app_root" ]; then
    rm -r bookmarkd-prod
fi