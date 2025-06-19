const pagePanel = require("pagePanel");
const apiUrl = require("../net/apiUrl");
cc.Class({
    extends: pagePanel,

    properties: {

        ownItem: cc.Node,
        noText: cc.Label,
        nameText: cc.Label,
        damageText: cc.Label,
        percentText: cc.Label,
        poolText: cc.Label
    },


    initItem() {
        this.ownItem.active = false;
        this.total = 15;
        this.items = [];

        for (let i = 0; i < this.total; i++) {

            const leaderboardItem = cc.instantiate(this.itemPrefab);
            leaderboardItem.name = "item" + i;
            leaderboardItem.parent = this.itemLayout

            var code = leaderboardItem.getComponent("leaderboardItem")
            code.init(i, this)
            // leaderboardItem.active = false;
            this.items.push(code)
        }
    },


    postGameData() {
        if (this.towerId == undefined) { return }
        let url = this.baseUrl + apiUrl.postApis.leaderboard;
        url += "?sessionId=" + this.sessionId;
        url += "&page=" + this.page;
        url += "&towerId=" + this.towerId;
        return this.get(url)
    },



    successHandler($data) {

        console.log("leaderboardddddd", $data, this.total)

        var hasSelf = false;
        var data = this.data = $data.data;
        var ownData = data.ownResult;
        data.leaderboard.sort((a, b) => a.rank - b.rank);

        for (var i = 0; i < this.total; i++) {
            var itemData = data.leaderboard[i]

            if (itemData && itemData.userId == ownData.userId) {
                hasSelf = true;

            }
            this.items[i].setData(itemData, ownData)

        }


        if (ownData.rank != undefined) {
            this.ownItem.active = true;
            this.noText.string = ownData.rank+".";
            this.nameText.string = ownData.username.slice(0, 8);;
            this.nameText.string = ownData.username
            this.damageText.string = ownData.totalDamage;
            this.percentText.string = ownData.damagePercent;
            this.poolText.string = ownData.pool;
            this.ownItem.active = !hasSelf;

        } else {

            this.ownItem.active = false;

        }

        this.noData.active = data.leaderboard.length == 0 ? true : false;
        console.log("NO DATA", data.leaderboard.length == 0, this.noData.active)
        this.showHideBtn(data.totalPage);

    },

    errorHandler($data) {

    },

    // update (dt) {},
});
