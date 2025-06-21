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
        onColour: cc.Color,
        offColour: cc.Color,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.INPUT_CHANGED, this.grey.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.grey.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_RECIPIENT, this.show.bind(this))
        this.grey();

    },

    grey() {
        this.node.opacity = 255 * 0.5;
    },



    show() {
        this.node.opacity = 255;
    },

    start() {
        this.iniNumBtn();
    },




    iniNumBtn() {


        this.texts = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
        this.numBtns = [];

        var children = this.node.children;
        for (var i = 0; i < children.length; i++) {
            var numBtn = children[i].getComponent("numBtn")

            numBtn.init(i, this.texts[i], this)

            this.numBtns.push(numBtn);



        }

    },

    // update (dt) {},
});
