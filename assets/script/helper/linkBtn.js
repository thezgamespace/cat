var nodeBase = require("nodeBase");

cc.Class({
    extends: nodeBase,
    properties: {
        btn: cc.Button,
        /**make sure it's the same name as the setting that you want to get */
        divName: cc.String,
        url: cc.String,
        NewWindow: cc.Boolean,
        Enabled: cc.Boolean,

    },


    getData() {

        var settings = require("settings")._SETTINGS;
        var data = settings[this.divName]
        if (data != undefined) {
            this.url = data.Link;
            this.NewWindow = data.NewWindow;
            this.Enabled = data.Enabled;
        }
        if (this.divName == "MoreGames" && settings.Apk == true) {
            this.Enabled = false;
        }
    },
    onLoad() {


        this.getData();

        if (this.Enabled == true) {

        } else {
            this.node.parent.active = false;
            var main = cc.find("Main");
            if (main) {
                main.emit(this.divName + "Off");
            }
        }

        this.node.on(cc.Node.EventType.TOUCH_END, this.openLink, this);

        //canvas.on(cc.Node.EventType.MOUSE_MOVE, this.onTouchMove, this);
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    openLink() {
        this.api.APIopenLink(this.divName);
        if (this.NewWindow == true) {

            cc.sys.openURL(this.url);

        } else {

            window.open(this.url, "_self");

        }

    },

    update(dt) { },
});
