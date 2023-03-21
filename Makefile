# Define project paths
SRC_DIR = src
DIST_DIR = dist

# TypeScript compiler options
TSC = tsc
TSC_OPTIONS = --project $(SRC_DIR) --outDir $(DIST_DIR)

# Define targets
.PHONY: all build run test eslint parcel clean

all: build

build:
	$(TSC) $(TSC_OPTIONS)

run:
	node $(DIST_DIR)/index.js

test:
	npm test

eslint:
	npm run eslint

parcel:
	npm run parcel

clean:
	rm -rf $(DIST_DIR)/*
	rm -f *~