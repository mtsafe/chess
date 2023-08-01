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

fi