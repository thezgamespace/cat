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
        leaderboardPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.total = 15;
        this.emitPoint = cc.find("emitPoint")
        this.generateList();
        this.getLeaderboardData();
    },


    getLeaderboardData() {
        console.log(apiUrl.getApis.gameData)
        let url = this.baseUrl + apiUrl.getApis.leaderboard;
        let data = undefined;
        return this.get(url, data)
    },


    start() {

    },



    successHandler(data) {


        if (this.hasData == false) {
            this.hasData = true;
            this.emitPoint.emit(GAME_ACTION.LEADERBOARD_SUCCESS)
        }
        this.statusText.node.active = false;
        for (let i = 0; i < this.total; i++) {
            const rankData = data[i];
            const rankingItem = this.node.getChildByName("rankingItem" + i)
            if (rankData) {
                rankingItem.active = true;
                // console.log(i,rankingItem.getChildByName("nameText"))
                const nameLabel = rankingItem.getChildByName("nameText").getComponent(cc.Label)
                nameLabel.string = (i + 1) + ". " + util.starUserName(rankData.username);
                const priceLabel = rankingItem.getChildByName("priceText").getComponent(cc.Label)
                priceLabel.string = rankData.balance;
                priceLabel._forceUpdateRenderData();
                const coinIcon = rankingItem.getChildByName("coinIcon")
                coinIcon.x = priceLabel.node.x - priceLabel.node.width - coinIcon.width * 0.6;

            } else {
                rankingItem.active = false;
            }

        }
    },

    generateList() {

        for (let i = 0; i < this.total; i++) {
            const rankingItem =cc.instantiate(this.leaderboardPrefab);
            rankingItem.name="rankingItem" + i;
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
        console.log("getLeaderboardData ERROR", data)
        if (hasData == false) {
            this.statusText.string = "Unable to retrive data"
            this.hideAll();

        }

    },

    // update (dt) {},
});
