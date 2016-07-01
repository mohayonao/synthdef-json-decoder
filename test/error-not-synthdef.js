"use strict";

const assert = require("assert");
const decoder = require("../src");

const buffer = new Uint8Array(8).buffer;

assert.throws(() => {
  decoder.decode(buffer);
}, TypeError);
