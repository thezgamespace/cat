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
        prevDateBtn: cc.Node,
        centerDate: cc.Node,
        nextDateBtn: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        this.dates = [];

        this.firstLoad = true;
        this.dateIndex = 0;

        this.dateBtns = [];


        this.dateBtns.push(this.prevDateBtn.getComponent("dateBtn"))
        this.dateBtns.push(this.centerDate.getComponent("dateBtn"))
        this.dateBtns.push(this.nextDateBtn.getComponent("dateBtn"))

        this.dateBtns.forEach((dateBtn, i) => {
            dateBtn.init(this, i)
            dateBtn.node.active = false;
        });

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.DATE_SUCCESS, this.setData.bind(this));
        this.emitPoint.on(GAME_ACTION.ZOOM_TOWER, this.hide.bind(this));
        this.emitPoint.on(GAME_ACTION.GO_MAP, this.show.bind(this));


    },

    start() {

    },


    hide() {
        this.node.opacity = 0;
        this.node.active = false;
    },


    show() {
        this.node.opacity = 255;
        this.node.active = true;

    },


    getDateIndex() {

        var found = false;
        this.dates.forEach((date, index) => {
            if (date.isCurrent == true) {

                this.dateIndex = index - 1;
                found = true
            }
        })


        if (found == false) {
            this.dateIndex = this.dates.length - 3;

            this.dates.forEach((date, index) => {
                if (date.status == "Countdown" && found == false) {

                    this.dateIndex = index - 1;
                    found = true
                }
            })
        }


        if (found == false) {
            this.dateIndex = this.dates.length - 3;

            this.dates.forEach((date, index) => {
                if (date.status == "Future" && found == false) {

                    this.dateIndex = index - 1;
                    found = true
                }
            })
        }
        if (found == false) {
            this.dateIndex = this.dates.length - 3;

        }

        if (this.dates.length < 4) {


            this.firstLoad = true;

        }
        // console.log("getDateIndex!!!", this.dateIndex)
    },

    getData() {
        if (main.dateData.data != undefined) {

            this.dates = main.dateData.data;

            if (this.firstLoad == true) {
                this.firstLoad = false;
                this.getDateIndex();
            }

            this.changeDate();

        }
    },

    setData($data) {
        var data = $data;
        console.log("setDate!!!!", data)
        this.dates = data;

        if (data.length == 0) { return }

        this.dates.forEach((date, index) => {

            if (date.isCurrent == true) {
                if (date.partId == 1) {

                    this.dates[index].status = "1st Draw of The Week";
                    if (this.dates[index + 1].partId == 2) {


                        this.dates[index + 1].status = "2nd Draw of The Week";

                    }

                } else if (date.partId == 2) {

                    if (this.dates[index - 1].partId == 1) {
                        this.dates[index - 1].status = "1st Draw of The Week";

                    }
                    this.dates[index].status = "2nd Draw of The Week";
                }


            } else {
                if (this.dates[index].status.indexOf("of") == -1) {


                    if (date.partId == 1) {
                        this.dates[index].status = "1st Draw of The Week";

                    } else if (date.partId == 2) {

                        this.dates[index].status = "2nd Draw of The Week";
                    }

                }


            }

        });

        // console.log(this.dates)
        if (this.firstLoad == true) {
            this.firstLoad = false;
            this.getDateIndex();
        }


        this.changeDate()

    },



    changeDate() {




        for (var i = 0; i < 3; i++) {
            var data = this.dates[this.dateIndex + i]
            this.dateBtns[i].setData(data)

        }

        this.emitPoint.emit(GAME_ACTION.CHANGE_DATE, { data: this.dates[this.dateIndex + 1], dateIndex: this.dateIndex })

    },

    next() {
        console.log("next", this.dateIndex + 1, this.dates.length - 3, this.dateIndex + 1 > this.dates.length - 3)
        if (this.dateIndex + 1 > this.dates.length - 3) { return }
        this.dateIndex++;
        this.changeDate();


    },


    prev() {
        console.log("prev", this.dateIndex < 1, this.dateIndex)
        if (this.dateIndex < 1) { return }
        this.dateIndex--;
        this.changeDate();


    }
    // update (dt) {},
});
