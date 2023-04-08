# Define project paths
SRC_DIR = src
DIST_DIR = dist

# TypeScript compiler options
TSC = tsc
TSC_OPTIONS = --project $(SRC_DIR) --outDir $(DIST_DIR)

# Define targets
.PHONY: all build run test eslint parcel clean

all: move

build:
	$(TSC) $(TSC_OPTIONS)

run:
	tsc $(SRC_DIR)/game_loop.ts

test:
	npm test

world: 
	tsc ${SRC_DIR}/world.ts

actors: 
	tsc ${SRC_DIR}/actors.ts

movements:
	tsc ${SRC_DIR}/movements.ts


html: index.html
	tidy -q -o index.html index.html

css: style.scss
	sass style.scss style.css

eslint:
	npm run eslint

parcel:
	npm run parcel

clean:
	rm -rf $(DIST_DIR)/*
	rm -f *~
	rm $(SRC_DIR)/*.js