# synthdef-json-decoder
[![Build Status](https://img.shields.io/travis/mohayonao/synthdef-json-decoder.svg?style=flat-square)](https://travis-ci.org/mohayonao/synthdef-json-decoder)
[![NPM Version](https://img.shields.io/npm/v/synthdef-json-decoder.svg?style=flat-square)](https://www.npmjs.org/package/synthdef-json-decoder)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://mohayonao.mit-license.org/)

decoder for [SuperCollider Synth Definition File Format](https://doc.sccode.org/Reference/Synth-Definition-File-Format.html)

## Installation

```
npm install synthdef-json-decoder
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
const decoder = require("synthdef-json-decoder");

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
    // param indices
    //   { name: the name of the parameter, 
    //     index: its index in the paramValues, 
    //     length: its length in the paramValues }
    "paramIndices": [
      { name: "amp", index: 0, length: 1 },
      { name: "freq", index: 1, length: 1 }
    ],
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
    "units": [
      [ "Control"     , 1, 0, [                                ], [ 1, 1 ] ],
      [ "SinOsc"      , 2, 0, [ [  0, 1 ], [ -1, 0 ]           ], [ 2    ] ],
      [ "BinaryOpUGen", 2, 2, [ [  1, 0 ], [  0, 0 ]           ], [ 2    ] ],
      [ "Out"         , 2, 0, [ [ -1, 0 ], [  2, 0 ], [ 2, 0 ] ], [      ] ]
    ],
    // variants
    //   { key: the name of the variant,
    //     values: variant initial parameter values }
    "variants": [
      { name: "beta", values: [ 0.5 , 1760 ] },
      { name: "alpha", values: [ 0.25,  880 ] }
    ]
  }
]
```

## License

MIT
