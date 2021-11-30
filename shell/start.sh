#!/bin/sh
clear # Clean out put
tsc
NODE_ENV=development node --inspect bundle/index.js
# node inspect dist/src/index.js