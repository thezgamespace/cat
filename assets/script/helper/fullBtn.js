var responsiveNode = require("responsiveNode");
cc.Class({
    extends: responsiveNode,
    properties: {
        btnImg: {
            default: null,
            type: cc.Node
        },
        fullOn: false,
        full: {
            default: null,
            type: cc.SpriteFrame,
        },
        shrink: {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    start() {
        var settings = require("settings")._SETTINGS;
        if (settings.Apk == true) {
            this.node.active = false
            return;
        }

        if (cc.sys.os === cc.sys.OS_IOS) {
            this.node.active = false;
            return;
        }


        if (cc.find("Main")) {

            if (cc.screen['fullScreen']()) {
                this.toggle();
            }
        }

        this.responsive();
        this.onFullscreenToggle = this.toggle.bind(this);
        ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
            eventType => document.addEventListener(eventType, this.onFullscreenToggle, false)
        );


    },




    toggle(e) {
        this.fullOn = !this.fullOn;

        if (this.fullOn) {
            this.btnImg.getComponent(cc.Sprite).spriteFrame = this.shrink;
        } else {
            this.btnImg.getComponent(cc.Sprite).spriteFrame = this.full;
        }
    },



    onClick() {

        if (this.fullOn) {

            cc.screen.exitFullScreen(null, function () { });
        } else {
            cc.screen.requestFullScreen(null, function () { });
        }
    },



    onDestroy() {
        ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
            eventType => document.removeEventListener(eventType, this.onFullscreenToggle, false)
        );
    }




});
