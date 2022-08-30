all: assemblyscript assemblyscript/hookapi.ts

assemblyscript/hookapi.ts: assemblyscriptsrc/hookapi_head.ts assemblyscriptsrc/error.ts assemblyscriptsrc/extern.ts assemblyscriptsrc/sfcodes.ts assemblyscriptsrc/macro.ts
	cat $^ > $@

assemblyscript:
	mkdir assemblyscript

clean:
	-rm -rf assemblyscript
