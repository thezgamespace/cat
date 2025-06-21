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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initSymbolBtn();

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

    initSymbolBtn() {


        this.symbolBtns = [];

        this.symbolsymbolBtns = [];
        var children = this.node.children;
        for (var i = 0; i < children.length; i++) {
            var symbolBtn = children[i].getComponent("symbolBtn")

            symbolBtn.init(i, this)

            this.symbolBtns.push(symbolBtn);



        }

    },
    // update (dt) {},
});
