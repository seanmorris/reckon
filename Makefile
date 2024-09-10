.PHONY: all demo test

all: dependencies demo test

demo:
	cp ./Actions.mjs ./Chunk.mjs ./Parser.mjs ./Renderer.mjs docs/

serve-demo:
	cd docs/ && npx http-server

dependencies:
	npm install

test:
	@ cd test/ \
	&& npx cvtest ${TESTLIST} > ../results.json
