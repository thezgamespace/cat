// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        highlight: cc.Node,
        noText: cc.Label,
        nameText: cc.Label,
        damageText: cc.Label,
        percentText: cc.Label,
        poolText: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    init($index, $mom) {
        this.mom = $mom;
        this.itemIndex = $index + 1;
        this.noText.string = $index + "."
        this.highlight.active = false;

        this.noText.string = "";
        this.nameText.string = "";
        this.damageText.string = "";
        this.percentText.string = "";
        this.poolText.string = "";

    },

    setData($data, $ownData) {
        if ($data) {
            console.log("leaderboard!!!!",this.mom)

            this.noText.string = $data.rank + "."
            this.nameText.string = $data.username.slice(0, 6);
            this.nameText.string = " " + $data.username + " ";
            this.damageText.string = this.mom.tower.towerData.eligible==true?" " + $data.totalDamage + " ":"-";
            this.percentText.string = " " + $data.damagePercent.toFixed(2) + "% ";
            this.poolText.string = " $" + $data.pool + " ";
            this.node.active = true;

            this.highlight.active = $ownData.userId == $data.userId;

        } else {

            this.node.active = false;


        }


    },

    // update (dt) {},
});
