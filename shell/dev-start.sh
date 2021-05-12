#!/bin/bash
rm -rf tempAsset/*
npm run build:dev
node bundle/index.js
