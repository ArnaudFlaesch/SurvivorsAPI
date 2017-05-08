const server = require("../src/server"),
    assert = require('assert'),
    request = require("supertest"),
    should = require('should');

describe("server", function () {
    before(function () {
        server.listen(port);
    });

    after(function () {
        server.close();
    });
});

describe("Server status and Message", function () {
    it("status response should be equal 200", function (done) {
        request(server)
            .get('/')
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.body.message, "Welcome to Survivors API !");
                done();
            });
    });
});