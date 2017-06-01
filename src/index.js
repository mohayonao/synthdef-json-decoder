"use strict";

const nmap = require("nmap");
const DataReader = require("./DataReader");
const SynthDefDecoder2 = require("./SynthDefDecoder2");
const SynthDefDecoder1 = require("./SynthDefDecoder1");

function decodeSynthDef(data, opts = {}) {
  const reader = new DataReader(data);

  if (reader.readInt32() !== 0x53436766) {
    throw new TypeError("synthdef should be start with 'SCgf'");
  }

  const version = reader.readInt32();

  if (version !== 1 && version !== 2) {
    throw new TypeError(`invalid version: ${ version }`);
  }

  const numberOfSynthDefs = reader.readInt16();
  const SynthDefDecoder = version === 1 ? SynthDefDecoder1 : SynthDefDecoder2;
  const decoder = new SynthDefDecoder(reader);
  const defs = nmap(numberOfSynthDefs, () => decoder.decode());

  if (opts.version) {
    return { version, defs };
  }

  return defs;
}

module.exports = {
  decode: (data, opts) => decodeSynthDef(data, opts)
};
