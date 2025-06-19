// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        btnText: cc.Label,
        btnFrame: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    init($btnIndex, $mom) {

        this.btnIndex = $btnIndex;
        this.mom = $mom;

        if ($btnIndex == 0) {


            this.btnText.string = "<<"

            this.node.on(cc.Node.EventType.TOUCH_END, this.prevEnd, this);

        } else if ($btnIndex == 1) {


            this.btnText.string = "<"
            this.node.on(cc.Node.EventType.TOUCH_END, this.prev, this);
        } else if ($btnIndex == 7) {


            this.btnText.string = ">"
            this.node.on(cc.Node.EventType.TOUCH_END, this.next, this);
        } else if ($btnIndex == 8) {


            this.btnText.string = ">>"
            this.node.on(cc.Node.EventType.TOUCH_END, this.nextEnd, this);
        } else {



            this.pageId = $btnIndex-1;
            this.btnText.string = this.pageId;
            this.node.on(cc.Node.EventType.TOUCH_END, this.goto, this);
            this.setColour();
        }
    },

    


    goto() {

        this.mom.goto(this.pageId)

    },

    


    setPage($page) {
        this.pageId = $page;
        this.btnText.string = $page;
   
        this.setColour();

    },


    setColour() {
        if (this.pageId == this.mom.page) {


            this.btnFrame.getComponent(cc.Sprite).spriteFrame = this.mom.activePage;
            this.btnText.node.color =this.mom.activeTextColour;
        } else {

            // this.btnFrame.color =cc.Color.BLACK
            this.btnFrame.getComponent(cc.Sprite).spriteFrame = this.mom.inactivePage;
            this.btnText.node.color =this.mom.inactiveTextColour;

        }

    },


    prevEnd() {

        this.mom.prevEnd()

    },


    nextEnd() {

        this.mom.nextEnd()


    },


    prev() {

        this.mom.prev()

    },


    next() {

        this.mom.next()


    },

    // update (dt) {},
});
