#!/bin/bash

npm run cy:allnovid | tee ./tmp/run.out

if fgrep 'All specs passed!' ./tmp/run.out  ; then

  [[ ! -d "./bak" ]] && mkdir ./bak > /dev/null 2>&1
  [[ ! -d "./bak/src" ]] && mkdir ./bak/src > /dev/null 2>&1
  [[ ! -d "./bak/state" ]] && mkdir ./bak/state > /dev/null 2>&1
  [[ ! -d "./bak/lib" ]] && mkdir ./bak/lib > /dev/null 2>&1

  echo "Backing up source code ..."
  cp src/* ./bak/src > /dev/null 2>&1
  cp src/state/* ./bak/state > /dev/null 2>&1
  cp src/lib/* ./bak/lib > /dev/null 2>&1

  theFiles1=`ls ./bak/src/*.jsx ./bak/src/*.css ./bak/state/*.js ./bak/lib/*.js ./bin/* ./cypress/e2e/chess/*.js`
  theFiles2=`ls ./*.js ./*.md ./package.json ./*.html ./*.css ./.gitignore ./.github/workflows/*.yml`
  linesCount1=`wc -l ${theFiles1} ${theFiles2} | grep total`
  echo "${linesCount1} lines!"
fi