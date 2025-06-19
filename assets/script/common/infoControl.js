// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { GAME_ACTION } = require("../data/GameEnum");
const GameData = require("GameData")

cc.Class({
    extends: cc.Component,

    properties: {
        tabBtns: {
            type: [cc.Node],
            default: []
        },
        pages: {
            type: [cc.Node],
            default: []
        },
        activeTabFrames: {
            type: [cc.SpriteFrame],
            default: []
        },
        inactiveTabFrames: {
            type: [cc.SpriteFrame],
            default: []
        },
        tabIndex: 0,
        boatIndex: 0,
        boat: {
            type: cc.Node,
            default: null
        },
        boatFrame: {
            default: [],
            type: [cc.SpriteFrame],
        },
        fadeBox: {
            type: cc.Node,
            default: null
        },
        animBox: {
            type: cc.Node,
            default: null
        },
        boatName: {
            type: cc.Label,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        this.emitPoint = cc.find("emitPoint")
    },

    start() {

        this.setActiveTab();
    },

    fadeIn() {
        this.emitPoint.emit(GAME_ACTION.ON_INFO_TAB)
        console.log("fadeIn")
        this.fadeBox.active = true;
        this.fadeBox.opacity = 0;
        this.animBox.opacity = 0;
        this.animBox.y = 100;

        this.changeBoatTab(undefined,0)

        var panelFadeIn =
            cc.tween(this.animBox)
                .parallel(
                    cc.tween(this.animBox).to(0.2, { opacity: 255 }),
                    cc.tween(this.animBox).to(0.5, { y: -41 }, { easing: 'backOut' })
                )


        cc.tween(this.fadeBox)
            .to(0.1, { opacity: 96 })
            .call(() => {
                panelFadeIn.start();
            })
            .start()
    },


    
    fadeOut() {
        this.emitPoint.emit(GAME_ACTION.OFF_INFO_TAB)
        cc.tween(this.fadeBox)
            .delay(0.2)
            .to(0.1, { opacity: 0 }) 
            .call(() => {
                this.fadeBox.active = false;
            }).start()

        cc.tween(this.animBox)
            .parallel(
                cc.tween(this.animBox).to(0.2, { opacity: 0 }),
                cc.tween(this.animBox).to(0.5, { y: 50 }, { easing: 'backOut' })
                .call(() => {
                  
                    this.node.active = false;
                })
            ).start();


    },

    setActiveTab() {


        this.pages.forEach((page, index) => {
            page.active = index == this.tabIndex;
        });
        this.tabBtns.forEach((btn, index) => {
            btn.getComponent(cc.Sprite).spriteFrame = index == this.tabIndex ? this.activeTabFrames[index] : this.inactiveTabFrames[index] ;
        });
    },

    changeTab($e, tabIndex) {

        this.tabIndex = parseInt(tabIndex);
        this.emitPoint.emit(GAME_ACTION.CHANGE_INFO_TAB, this.tabIndex)
        this.setActiveTab();


    },

    changeBoatTab($e, $tabIndex) {

        this.boatIndex = parseInt($tabIndex);
        this.boat.getComponent(cc.Sprite).spriteFrame = this.boatFrame[$tabIndex];
        this.emitPoint.emit(GAME_ACTION.INFO_BOAT, $tabIndex)
        this.boatName.string=GameData.instance.getRoomConfig(this.boatIndex).roomName.toUpperCase();
    },
    // update (dt) {},
});
