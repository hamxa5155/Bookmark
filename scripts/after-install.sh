# Once installed files, must install all dependencies with npm install
# Then can build production static React files to serve

#!/usr/bin/env bash
cd /home/bookmarkd-prod
npm install
cd frontend
npm install
cd ..
npm run build:prod