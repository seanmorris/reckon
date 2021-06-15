.PHONY: all package min dist prod clean

all: package dist min

package:
	npx babel source/ --out-dir .

dist:
	NODE_ENV=prod npx babel source/ --no-comments --out-file dist/sixgram.js

min:
	NODE_ENV=prod-min npx babel source/ --no-comments --out-file dist/sixgram.min.js

dependencies:
	npm install
