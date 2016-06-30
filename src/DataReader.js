"use strict";

const nmap = require("nmap");

class DataReader {
  constructor(buffer) {
    this.view = new DataView(buffer);
    this._index = 0;
  }

  readInt8() {
    this._index += 1;
    return this.view.getInt8(this._index - 1);
  }

  readInt16() {
    this._index += 2;
    return this.view.getInt16(this._index - 2);
  }

  readInt32() {
    this._index += 4;
    return this.view.getInt32(this._index - 4);
  }

  readFloat32() {
    this._index += 4;
    return this.view.getFloat32(this._index - 4);
  }

  readPascalString() {
    return nmap(this.readInt8(), () => String.fromCharCode(this.readInt8())).join("");
  }
}

module.exports = DataReader;
