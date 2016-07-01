"use strict";

const nmap = require("nmap");
const DataReader = require("./DataReader");
const SynthDefDecoder2 = require("./SynthDefDecoder2");
const SynthDefDecoder1 = require("./SynthDefDecoder1");

function readSynthDefFile(reader) {
  if (reader.readInt32() !== 0x53436766) {
    throw new TypeError("synthdef should be start with 'SCfg'");
  }

  const version = reader.readInt32();

  if (version !== 1 && version !== 2) {
    throw new TypeError(`invalid version: ${ version }`);
  }

  const numberOfSynthDefs = reader.readInt16();
  const SynthDefDecoder = version === 1 ? SynthDefDecoder1 : SynthDefDecoder2;
  const decoder = new SynthDefDecoder(reader);

  return nmap(numberOfSynthDefs, () => decoder.decode());
}

module.exports = {
  decode: buffer => readSynthDefFile(new DataReader(buffer))
};
