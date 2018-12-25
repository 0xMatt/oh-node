#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)

cd ${currentDir}

COMPONENTS=(config
  http
  kernel
  router)

SCOPED_PACKAGES=$(
  for P in ${PACKAGES[@]}; do echo \\@oh-node/${P}; done
)
