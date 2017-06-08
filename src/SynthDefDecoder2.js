"use strict";

const nmap = require("nmap");

class SynthDefDecoder2 {
  constructor(reader) {
    this.reader = reader;
  }

  decode() {
    const name = this.readNameOfSynthDef();
    const numberOfConstants = this.readNumberOfConstants();
    const consts = nmap(numberOfConstants, () => toJSONableNumber(this.readConstantValue()));
    const numberOfParamValues = this.readNumberOfParamValues();
    const paramValues = nmap(numberOfParamValues, () => toJSONableNumber(this.readInitialParamValue()));
    const numberOfParamIndices = this.readNumberOfParamIndices();
    const paramIndices = toParamIndices(nmap(numberOfParamIndices, () => this.readParamItems()), numberOfParamValues);
    const numberOfUnits = this.readNumberOfUnits();
    const units = nmap(numberOfUnits, () => this.readUGenSpec());
    const numberOfVariants = this.readNumberOfVariants();
    const variants = nmap(numberOfVariants, () => this.readVariantSpec(numberOfParamValues));

    return { name, consts, paramValues, paramIndices, units, variants };
  }

  readParamItems() {
    return { name: this.readParamName(), index: this.readParamNameIndex() };
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
    const values = nmap(numberOfParamValues, () => toJSONableNumber(this.readVariantValue()));

    return { name, values };
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

  readNumberOfUnits() {
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

function toJSONableNumber(value) {
  return (value === Infinity || value === -Infinity) ? "" + value : value;
}

function toParamIndices(listOfParamIndices, numberOfParamValues) {
  listOfParamIndices.slice().sort((a, b) => {
    return a.index - b.index;
  }).forEach((item, i, listOfParamIndices) => {
    const nextItem = listOfParamIndices[i + 1];
    const nextIndex = nextItem ? nextItem.index : numberOfParamValues;

    item.length = nextIndex - item.index;
  });
  return listOfParamIndices;
}

module.exports = SynthDefDecoder2;
