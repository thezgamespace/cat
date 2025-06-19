const apiUrl = require("../net/apiUrl");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    ctor() {
        this.token = "";
        this.baseUrl = apiUrl.baseUrl;
        this.gameId = "";
        this.gameName = "";
        this.sessionId = "";
        this.params = {
            headers: { Authorization: "Bearer " + apiUrl.token },
            referrerPolicy: 'no-referrer'

        }
    },
    start() {
    },

    // connectMethod() {
    //     let url = this.url;
    //     url += "user/login"
    //     url += "?gameId=" + this.gameId;
    //     url += "&gameName" + this.gameName;
    //     const data = {
    //         headers: { Authorization: "bearer " + this.token },
    //         sessionId: this.sessionId

    //     }
    //     return this.post(url, data)
    // },

    // fetch($input, $params, $success, $error) {
    //     return new Promise((resolve, reject) =>
    //         window["fetch"]($input, $params)
    //             .then(this.status.bind(this))
    //             .then(this.format)
    //             .then((response) => {
    //                 $success ? $success(response) : this.successHandler(response)
    //                 resolve();
    //             })
    //     )
    //         .catch((error) => {
    //             $error ? $error(error) : this.errorHandler(error)
    //             resolve();
    //         })
    // },

    fetch($input, $params, $success, $error) {
        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutId = setTimeout(() => {
            controller.abort();
            // const timeoutError = new Error('Request timed out');
            const timeoutError = { msg: 'Request timed out' };
            $error ? $error(timeoutError) : this.errorHandler(timeoutError);
        }, 20000);

        return new Promise((resolve, reject) => {
            window["fetch"]($input, { ...$params, signal })
                .then(this.status.bind(this))
                .then(this.format)
                .then(response => {
                    clearTimeout(timeoutId);
                    $success ? $success(response) : this.successHandler(response);
                    resolve();
                })
                .catch(error => {
                    // console.log(error)
                    clearTimeout(timeoutId);

                    if (error.name === 'AbortError') {
                        // Connection timed out
                        // const timeoutError = new Error('Connection timed out');
                        const timeoutError = { msg: 'Connection timed out' };
                        $error ? $error(timeoutError) : this.errorHandler(timeoutError);
                    } else if (error.message) {
                        const fetchError = { msg: error.message };
                        $error ? $error(fetchError) : this.errorHandler(fetchError);
                    } else {
                        // Other errors
                        $error ? $error(error) : this.errorHandler(error);
                    }
                    resolve();
                });
        });
    },

    get($input, $params, $success, $error) {
        const params = { method: "GET" };
        const data = { ...params, ...$params, ...this.params }
        return this.fetch($input, data, $success, $error)
    },

    post($input, $params, $success, $error) {
        const params = { method: "POST" };
        const data = { ...params, ...$params, ...this.params }
        return this.fetch($input, data, $success, $error)
    },


    status($response) {
        // console.log("response",$response)
        if ($response.status >= 200 && $response.status < 300) {
            return Promise.resolve($response)
        } else {
            this.errorHandler($response)
            return Promise.reject($response)
        }
    },

    format($response) {
        return $response.json();
    },

    successHandler($response) {
        // console.log("successHandler", $response)
    },

    errorHandler($error) {
        // console.log("errorHandler", $error)
    },


    // update (dt) {},
});
