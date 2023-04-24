# Define project paths
SRC_DIR = src
DIST_DIR = dist

# TypeScript compiler options
TSC = tsc
NPX = npx 
TSC_OPTIONS = --project .
CONVERT=$(NPX) $(TSC) -p .
# Define targets
.PHONY: all build run test eslint parcel clean

all: build run

build:
	$(CONVERT)

run:
	node $(DIST_DIR)/game_loop.js

test:
	npm test

# world: 
# 	$(TSC) ${SRC_DIR}/world.ts $(TSC_OPTIONS)

# actors: 
# 	$(TSC) ${SRC_DIR}/actors.ts $(TSC_OPTIONS)

# movements:
	$(TSC) ${SRC_DIR}/movements.ts $(TSC_OPTIONS)

html: index.html
	tidy -q -o index.html index.html

css: style.scss
	sass style.scss style.css

eslint:
	npm eslint src tst

parcel:
	npm run parcel

clean:
	rm -rf $(DIST_DIR)/*
	rm -f *~
