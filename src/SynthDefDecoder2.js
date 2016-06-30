"use strict";

const nmap = require("nmap");
const fromPairs = require("lodash.frompairs");

class SynthDefDecoder2 {
  constructor(reader) {
    this.reader = reader;
  }

  decode() {
    const name = this.readNameOfSynthDef();
    const numberOfConstants = this.readNumberOfConstants();
    const consts = nmap(numberOfConstants, () => this.readConstantValue());
    const numberOfParamValues = this.readNumberOfParamValues();
    const paramValues = nmap(numberOfParamValues, () => this.readInitialParamValue());
    const numberOfParamIndices = this.readNumberOfParamIndices();
    const paramIndices = fromPairs(nmap(numberOfParamIndices, () => this.readParamItems()));
    const numberOfUGenSpecs = this.readNumberOfUGenSpecs();
    const specs = nmap(numberOfUGenSpecs, () => this.readUGenSpec());
    const numberOfVariants = this.readNumberOfVariants();
    const variants = fromPairs(nmap(numberOfVariants, () => this.readVariantSpec(numberOfParamValues)));

    return { name, consts, paramValues, paramIndices, specs, variants };
  }

  readParamItems() {
    return [ this.readParamName(), this.readParamNameIndex() ];
  }

  readUGenSpec() {
    const name = this.readUGenName();
    const rate = this.readUGenRate();
    const numberOfInputs = this.readUGenNumberOfInputs();
    const numberOfOutputs = this.readUGenNumberOfOutputs();
    const specialIndex = this.readUGenSpecialIndex();
    const inputSpecs = nmap(numberOfInputs, () => this.readUGenInputSpec());
    const outputSpecs = nmap(numberOfOutputs, () => this.readUGenOutputSpec());

    return [ name, rate, specialIndex, inputSpecs, outputSpecs ];
  }

  readUGenInputSpec() {
    const indexOfUGen = this.readIndexOfUGen();
    const indexOfUGenOutput = this.readIndexOfUGenOutput();

    return [ indexOfUGen, indexOfUGenOutput ];
  }

  readUGenOutputSpec() {
    const calculationRate = this.readUGenRate();

    return calculationRate;
  }

  readVariantSpec(numberOfParamValues) {
    const name = this.readVariantName().replace(/^.+?\./, "");
    const values = nmap(numberOfParamValues, () => this.readVariantValue());

    return [ name, values ];
  }

  readNameOfSynthDef() {
    return this.reader.readPascalString();
  }

  readNumberOfConstants() {
    return this.reader.readInt32();
  }

  readConstantValue() {
    return this.reader.readFloat32();
  }

  readNumberOfParamValues() {
    return this.reader.readInt32();
  }

  readInitialParamValue() {
    return this.reader.readFloat32();
  }

  readNumberOfParamIndices() {
    return this.reader.readInt32();
  }

  readParamName() {
    return this.reader.readPascalString();
  }

  readParamNameIndex() {
    return this.reader.readInt32();
  }

  readNumberOfUGenSpecs() {
    return this.reader.readInt32();
  }

  readUGenName() {
    return this.reader.readPascalString();
  }

  readUGenRate() {
    return this.reader.readInt8();
  }

  readUGenNumberOfInputs() {
    return this.reader.readInt32();
  }

  readUGenNumberOfOutputs() {
    return this.reader.readInt32();
  }

  readUGenSpecialIndex() {
    return this.reader.readInt16();
  }

  readIndexOfUGen() {
    return this.reader.readInt32();
  }

  readIndexOfUGenOutput() {
    return this.reader.readInt32();
  }

  readNumberOfVariants() {
    return this.reader.readInt16();
  }

  readVariantName() {
    return this.reader.readPascalString();
  }

  readVariantValue() {
    return this.reader.readFloat32();
  }
}

module.exports = SynthDefDecoder2;
