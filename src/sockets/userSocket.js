/**
 * Created by Arnaud on 11/06/2017.
 */

var userSocket = {

    playerLoggedIn : function(socket) {
        socket.emit("playerLoggedIn");
    }
};

module.exports = userSocket;