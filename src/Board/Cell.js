const util = require('util');

class Cell {
    constructor(value) {
        this.value = value;
    }

    isSymbolAllowed(symbol) {
        if (symbol.length !== 1) {
            return false;
        }
        return ['X', 'x', 'O', 'o'].indexOf(symbol) !== -1;
    }

    setSymbol(symbol) {
        if (!this.isSymbolAllowed(symbol)) {
            return util.format('Symbol : %s is not allowed', symbol);
        }

        this.value = symbol.toLowerCase();
        return true;
    }

    isAvailable() {
        return !isNaN(this.value);
    }

    getValue() {
        return this.value;
    }
}

module.exports = Cell;
