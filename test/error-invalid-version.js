"use strict";

const assert = require("assert");
const decoder = require("../src");

const buffer = new Uint8Array([ 0x53, 0x43, 0x67, 0x66, 0xFF, 0xFF, 0xFF, 0xFF ]).buffer;

assert.throws(() => {
  decoder.decode(buffer);
}, TypeError);
