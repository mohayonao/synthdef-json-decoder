# synthdef-decoder
[![Build Status](http://img.shields.io/travis/mohayonao/synthdef-decoder.svg?style=flat-square)](https://travis-ci.org/mohayonao/synthdef-decoder)
[![NPM Version](http://img.shields.io/npm/v/synthdef-decoder.svg?style=flat-square)](https://www.npmjs.org/package/synthdef-decoder)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

decode [SuperCollider Synth Definition File Format](http://doc.sccode.org/Reference/Synth-Definition-File-Format.html) and convert to JSON.

## Installation

```
npm install synthdef-decoder
```

## API

- `decode(buffer: ArrayBuffer): Object[]`

## Example

```rb
SynthDef("sine", { |amp = 0.5, freq = 440|
   Out.ar(0, SinOsc.ar(freq, 0, amp) ! 2);
}, variants:(alpha:[amp:0.25,freq:880], beta:[freq:1760]))
```

```js
const fs = require("fs");
const decoder = require("synthdef-decoder");

const file = fs.readFileSync("sine.scsyndef");
const buffer = new Uint8Array(file).buffer;
const json = decoder.decode(buffer);

console.log(json);
```

```js
[
  {
    // the name of the synth definition
    "name": "sine",
    // constant values
    "consts": [ 0 ],
    // initial parameter values
    "paramValues": [ 0.5, 440 ],
    // param-name
    //   { key: the name of the parameter, value: its index and length in the parameter array }
    "paramIndices": { "amp": { index: 0, length: 1 }, "freq": { index: 1, length: 1 } },
    // ugen-spec
    //   [ [
    //     the name of the SC unit generator class,
    //     calculation rate (0: Scalar, 1: Control, 2: Audio),
    //     special index,
    //     input-spec,
    //       [ [ index of unit generator, index of unit generator output ]
    //           or [ -1 for a constant, index of constant ] ]
    //     output-spec
    //       [ calculation rate ]
    //   ] ]
    "specs": [
      [ "Control"     , 1, 0, [                                ], [ 1, 1 ] ],
      [ "SinOsc"      , 2, 0, [ [  0, 1 ], [ -1, 0 ]           ], [ 2    ] ],
      [ "BinaryOpUGen", 2, 2, [ [  1, 0 ], [  0, 0 ]           ], [ 2    ] ],
      [ "Out"         , 2, 0, [ [ -1, 0 ], [  2, 0 ], [ 2, 0 ] ], [      ] ]
    ],
    // variant-spec
    //   { key: the name of the variant, value: variant initial parameter values }
    "variants": {
      "alpha": [ 0.25,  880 ],
      "beta" : [ 0.5 , 1760 ]
    }
  }
]
```

## License

MIT
