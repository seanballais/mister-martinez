// Mister Martinez will just send a message containing the message from senbuild
var login = require("facebook-chat-api");

login({ email: "mister.martinez.bot@gmail.com", password: "" }, function callback(err, api) {
    if (err) {
        return console.error(err);
    }

    api.setOptions({ listenEvents: true });
    api.listen(function(err, event) {
        if (err) {
            return console.error(err);
        }

        switch(event.type) {
            case "message":
                if (event.body.toLowerCase().indexOf("@mistermartinez") > -1) {
                    var exec = require("child_process").exec;
                    var msg = "";
                    var child = exec("./bin/sebuild -f data.txt");
                    child.stdout.on("data", function(data) {
                        msg += data;
                    });

                    child.on("close", function() {
                        console.log("Finished producing an output.");
                        console.log("Output:\n" + msg);
                    })

                    api.sendMessage(msg, event.threadID);
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
