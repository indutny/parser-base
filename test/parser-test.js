'use strict';

const assert = require('assert');
const util = require('util');

const Base = require('../');

describe('parser-base', () => {
  let p;

  beforeEach(() => {
    p = new Base();
  });

  afterEach(() => {
    p = null;
  });

  it('should support `.pos()`', () => {
    let pos;

    p.parseOne = function parseOne() {
      for (let i = 0; i < 14; i++)
        this.skip();

      pos = p.pos();

      while (!this.ended())
        this.skip();
    };

    p.parse('hello\nworld\r\n123');

    assert.equal(pos, '3:1');
  });

  it('should support `.expect()`/`.emptySpace()`', () => {
    let pos;

    p.parseOne = function parseOne() {
      this.emptySpace();
      this.expect(0x68 /* 'h' */);
      this.expect(0x65 /* 'e' */);
      this.expect(0x6c /* 'l' */);
      this.expect(0x6c /* 'l' */);
      this.expect(0x6f /* 'o' */);
      this.emptySpace();

      return 'hello';
    };

    assert.equal(p.parse('   hello   '), 'hello');
  });

  it('should support `.peek()`', () => {
    let pos;

    p.parseOne = function parseOne() {
      this.emptySpace();
      if (this.peek() === 0x68) {
        this.expect(0x68 /* 'h' */);
        this.expect(0x65 /* 'e' */);
        this.expect(0x6c /* 'l' */);
        this.expect(0x6c /* 'l' */);
        this.expect(0x6f /* 'o' */);
        this.emptySpace();

        return 'hello';
      }

      return 'world';
    };

    assert.equal(p.parse('   hello   '), 'hello');
    assert.equal(p.parse('   '), 'world');
  });
});
