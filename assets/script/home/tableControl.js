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

        table: cc.Node,
        percentBox: cc.Node,
        prizeBox0: cc.Node,
        prizeBox1: cc.Node,
        prizeBox2: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        this.emitPoint = cc.find("emitPoint")
        this.tierNames = ["mega", "ultra", "super", "quite", "abit"]

        this.emptyPool = {
            min: 0, max: 0, mega: 0, ultra: 0, super: 0, quite: 0, abit: 0, table: 437
        }

        this.pools = [
            {
                min: 300, max: 490, mega: 0.5, ultra: 0.3, super: 0.2, quite: 0, abit: 0, table: 257
            },
            {
                min: 500, max: 990, mega: 0.45, ultra: 0.3, super: 0.15, quite: 0.1, abit: 0, table: 341
            },
            {
                min: 1000, max: -1, mega: 0.4, ultra: 0.25, super: 0.2, quite: 0.1, abit: 0.05, table: 437
            }

        ]

        this.initPercent();
        this.initPrize();
        this.iniHeaderBtn();
    },

    updateInput($inputText) {

        this.fullPool = parseInt($inputText) || 0;

        if (this.fullPool % 10 != 0) { this.fullPool = 0 }
        if (this.fullPool < 300) { this.fullPool = 0 }
        this.calculatePercent();

        this.emitPoint.emit(GAME_ACTION.INPUT_CHANGED, this.fullPool, this.targetPool)
    },

    calculatePercent() {


        this.findPool = this.pools.filter(pool => {
            return (this.fullPool >= pool.min && (this.fullPool <= pool.max || pool.max == -1))
        });
        // console.log(this.findPool)



        this.targetPool = this.findPool[0] || this.emptyPool
        this.table.width = this.targetPool.table;

        this.finalPool = []
        this.tierNames.forEach((tierName, i) => {

            var percent = this.targetPool[tierName]

            this.percentCells[i].setPercent(percent)
            this.finalPool[i] = percent * this.fullPool;
        });


        for (var j = 0; j < 3; j++) {
            this["prizeCells" + j].forEach((prizeCell, i) => {
                var prize = Math.round(this.finalPool[i] / (j + 1)
                )
                prizeCell.setPrize(prize);

            })

        }

    },


    iniHeaderBtn() {


        this.headerBtns = [];

        var children = this.table.children;
        for (var i = 0; i < children.length; i++) {
            var headerBtn = children[i].getComponent("headerBtn")

            headerBtn.init(i, this)

            this.headerBtns.push(headerBtn);



        }

    },
    initPercent() {

        this.percentCells = [];

        var children = this.percentBox.children;
        for (var i = 0; i < children.length; i++) {
            var percentCell = children[i].getComponent("percentCell")

            percentCell.init(i, this)

            this.percentCells.push(percentCell);



        }



    },

    initPrize() {


        for (var j = 0; j < 3; j++) {
            this["prizeCells" + j] = [];
            var children = this["prizeBox" + j].children;
            for (var i = 0; i < children.length; i++) {
                var prizeCell = children[i].getComponent("prizeCell")

                prizeCell.init(i, j, this)

                this["prizeCells" + j].push(prizeCell);



            }

        }

    },



    // update (dt) {},
});
