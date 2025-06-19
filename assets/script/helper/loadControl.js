
var nodeBase = require("nodeBase");

cc.Class({
    extends: nodeBase,

    properties: {
        cat: {
            default: null,
            type: cc.Node
        },

        fadeBox: {
            default: null,
            type: cc.Node
        },

        loadText: {
            default: null,
            type: cc.Label
        },

        fadeBoxControl: null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        this.node.opacity = 0;
        this.node.active = false;
    },

    fadeIn() {


        this.scheduleOnce(() => {
            this.node.active = true;
            var anim = this.cat.getComponent(cc.Animation)
            anim.play(anim.defaultClip._name);
            this.textTween();
            this.node.opacity = 0;
            if (this.fadeBoxControl == undefined) {
                this.fadeBoxControl = this.fadeBox.getComponent("fadeBoxControl");
                this.fadeBoxControl.fadeIn();
            }
            cc.tween(this.node)
                .to(0.3, { opacity: 255 })
                .start()

        }, 1);



    },

    fadeOut() {

        cc.tween(this.node)
            .delay(0.2)
            .to(0.3, { opacity: 0 })
            .call(() => {
                this.node.active = false;
            })
            .start()

    },


    textTween() {

        var time = 0.5;

        cc.tween(this.node)
            .repeatForever(
                cc.tween(this.node)
                    .delay(time)
                    .call(() => {

                        this.loadText.string = this.main.strings.LOADING;
                    })
                    .delay(time)
                    .call(() => {

                        this.loadText.string = this.main.strings.LOADING + ".";
                    })
                    .delay(time)
                    .call(() => {

                        this.loadText.string = this.main.strings.LOADING + "..";
                    })
                    .delay(time)
                    .call(() => {

                        this.loadText.string = this.main.strings.LOADING + "...";
                    })
            ).start()


    },


});
