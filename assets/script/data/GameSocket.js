const util = require("../helper/util");
const { GAME_ACTION } = require("./GameEnum");
const { SOCKET_ENUM } = require("./SocketEnum");

const GameSocket = cc.Class({
    extends: cc.Component,

    properties: {
        serverURL: "",
        heartbeatInterval: 30000, // Interval for sending heartbeat messages in milliseconds
    },
    statics: {
        instance: null
    },
    onLoad() {
        this.failCount = 0;
        // this.serverURL = "wss://socket.hiso33games.com"

        this.serverURL = "wss://angpaosocket.bartervip.com"


        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.RECONNECT, this.reconnect.bind(this))
        // this.emitPoint.on(GAME_ACTION.SUBMIT_NAME_SUCCESS, this.setupWebSocket.bind(this))


        this.emitPoint.on(GAME_ACTION.GAME_RELOAD_SUCCESS, this.setupWebSocket.bind(this))


        cc.game.on(cc.game.EVENT_HIDE, this.close.bind(this));
        this.serverURL += "?token=" + util.getUrlParam("token")
        GameSocket.instance = this;
        this.emitPoint.on(GAME_ACTION.SESSION_SUCCESS, this.getSessionData.bind(this));


        // this.setupWebSocket();
    },
    getSessionData($data) {

        this.sessionId = $data.sessionId;


        this.setupWebSocket();
    },


    close() {
        console.log("I close")
        if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) { this.ws.close() }

    },



    setupWebSocket() {
        console.log("setupWebSocket!!!");


        if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) { return }
        if (this.ws) {
            // console.log("setupWebSocket", this.ws, this.ws.readyState === WebSocket.OPEN, this.ws.readyState, WebSocket.OPEN)

        }
        this.ws = new WebSocket(this.serverURL);
        this.ws.onopen = this.onopen.bind(this)
        this.ws.onmessage = this.onmessage.bind(this)
        this.ws.onerror = this.onerror.bind(this)
        this.ws.onclose = this.onclose.bind(this)

    },

    send($data) {

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // console.log("send", $data)

            var data = JSON.stringify($data)
            this.ws.send(data);
        }
    },

    sendProgress() {

        var progress = { "action": "progress" }
        this.send(progress);

    },

    onopen(event) {
        console.log("WebSocket connection opened:", event, this.ws);

        this.sendProgress();

        // Start sending heartbeat messages at regular intervals
        this.heartbeatIntervalID = setInterval(() => this.sendHeartbeat(), this.heartbeatInterval);
        this.emitPoint.emit(SOCKET_ENUM.SOCKET_OPEN, event)

        // this.send( { end_game: true, ref: 40, user_id: 101, token: "601f41b99bca01c8c30cbf80fa3c5937dff445c9f85363036796d5a97f1952251aa2a8507b53a4a1d0a9ddb288cd8a07923716b36d5f85d2d87df0d949025e8d" })
    },

    onmessage(event) {
        // console.log("WebSocket message received:", event);

        var data = JSON.parse(event.data)
        console.log("WebSocket message received:", data);
        this.emitPoint.emit(SOCKET_ENUM.SOCKET_MESSAGE, data)

    },

    onerror(event) {
        // console.error("WebSocket error:", event);
        this.emitPoint.emit(SOCKET_ENUM.SOCKET_ERROR, event)
        this.setupWebSocket()
    },

    onclose(event) {
        // console.log("WebSocket connection closed:", event);
        if (this.heartbeatIntervalID) { clearInterval(this.heartbeatIntervalID); }
        this.emitPoint.emit(SOCKET_ENUM.SOCKET_CLOSE, event)
        // this.setupWebSocket()
    },

    sendHeartbeat() {
        console.log("sendHeartbeat")
        if (this.ws.readyState === WebSocket.OPEN) {
            const heartbeatMessage = "heartbeat";
            this.ws.send(heartbeatMessage);
        }

    },

    reconnect() {
        this.setupWebSocket();
    },

    serverActive() {
        return this.ws && this.ws.readyState === WebSocket.OPEN
    },

    onDestroy() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
        }
    },
});
module.exports = GameSocket