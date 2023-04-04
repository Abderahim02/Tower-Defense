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
	node $(DIST_DIR)/index.ts

test:
	npm test

world: 
	node ${SRC_DIR}/world.ts

actors: 
	node ${SRC_DIR}/actors.ts

movements:
	node ${SRC_DIR}/movements.ts

game_loop:
	node ${SRC_DIR}/game_loop.ts

move:
	node ${SRC_DIR}/test_move.ts

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