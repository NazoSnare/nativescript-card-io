var CardIo = require("nativescript-card-io").CardIo;
var cardIo = new CardIo();

describe("greet function", function() {
    it("exists", function() {
        expect(cardIo.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(cardIo.greet()).toEqual("Hello, NS");
    });
});