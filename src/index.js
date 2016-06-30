"use strict";

const assert = require("assert");
const nmap = require("nmap");
const DataReader = require("./DataReader");
const SynthDefDecoder2 = require("./SynthDefDecoder2");
const SynthDefDecoder1 = require("./SynthDefDecoder1");

function decodeSynthDefFile(reader) {
  assert(reader.readInt32() === 0x53436766, "synthdef should be start with 'SCfg'");

  const version = reader.readInt32();
  const numberOfSynthDefs = reader.readInt16();
  const SynthDefDecoder = version === 1 ? SynthDefDecoder1 : SynthDefDecoder2;
  const decoder = new SynthDefDecoder(reader);

  return nmap(numberOfSynthDefs, () => decoder.decode());
}

module.exports = {
  decode: buffer => decodeSynthDefFile(new DataReader(buffer))
};
