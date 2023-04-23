# Define project paths
SRC_DIR = src
DIST_DIR = dist

# TypeScript compiler options
TSC = tsc 
TSC_OPTIONS = --project .
CONVERT=npx tsc -p .
# Define targets
.PHONY: all build run test eslint parcel clean

all: build

build:
	$(TSC) $(TSC_OPTIONS) --outDir $(DIST_DIR)

game:
	$(CONVERT)
	node $(DIST_DIR)/game_loop.js

test:
	npm test

# world: 
# 	$(TSC) ${SRC_DIR}/world.ts $(TSC_OPTIONS)
optimal_road: 
	$(CONVERT)
	node $(DIST_DIR)/optimal_road.js

# actors: 
# 	$(TSC) ${SRC_DIR}/actors.ts $(TSC_OPTIONS)

# # movements:
# 	$(TSC) ${SRC_DIR}/movements.ts $(TSC_OPTIONS)

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
#	rm src/*.js
