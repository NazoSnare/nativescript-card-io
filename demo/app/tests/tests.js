var CardIo = require("nativescript-card-io").CardIo;
var cardIo = new CardIo();

describe("greet function", function() {
    it("exists", function() {
        expect(cardIo.scan).toBeDefined();
    });
});
