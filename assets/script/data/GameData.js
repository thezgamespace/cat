const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
const { GAME_ACTION, GAME_STATE } = require("./GameEnum");
const util = require("../helper/util");
const GameData = cc.Class({
    extends: fetcher,

    ctor() {

        this.gameState = GAME_STATE.START_GAME;

        this.gameData ={
            "claimed": false
            
        }
    },

    statics: {
        instance: null
    },

    onLoad() {

        GameData.instance = this;
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.UPDATE_GAME_STATE, this.updateGameState.bind(this))
        this.emitPoint.on(GAME_ACTION.LOAD_GAME, this.postGameData.bind(this))
        this.emitPoint.on(GAME_ACTION.SET_TOKEN, this.postGameData.bind(this))

    },

    updateGameState(gameState) {
        // console.log("!!!GAME STATE", gameState)
        this.gameState = gameState
    },

    getGameState() {
        return this.gameState;
    },

    postGameData($data) {
        this.uniqueId = $data;
        let url = this.baseUrl + apiUrl.postApis.gameData;
        url += "?uniqueId=" + $data;
        return this.post(url)
    },

    successHandler($data) {
        // console.log($data)

        if ($data.error != 200) {
            this.emitPoint.emit(GAME_ACTION.SHOW_MESSAGE, { message: $data.message })
            return
        }

        var data = $data.data
        if (data?.results?.goldResults) {

            data?.results?.goldResults.forEach(element => {
                element.result = element.goldVault;

                this.emitPoint.emit(GAME_ACTION.SHOW_PLAYED_DATA, element)
            });



        }

        if (data?.results?.multiplierResults?.multiplierVault) {

            data.results.multiplierResults.result = data.results.multiplierResults.multiplierVault;


            this.emitPoint.emit(GAME_ACTION.SHOW_PLAYED_DATA, data.results.multiplierResults)

        }

        this.gameData = data;


        this.emitPoint.emit(GAME_ACTION.GAME_DATA_SUCCESS, $data)
    },

    errorHandler($data) {
        // console.log("getGameConfig ERROR", $data)
        this.emitPoint.emit(GAME_ACTION.GAME_DATA_ERROR, $data)
        this.emitPoint.emit(GAME_ACTION.SHOW_MESSAGE, { message: $data?.validation?.uniqueId || $data.message })

    },


    getRowResult($rowId, $goldId) {
        var vault, result

        var data = this.gameData

        if ($rowId == 3) {

            vault = util.deepCopy(data.multiplierVault)
            result = data.multiplier

        } else {

            vault = util.deepCopy(data.goldVault)
            result = data.gold[$rowId]

        }


        // console.log("result", result, $rowId)

        vault = util.shuffleArray(vault);
        var resultIndex = vault.indexOf(result)

        if (resultIndex > -1) {
            vault.splice(resultIndex, 1)


        } else {

            // console.log("resultIndex not found")
        }

        vault.splice($goldId, 0, result)
        return vault
    },


    getGameData() {

        return this.gameData;
    },

});




