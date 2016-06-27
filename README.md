# parser-base
[![NPM version](https://badge.fury.io/js/parser-base.svg)](http://badge.fury.io/js/parser-base)
[![Build Status](https://secure.travis-ci.org/indutny/parser-base.svg)](http://travis-ci.org/indutny/parser-base)

## Use

```js
const util = require('util');
const Base = require('parser-base');

function MyParser() {
  Base.call(this);
}
util.inherits(MyParser, Base);

MyParser.prototype.parseOne = function parseOne() {
  this.emptySpace();
  this.expect(0x68 /* 'h' */);
  this.expect(0x65 /* 'e' */);
  this.expect(0x6c /* 'l' */);
  this.expect(0x6c /* 'l' */);
  this.expect(0x6f /* 'o' */);
  this.emptySpace();

  return 'hello';
};

const p = new MyParser();
p.parse('   hello  ');
```

## LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2016.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
