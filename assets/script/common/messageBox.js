const { GAME_ACTION } = require("../data/GameEnum");


cc.Class({
    extends: cc.Component,

    properties: {
        messageText: {
            type: cc.RichText,
            default: null
        },
        animBox: {
            type: cc.Node,
            default: null
        },

        fadeBox: {
            type: cc.Node,
            default: null
        },

        okBtn: {
            type: cc.Node,
            default: null
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.okBtn.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.emitPoint.on(GAME_ACTION.SHOW_MESSAGE, this.setMessage.bind(this))

        this.node.active = false;
    },


    onTouchEnd() {
        this.fadeOut();
    },


    setMessage($data) {

        this.messageText.string = "<b>" + $data.message + "</b>"
        this.fadeIn();
    },


    fadeIn() {

        this.node.active = true;
        this.fadeBox.active = true;
        this.fadeBox.opacity = 0;
        this.animBox.opacity = 0;
        this.animBox.y = 100;

        var panelFadeIn =
            cc.tween(this.animBox)
                .parallel(
                    cc.tween(this.animBox).to(0.1, { opacity: 255 }),
                    cc.tween(this.animBox).to(0.5, { y: 0 }, { easing: 'backOut' })
                )


        cc.tween(this.fadeBox)
            .to(0.2, { opacity: 96 })
            .call(() => {
                panelFadeIn.start();
            })
            .start()

    },

    fadeOut() {

        cc.tween(this.fadeBox)
            .delay(0.2)
            .to(0.1, { opacity: 0 }).start()

        cc.tween(this.animBox)
            .parallel(
                cc.tween(this.animBox).to(0.2, { opacity: 0 }),
                cc.tween(this.animBox).to(0.5, { y: 100 }, { easing: 'backOut' })
            ).call(() => {

                this.fadeBox.active = false;
                this.node.active = false;
            }).start();
    },

    // update (dt) {},
});
