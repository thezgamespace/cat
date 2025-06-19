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
        fadeBox: cc.Node,
        animBox: cc.Node,
        

        leaderboardPanel: cc.Node,
        historyPanel: cc.Node,
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.oriY = this.animBox.y + 0;
        this.emitPoint = cc.find("emitPoint")

        this.history = this.historyPanel.getComponent("historyPanel");

        this.leaderboard = this.leaderboardPanel.getComponent("leaderboardPanel")

        this.emitPoint.on(GAME_ACTION.SELECT_TOWER_INFO, this.mapLeaderboard.bind(this))

    },



    start() {
        this.node.active = false;
    },

    mapLeaderboard($data) {

        this.setTower($data)
        this.showLeaderBoard();

    },

    onHistory() {


        this.leaderboardPanel.active = false;
        this.historyPanel.active = true;
        this.history.changePage();


        // this.btnText.string = "HISTORY";




    },

    showHistory() {
        this.fadeIn();
        this.onHistory();
    },

    onLeaderBoard() {


        this.leaderboardPanel.active = true;
        this.historyPanel.active = false;
        this.leaderboard.changePage();


        // this.btnText.string = "LEADERBOARD";

    },

    showLeaderBoard() {
        this.fadeIn();
        this.onLeaderBoard();
    },
    toggle() {

        this.leaderboardPanel.active = !this.leaderboardPanel.active;
        this.historyPanel.active = !this.historyPanel.active;


        // this.btnText.string = this.btnText.string == "HISTORY" ? "LEADERBOARD" : "HISTORY";
    },


    close() {

        this.fadeOut()

        cc.tween(this.fadeBox)
            .to(0.1, { opacity: 0 })
            .call(() => {
                this.fadeBox.active = false;
            })
            .start()
    },


    hit() {

        this.emitPoint.emit(GAME_ACTION.HIT_BTN)

        this.fadeOut();

    },



    fadeIn($data) {


        console.log("TOWAAAA", this.tower)

        this.node.active = true;
        // this.btnText.string = "HISTORY";

        this.leaderboardPanel.active = true;
        this.historyPanel.active = false;
        this.fadeBox.active = true;
        this.fadeBox.opacity = 0;
        this.animBox.opacity = 0;
        this.animBox.y = this.oriY + 100;

        var panelFadeIn =
            cc.tween(this.animBox)
                .parallel(
                    cc.tween(this.animBox).to(0.2, { opacity: 255 }),
                    cc.tween(this.animBox).to(0.5, { y: this.oriY }, { easing: 'backOut' })
                )
                .call(() => { this.allowClose = true })


        cc.tween(this.fadeBox)
            .to(0.1, { opacity: 110 })
            .call(() => {
                panelFadeIn.start();
            })
            .start()

    },


    fadeOut() {

        cc.tween(this.animBox)
            .parallel(
                cc.tween(this.animBox).to(0.2, { opacity: 0 }),
                cc.tween(this.animBox).to(0.5, { y: this.oriY + 100 }, { easing: 'backOut' })
            ).call(() => {

                this.node.active = false;
            }).start();


    },

    update(dt) {
        this.updateHp();

    },
});
