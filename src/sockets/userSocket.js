/**
 * Created by Arnaud on 11/06/2017.
 */

"use strict";

const userSocket = {};

userSocket.socket = null;
userSocket.playerList = [];

userSocket.initSocket = function (socket) {
    userSocket.socket = socket;
    userSocket.socket.on("playerLoggedIn", userSocket.playerLoggedIn);
    userSocket.socket.on("movePlayer", userSocket.movePlayer);
};

userSocket.playerLoggedIn = function (data) {
    userSocket.movePlayer({"_nickname": data._nickname, "_positionX": data._positionX, "_positionY": data._positionY});
};

userSocket.movePlayer = function (data) {
    userSocket.playerList = userSocket.playerList.filter(function (player) {
        return (player._nickname !== data._nickname);
    });
    userSocket.playerList.push(data);
    userSocket.socket.broadcast.emit("displayPlayers", userSocket.playerList);
    userSocket.socket.emit("displayPlayers", userSocket.playerList);
};

module.exports = userSocket;
