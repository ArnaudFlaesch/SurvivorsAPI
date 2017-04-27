var server = require('../src/server'),
    assert = require('assert'),
    http = require('http');

var port = process.env.PORT || 3000;

describe('server', function () {
    before(function () {
        server.listen(port)
    });

    after(function () {
        server.close();
    });
});

describe('Server status and Message', function () {
    it('status response should be equal 200', function (done) {
        http.get('http://localhost:'+port+'/', function (response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});