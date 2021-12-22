#!/usr/bin/python3

import sys

class Demultiplex:
    def __init__(self, log_name):
        self.log_name = log_name
        self.incoming_count = 0
        self.outgoing_count = 0
        self.request2count = {}
        self.reply2count = {}
        self.expected_multiple = {
            '$/cancelRequest': 2,
            'textDocument/didOpen': 2, # accept.c + hookapi.h
            'textDocument/publishDiagnostics': 2
        }

    def parse(self, ln):
        if ln.startswith("Forwarding new client"):
            self.incoming_count += 1
        elif ln.find("LSP finished, exiting with status") >= 0:
            self.outgoing_count += 1
        else:
            self.parse_message(ln, self.request2count, "<--")
            self.parse_message(ln, self.reply2count, "-->")

    @staticmethod
    def parse_message(ln, r2count, arrow):
        pos = ln.find(arrow)
        if pos >= 0:
            tail = ln[(pos + len(arrow)):]
            words = tail.split()
            if len(words):
                msg = words[0].strip()
                if msg:
                    cnt = r2count.get(msg, 0)
                    r2count[msg] = 1 + cnt

    def dump(self):
        if self.incoming_count == self.outgoing_count:
            print("%s: %d clients handled" % (self.log_name, self.incoming_count))
        else:
            raise Exception("%s: %d incoming, %d outgoing" % (self.log_name, self.incoming_count, self.outgoing_count))

        self.dump_message_count(self.request2count, "<--")
        self.dump_message_count(self.reply2count, "-->")

    def dump_message_count(self, r2count, arrow):
        for msg, cnt in sorted(r2count.items()):
            mult = self.expected_multiple.get(msg, 1)
            if cnt != (self.incoming_count * mult):
                print("\t%d x %s %s" % (cnt, arrow, msg))


def main():
    for a in sys.argv[1:]:
        demultiplex = Demultiplex(a)
        with open(a) as f:
            for ln in f:
                demultiplex.parse(ln)

        demultiplex.dump()


if __name__ == "__main__":
    main()
