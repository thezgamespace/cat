// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var responsiveNode = require("responsiveNode");
cc.Class({
    extends: cc.Component,
    properties: {
        clickable: false,
        url: "",
        splashIndex: 0,
        BgColor: '#000000',
        duration: 1,
        bg: {
            default: null,
            type: cc.Node
        },
        logos: {
            "default": [],
            type: [cc.Node]
        },

        colours: {
            "default": [],
            type: [cc.Color]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    start() {


        this.hidelogos();
        this.getData();

        var canvas = cc.find("Canvas");
        canvas.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
        canvas.on(cc.Node.EventType.MOUSE_UP, this.onClick, this);



    },

    getData() {



        var settings = require("settings")._SETTINGS.Splash[this.splashIndex];
        while (settings != undefined && settings.Enabled == false) {

            this.splashIndex++;
            settings = require("settings")._SETTINGS.Splash[this.splashIndex]

        }

        if (settings == undefined) {

            cc.director.loadScene("home");
            return;
        }

        if (settings.Enabled == true) {

            this.hidelogos();
            this.BgColor = settings.BgColor;
            this.duration = settings.Duration;
            this.clickable = settings.clickable;
            this.logos[this.splashIndex].active = true;
            this.url = settings.Link;
            // let logo = cc.find("Logo");
            // let sprite = logo.getComponent(cc.Sprite);
            // this.animLoader = main.getComponent("animLoader");
            // this.animLoader.createClip(settings.Logo, logo, true, cc.WrapMode.Loop);

            var logo = this.logos[this.splashIndex];
            var anim = logo.getComponent(cc.Animation)
            anim.play(anim.defaultClip._name);

            this.bg.color = this.colours[this.splashIndex];

            this.unschedule(this.nextSplash);
            this.scheduleOnce(() => { this.nextSplash(); }, this.duration);
        }
    },


    hidelogos() {

        for (var i = 0; i < this.logos.length; i++) {
            this.logos[i].active = false;
        }
    },


    onClick() {

        if (this.clickable == true) {

            cc.sys.openURL(this.url);

        }
    },


    nextSplash() {
        this.splashIndex++;
        console.log("nextSplash", this.splashIndex);
        this.getData();
    },

    // update (dt) {},
});
