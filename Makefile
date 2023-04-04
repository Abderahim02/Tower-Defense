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
	node $(DIST_DIR)/index.js

test:
	npm test

world: 
	node ${SRC_DIR}/world.js

actors: 
	node ${SRC_DIR}/actors.js

movements:
	node ${SRC_DIR}/movements.js

game_loop:
	node ${SRC_DIR}/game_loop.js

move:
	node ${SRC_DIR}/test_move.js

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