// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        noText: cc.Label,
        bulletIcon: cc.Node,
        damageText: cc.Label,
        timeText: cc.Label,
        iconFrames: {
            type: [cc.SpriteFrame],
            default: []
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    init($index, $mom) {
        this.mom = $mom;
        this.itemIndex = $index + 1;
        this.noText.string = $index + "."

    },

    setData($data) {
        if ($data) {


            this.noText.string = $data.rank + "."

            this.damageText.string = $data.damage;
            this.timeText.string = $data.attackTime;
            this.bulletIcon.getComponent(cc.Sprite).spriteFrame = this.iconFrames[$data.bulletId];

            this.node.active = true;

        } else {

            this.node.active = false;


        }


    },

    // update (dt) {},
});
