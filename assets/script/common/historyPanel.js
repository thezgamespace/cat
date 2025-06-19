const pagePanel = require("pagePanel");
const apiUrl = require("../net/apiUrl");
cc.Class({
    extends: pagePanel,

    properties: {
    },


    initItem() {

        this.total = 15;
        this.items = [];

        for (let i = 0; i < this.total; i++) {

            const historyItem = cc.instantiate(this.itemPrefab);
            historyItem.name = "item" + i;
            historyItem.parent = this.itemLayout

            var code = historyItem.getComponent("historyItem")
            code.init(i, this)
            // historyItem.active = false;
            this.items.push(code)
        }
    },
    start() {
        // this.node.active = false;
    },


    postGameData() {
        if (this.towerId == undefined) { return }
        let url = this.baseUrl + apiUrl.postApis.history;
        url += "?sessionId=" + this.sessionId;
        url += "&page=" + this.page;
        url += "&towerId=" + this.towerId;
        return this.get(url)
    },



    successHandler($data) {


        var data = this.data = $data.data;
        console.log("history", data)

        for (let i = 0; i < this.total; i++) {
            this.items[i].setData(data.history[i])
        }

        this.noData.active = data.history.length == 0 ? true : false;

        this.showHideBtn(data.totalPage);

    },

    errorHandler($data) {

    },

    // update (dt) {},
});
