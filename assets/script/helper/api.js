var nodeBase = require("nodeBase");

cc.Class({
    extends: nodeBase,
    properties: {
    },


    APIopenLink(divName) {
        //console.log("APIopenLink", divName);
    },

    APImusicVolume(volume) {
        //console.log("APIMusicVolume", volume);
    },


    APIsfxVolume(volume) {
        //console.log("APISFXVolume", volume);
    },

    APIsetting(lvl) {
        //console.log("APIsetting", lvl);
    },


    APIunpause(lvl) {
        //console.log("APIunpause", lvl);
    },

    APIplay(lvl) {
        //console.log("APIplay", lvl);
    },

    APIreplay(lvl) {
        //console.log("APIreplay", lvl);
    },

    APIwinGame(lvl, move, best) {
        //console.log("APIwinGame", lvl, move, best);
    },

    APIstartGame(lvl) {
        //console.log("APIstartGame", lvl);
    },

    APIquitGame(lvl) {
        //console.log("APIquitGame", lvl);
    },

    APInextLevel(lvl) {
        //console.log("APInextLevel", lvl);
    },

    APIcutRope(lvl, cutCount) {
        //console.log("APIcutRope", lvl, cutCount);
    },

    APIinfinity(lvl, knots) {
        //console.log("APIinfinity", lvl, knots);
    },

    APIshowCat(show) {
        //console.log("APIshowCat", show);
    },

    // update (dt) {},
});
