/**
 * Created by Arnaud on 06/05/2017.
 */

const server = require("../src/server"),
    assert = require("assert"),
    request = require("supertest"),
    should = require("should");

describe("server", function () {
    before(function () {
        server.listen(port);
    });

    after(function () {
        server.close();
    });
});

describe("User tests", function () {
    it("should register an user", function (done) {
        request(server)
            .post("/user/register")
            .send({ _nickname: "aflaesch", _email: "aflaesch@gmail.com", _password: "root"})
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.body._nickname, "aflaesch");
            });

        request(server)
            .post("/user/register")
            .send({ _nickname: "aflaesch2", _email: "aflaesch2@gmail.com", _password: "root"})
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.body._nickname, "aflaesch2");
                done();
            });
    });

    it("should fail to register because of same login or email", function (done) {
        request(server)
            .post("/user/register")
            .send({ _nickname: "aflaesch", _email: "aflaesch@gmail.com", _password: "root"})
            .expect(500)
            .expect( {error: "L'email ou le pseudo est déjà utilisé."}, done);
    });

    it("should log in an user", function (done) {
        request(server)
            .post("/user/login")
            .send({ _nickname: "aflaesch", _password: "root"})
            .expect(200)
            .end(function(err, res) {
                console.log(res.body);
                assert.equal(res.body._nickname, "aflaesch");
                done();
            });
    });

    it("should get the users list", function (done) {
        request(server)
            .get("/user/list")
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.body.length, 2);
                done();
            });
    });

    it("should get the first user's data", function (done) {
        request(server)
            .get("/user/list")
            .expect(200)
            .end(function(err, res) {
                request(server)
                    .get("/user/info/"+res.body[0]._id)
                    .expect(200)
                    .end(function(err, res) {
                        assert.equal(res.body._nickname, "aflaesch");
                        done();
                    })
            });
    });

    it("should update the first user's data", function (done) {
        request(server)
            .get("/user/list")
            .expect(200)
            .end(function(err, res) {
                res.body[0]._email = "arnaudflaesch@gmail.com";
                request(server)
                    .put("/user/update")
                    .send(res.body[0])
                    .expect(200)
                    .end(function(err, res) {
                        assert.equal(res.body._email, "arnaudflaesch@gmail.com");
                        done();
                    })
            });
    });

    it("should delete he second user", function (done) {
        request(server)
            .get("/user/list")
            .expect(200)
            .end(function(err, res) {
                request(server)
                    .delete("/user/delete/"+res.body[1]._id)
                    .expect(200)
                    .end(function(err, res) {
                        assert.equal(res.body.message, "User successfully deleted.");
                        request(server)
                            .get("/user/list")
                            .expect(200)
                            .end(function(err, res) {
                                assert.equal(res.body.length, 1);
                                done();
                            });
                    })
            });
    });
});