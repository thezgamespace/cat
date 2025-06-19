// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        dateText: cc.Label,
        statusText: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },


    init($dateBar, $btnId) {

        this.mom = $dateBar;
        this.btnId = $btnId;

    },

    onTouchEnd() {

        // if (this.date == "") { return; }


        if (this.btnId == 0) {

            this.mom.prev()


        } else {

            this.mom.next()

        }

    },

    formatDateRange(startTime, endTime) {
        console.log(startTime, endTime)
        const options = { month: 'short', day: '2-digit' };
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        const startStr = startDate.toLocaleDateString('en-US', options);
        const endStr = endDate.toLocaleDateString('en-US', options);

        return `${startStr} - ${endStr}`;
    },

    setData($data) {

        if ($data == undefined) {
            return
        }

        this.node.active = true;
        if ($data.startTime == undefined) {

            this.dateText.string = "";
            this.node.active = false;

        } else {
            console.log($data,this.formatDateRange($data.startTime, $data.endTime))
            this.dateText.string = this.formatDateRange($data.startTime, $data.endTime)
            this.statusText.string =$data.status+" Session";
        }
    }
    // update (dt) {},
});
