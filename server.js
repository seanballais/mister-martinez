// Mister Martinez will just send a message containing the message from senbuild
var login = require("facebook-chat-api");

login({ email: "mister.martinez.bot@gmail.com", password: "DarthVader123" }, function callback(err, api) {
    if (err) {
        return console.error(err);
    }

    api.setOptions({ listenEvents: true });
    api.listen(function(err, event) {
        if (err) {
            return console.error(err);
        }

        var Cleverbot = require('cleverbot-node');
        switch(event.type) {
            case "message":
                cleverbot = new Cleverbot;
                if (event.body.toLowerCase().indexOf("@mistermartinez") > -1) {
                    cleverbot.prepare();

                    // Get Cleverbot message
                    var msg = "";
                    cleverbot.write(event.body, function(response) {
                        msg = response.message;
                        api.sendMessage(msg, event.threadID);
                    })

                    console.log("Finished producing an output.");
                    console.log("Output:\n" + msg);
                }

                api.markAsRead(event.threadID, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

                break;
            case "event":
                console.log(event);
                break;
        }
    });
});
