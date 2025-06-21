// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { GAME_ACTION } = require("../data/GameEnum");

cc.Class({
    extends: cc.Component,

    properties: {
        submitBtn: cc.Node,
        onFrame: cc.SpriteFrame,
        offFrame: cc.SpriteFrame,
        symbol: cc.Node,
        cardText: cc.Label,
        symbolFrames: {
            type: [cc.SpriteFrame],
            default: []
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.hide();

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_NUM, this.changeNum.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_SYMBOL, this.changeSymbol.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.hide.bind(this))
        this.emitPoint.on(GAME_ACTION.INPUT_CHANGED, this.hide.bind(this))

    },


    hide() {

        this.submitBtn.opacity = 255 * 0.5;
        this.iconIndex = undefined;
        this.num = undefined;



        if (this.symbol.active == true) {


            cc.tween(this.node)
                .to(0.1, { scaleX: 0 })
                .call(() => {

                    this.node.getComponent(cc.Sprite).spriteFrame = this.offFrame

                    this.symbol.active = false;
                    this.cardText.node.active = false;
                })
                .to(0.1, { scaleX: 1 })
                .start()

        } else {


            this.node.getComponent(cc.Sprite).spriteFrame = this.offFrame


            this.symbol.active = false;
            this.cardText.node.active = false;
        }

    },


    changeNum($btn) {

        this.num = $btn.num;

        if (this.iconIndex != undefined) {


            this.submitBtn.opacity = 255
        }



    },


    changeSymbol($btn) {

        this.iconIndex = $btn.btnIndex;


        if (this.num != undefined) {


            this.submitBtn.opacity = 255
        }

    },


    start() {

    },



    onSubmit() {
        if (this.iconIndex == undefined) { return }
        if (this.num == undefined) { return }
        this.symbol.getComponent(cc.Sprite).spriteFrame = this.symbolFrames[this.iconIndex];
        this.node.getComponent(cc.Sprite).spriteFrame = this.onFrame
        this.cardText.string = this.num;


        cc.tween(this.node)
            .to(0.1, { scaleX: 0 })
            .call(() => {

                this.symbol.active = true;
                this.cardText.node.active = true;


            })
            .to(0.1, { scaleX: 1 })
            .start()

    },

    // update (dt) {},
});
