"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const decoder = require("../src");

// SynthDef(\inf, { |iter = inf|
//   var im = Impulse.kr(0.5);
//   var f1 = Demand.kr(im, -inf, Dser([ 60, 64, 67 ], iter));
//   var f2 = Demand.kr(im, -inf, Dser([ 60, 64, 67 ], inf));
//
//   Out.ar(0, SinOsc.ar([ f1, f2 ]));
// })

fs.readFile(path.join(__dirname, "inf.scsyndef"), (err, buffer) => {
  assert(!err, err);

  const arrayBuffer = new Uint8Array(buffer).buffer;
  const actual1 = decoder.decode(buffer);
  const actual2 = decoder.decode(arrayBuffer);

  const expected = [
    {
      name: "inf",
      consts: [ 0.5, 0, 60, 64, 67, "-Infinity", "Infinity" ],
      paramValues: [ "Infinity" ],
      paramIndices: [
        { name: "iter", index: 0, length: 1 },
      ],
      units: [
        [ "Control", 1, 0, [                                            ], [ 1 ] ],
        [ "Dser"   , 3, 0, [ [  0, 0 ], [ -1, 2 ], [ -1, 3 ], [ -1, 4 ] ], [ 3 ] ],
        [ "Impulse", 1, 0, [ [ -1, 0 ], [ -1, 1 ]                       ], [ 1 ] ],
        [ "Demand" , 1, 0, [ [  2, 0 ], [ -1, 5 ], [  1, 0 ]            ], [ 1 ] ],
        [ "SinOsc" , 2, 0, [ [  3, 0 ], [ -1, 1 ]                       ], [ 2 ] ],
        [ "Dser"   , 3, 0, [ [ -1, 6 ], [ -1, 2 ], [ -1, 3 ], [ -1, 4 ] ], [ 3 ] ],
        [ "Demand" , 1, 0, [ [  2, 0 ], [ -1, 5 ], [  5, 0 ]            ], [ 1 ] ],
        [ "SinOsc" , 2, 0, [ [  6, 0 ], [ -1, 1 ]                       ], [ 2 ] ],
        [ "Out"    , 2, 0, [ [ -1, 1 ], [  4, 0 ], [  7, 0 ]            ], [   ] ]
      ],
      variants: []
    }
  ];

  assert.deepEqual(actual1, expected);
  assert.deepEqual(actual1, actual2);
});
