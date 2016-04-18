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

        const Simsimi = require("simsimi");
        const bot = new Simsimi({
            key: "0da76951-3f0d-49be-9be3-e014f658644b"
        });
        switch(event.type) {
            case "message":
                if (event.body.toLowerCase().indexOf("@mistermartinez") > -1) {
                    bot.listen(event.body, function(err, response) {
                        if (err) {
                            return console.error(err);
                        }

                        console.log("Output:\n" + response);
                        api.sendMessage(response, event.threadID);
                    });
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
