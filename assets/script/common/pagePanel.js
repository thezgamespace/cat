const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
const { GAME_ACTION } = require("../data/GameEnum");
cc.Class({
    extends: fetcher,

    properties: {
        noData: cc.Node,
        pageBar: cc.Node,
        itemLayout: cc.Node,
        itemPrefab: cc.Prefab,

        activePage: cc.SpriteFrame,
        inactivePage: cc.SpriteFrame,
        activeTextColour: cc.Color,
        inactiveTextColour: cc.Color,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("!!!!!!!!!page panel")
        this.page = 1;
        this.totalPage = 10;

        this.emitPoint = cc.find("emitPoint")

        this.emitPoint.on(GAME_ACTION.SESSION_SUCCESS, this.getSessionData.bind(this));
        this.emitPoint.on(GAME_ACTION.USER_DATA_SUCCESS, this.getPlayerData.bind(this));
        this.initItem();
        this.initPageBtn();
        this.changePage();


    },

    getPlayerData($data) {

        this.getPlayerData = $data;
    },

    getSessionData($data) {

        console.log("getSessionData", $data.sessionId)
        this.sessionId = $data.sessionId;
    },

    setScrollIndex() {
        var scrollIndex = this.page - 3;

        if (scrollIndex < 0) {
            this.scrollIndex = 0;

        } else if (scrollIndex + 1 > 5) {
            this.scrollIndex = 5;
        } else {


            this.scrollIndex = scrollIndex

        }

    },

    initPageBtn() {

        this.pageBtns = [];

        this.pageNumBtns = [];
        var children = this.pageBar.children;
        for (var i = 0; i < children.length; i++) {
            var pageBtn = children[i].getComponent("pageBtn")

            pageBtn.init(i, this)

            this.pageBtns.push(pageBtn);

            if (i > 1 && i < 7) {


                this.pageNumBtns.push(pageBtn);


            }


        }

    },


    setTower($tower) {
        console.log("setTower", $tower)
        this.tower = $tower;
        this.towerId = $tower.towerId;
        this.page = 1;
        this.changePage();
    },


    initItem() {

        this.total = 10;
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

    goto($page) {


        if (this.page == $page) { return }
        this.page = $page;
        this.changePage();


    },

    changePage() {
        this.setScrollIndex();
        this.postGameData();

        if (this.pageNumBtns) {

            for (var i = 0; i < 5; i++) {
                this.pageNumBtns[i].setPage(this.scrollIndex + i + 1);
            }

        }

    },


    showHideBtn($totalPage) {
        this.totalPage = $totalPage;

        for (var i = 0; i < 5; i++) {
            this.pageNumBtns[i].node.active = i < $totalPage ? true : false;
        }

    },




    prev() {



        this.page--;
        if (this.page < 1) {
            this.page = 1;
        }
        this.changePage()

    },


    next() {

        this.page++;
        if (this.page > this.totalPage) {

            this.page = this.totalPage;


        }
        console.log(this.totalPage, this.page)
        this.changePage()



    },

    prevEnd() {

        this.page = 1;
        this.changePage()
    },


    nextEnd() {

        this.page = this.totalPage;
        this.changePage()


    },

    postGameData() {
        let url = this.baseUrl + apiUrl.postApis.leaderboard;
        url += "?page=" + this.page;
        return this.get(url)
    },


    updatePage() {



    },



    start() {


    },

    successHandler($data) {


        for (let i = 0; i < this.total; i++) {
            this.items[i].setData($data[i])
        }



    },

    errorHandler($data) {

    },

    // update (dt) {},
});
