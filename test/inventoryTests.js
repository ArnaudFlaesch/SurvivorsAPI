/**
 * Created by Arnaud on 06/05/2017.
 */

const server = require("../src/server"),
    assert = require("assert"),
    weaponModel = require("../src/model/weapon"),
    request = require("supertest"),
    should = require("should"),
    user = require("../src/model/user");

describe("server", function () {
    before(function () {
        server.listen(port);
    });

    after(function () {
        server.close();
    });
});

describe("Inventory tests", function () {
    it("should add one item to a newly registered user's inventory", function (done) {
        request(server)
            .post("/user/register")
            .send({ "_nickname": "userInventoryTest", "_email": "userInventoryTest@gmail.com", "_password": "root"})
            .expect(200)
            .end(function(err, res) {
                request(server)
                    .post("/inventory/" + res.body._id)
                    .send(weaponModel)
                    .expect(200)
                    .end(function(err, res) {
                        assert.equal(res.body.length, 4);
                        done();
                    });
            });
    });

    it("should delete one item from an user's inventory", function (done) {
        request(server)
            .post("/user/login")
            .send({ "_nickname": "userInventoryTest", "_password": "root"})
            .expect(200)
            .end(function(err, res) {
                request(server)
                    .post("/inventory/delete/" + res.body._id)
                    .send(res.body._inventory[2])
                    .expect(200)
                    .end(function(err, res) {
                        assert.equal(res.body.length, 3);
                        done();
                    });
            });
    });
});