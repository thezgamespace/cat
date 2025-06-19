const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
const { GAME_ACTION } = require("../data/GameEnum");
const util = require("../helper/util");
cc.Class({
    extends: fetcher,
    properties: {
        statusText: {
            type: cc.Label,
            default: null
        },
        hasData: false,

        realtimePrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.total = 15;
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.GAME_DATA_SUCCESS, this.getCurrencyInfo.bind(this))
        this.emitPoint.on(GAME_ACTION.REALTIME_FAKE_WIN, this.addFakeResult.bind(this))

        this.generateList();

    },


    addFakeResult(result) {


        console.log("addFakeResult", result)
        let existingUser = this.data.find((item) => { return item.username == result.username })

        console.log("existingUser", existingUser)
        if (existingUser) {
            if (existingUser.winTotal < result.winTotal) {

                existingUser.winTotal = result.winTotal;

                console.log("winTotal", existingUser.winTotal)
            }


        } else {

            this.data.push(result)

        }
        this.data.sort(function (a, b) { return b.winTotal - a.winTotal });
        this.updateBoard();
    },


    getCurrencyInfo(data) {

        this.currencyDisplay = data.currencyConfig.currencyDisplay;
        this.getWinnerData();
    },


    getWinnerData() {
        // console.log(apiUrl.getApis.gameData)
        let url = this.baseUrl + apiUrl.getApis.realtimeWinners;
        return this.get(url)
    },


    updateBoard() {

        for (let i = 0; i < this.total; i++) {
            const rankData = this.data[i];

            const rankingItem = this.node.getChildByName("rankingItem" + i)
            if (rankData) {
                rankingItem.active = true;
                // console.log(i,rankingItem.getChildByName("nameText"))
                const nameLabel = rankingItem.getChildByName("nameText").getComponent(cc.Label)
                nameLabel.string = (i + 1) + ". " + util.starUserName(rankData.username);
                const priceLabel = rankingItem.getChildByName("priceText").getComponent(cc.Label)

                priceLabel.string = this.currencyDisplay.replace("x", rankData.winTotal);
                priceLabel._forceUpdateRenderData();
                const winText = rankingItem.getChildByName("winText")
                winText.x = priceLabel.node.x - priceLabel.node.width - winText.width * 1.2;

            } else {
                rankingItem.active = false;
            }

        }
    },



    successHandler(data) {

        this.data = data;
        if (this.hasData == false) {
            this.hasData = true;
            this.emitPoint.emit(GAME_ACTION.REALTIME_SUCCESS)
        }
        this.statusText.node.active = false;
        this.updateBoard();

    },

    generateList() {
        for (let i = 0; i < this.total; i++) {

            const rankingItem = cc.instantiate(this.realtimePrefab);
            rankingItem.name = "rankingItem" + i;
            rankingItem.parent = this.node
            rankingItem.active = false;
        }
    },


    hideAll() {
        for (let i = 0; i < this.total; i++) {

            const rankingItem = this.node.getChildByName("rankingItem" + i)
            rankingItem.active = false;
        }
    },

    errorHandler(data) {
        console.log("getRealtimeData ERROR", data)
        if (hasData == false) {
            this.statusText.string = "Unable to retrive data"
            this.hideAll();

        }

    },

    // update (dt) {},
});
