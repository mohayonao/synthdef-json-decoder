"use strict";

const SynthDefDecoder2 = require("./SynthDefDecoder2");

class SynthDefDecoder1 extends SynthDefDecoder2 {
  readNumberOfConstants() {
    return this.reader.readInt16();
  }

  readNumberOfParamValues() {
    return this.reader.readInt16();
  }

  readNumberOfParamIndices() {
    return this.reader.readInt16();
  }

  readParamNameIndex() {
    return this.reader.readInt16();
  }

  readNumberOfUnits() {
    return this.reader.readInt16();
  }

  readUGenNumberOfInputs() {
    return this.reader.readInt16();
  }

  readIndexOfUGen() {
    return this.reader.readInt16();
  }

  readIndexOfUGenOutput() {
    return this.reader.readInt16();
  }

  readUGenNumberOfOutputs() {
    return this.reader.readInt16();
  }
}

module.exports = SynthDefDecoder1;
