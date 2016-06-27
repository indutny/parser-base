'use strict';

function Base() {
  this.str = '';
  this.off = 0;
}
module.exports = Base;

Base.prototype.pos = function pos() {
  const lines = this.str.split(/(\r\n|\r|\n)/g);
  let lineNum = 1;
  let columnNum = 0;
  let off = 0;
  lines.every((line, i) => {
    const nextOff = off + line.length;
    if (nextOff <= this.off) {
      off = nextOff;
      return true;
    }

    lineNum = (i >>> 1) + 1;
    columnNum = this.off - off;
    return false;
  });

  return `${lineNum}:${columnNum}`;
};
exports.Base = Base;

Base.prototype.emptySpace = function emptySpace() {
  // NOTE: Optimized for performance
  const start = this.off;
  let off = this.off;
  const str = this.str;
  while (off < str.length) {
    const c = str.charCodeAt(off);
    // NOTE: no unicode spaces here, override it if unicode space is needed
    if (c !== 0x20 && (c < 0x0a || c > 0xd) && c !== 0x9)
      break;
    off++;
  }
  this.off = off;
  return off !== start;
};

Base.prototype.peek = function peek() {
  return this.str.charCodeAt(this.off);
};

Base.prototype.ended = function ended() {
  return this.off >= this.str.length;
};

Base.prototype.skip = function skip() {
  if (this.ended())
    throw new Error('Unexpected end');
  return this.str.charCodeAt(this.off++);
};

Base.prototype.expect = function expect(c) {
  const a = this.peek();
  if (a !== c) {
    throw new Error(`Expected char: ${String.fromCharCode(c)}, ` +
                    `but found ${String.fromCharCode(a)} at ${this.pos()}`);
  }
  this.off++;
};

Base.prototype.parse = function parse(str) {
  this.str = str;
  this.off = 0;

  let res;
  try {
    res = this.parseOne();
  } catch (e) {
    // Reduce the error stack
    throw new Error(e.message);
  }

  if (!this.ended()) {
    throw new Error(
        `Expected EOF, but found ${String.fromCharCode(this.peek())}`);
  }

  this.str = null;
  this.off = 0;
  return res;
};
