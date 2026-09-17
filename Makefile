.PHONY: install verify clean
install:
	cd linkedin-clone && npm ci
verify:
	cd linkedin-clone && npm test && npm run build
clean:
	rm -rf linkedin-clone/dist
