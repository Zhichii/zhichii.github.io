# 常用命令：make serve / make build / make new NAME=标题
HUGO := ./bin/hugo
# 缓存锁在项目内，避免写 ~/.cache
export HUGO_CACHEDIR := $(CURDIR)/resources/_cache

.PHONY: serve build clean new

serve:
	$(HUGO) server -D --bind 127.0.0.1 --port 1313

build:
	$(HUGO) --gc --minify

clean:
	rm -rf public resources/_cache

new:
	$(HUGO) new content/blog/$(shell date +%Y-%m-%d)-$(NAME).md
