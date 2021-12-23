#!/usr/bin/python3

import os
import re
import sys

ref_rx = re.compile("../../_static/")

def munge(src_name, dest_dir):
    name = os.path.basename(src_name)
    dest_path = os.path.join(dest_dir, name)
    with open(dest_path, 'w') as df:
        with open(src_name, 'r') as sf:
            for raw in sf:
                ln = ref_rx.sub("", raw)
                df.write(ln)


def main():
    if len(sys.argv) < 3:
        raise Exception("usage: %s source [ source ... ] target" % sys.argv[0])

    target = sys.argv.pop()
    if not os.path.isdir(target):
        raise Exception("target %s is not a directory" % target)

    for s in sys.argv[1:]:
        if not os.path.isfile(s):
            raise Exception("source %s is not a file" % s)

        munge(s, target)


if __name__ == "__main__":
    main()
