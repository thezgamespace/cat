

export class Fetcher {
    constructor() {

        var token= this.getUrlParam("token")
        console.log("token",token)

        this.baseUrl = "https://bgame.bartervip.com/api/"
        this.params = {
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + token
            },
            referrerPolicy: 'no-referrer'

        }

    }
    getUrlParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[[]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    fetch($input, $params, $success, $error) {
        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutId = setTimeout(() => {
            controller.abort();
            // const timeoutError = new Error('Request timed out');
            const timeoutError = { msg: 'Request timed out' };
            console.log("error a")
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
                    console.log(error)
                    clearTimeout(timeoutId);

                    if (error.name === 'AbortError') {
                        // Connection timed out
                        // const timeoutError = new Error('Connection timed out');
                        const timeoutError = { msg: 'Connection timed out' };
                        console.log("error b")
                        $error ? $error(timeoutError) : this.errorHandler(timeoutError);
                    } else if (error.message) {
                        const fetchError = { msg: error.message };
                        console.log("error c")
                        $error ? $error(fetchError) : this.errorHandler(fetchError);
                    } else {
                        // Other errors
                        console.log("error d")
                        $error ? $error(error) : this.errorHandler(error);
                    }
                    resolve();
                });
        });
    }

    get($input, $params, $success, $error) {
        const params = { method: "GET" };


        const data = { ...params, ...$params, ...this.params }
        return this.fetch($input, data, $success, $error)
    }

    post($input, $params, $success, $error) {
        const params = { method: "POST" };
        const data = { ...params, ...$params, ...this.params }
        return this.fetch($input, data, $success, $error)
    }

    status($response) {
        if ($response.status >= 200 && $response.status < 300) {
            return Promise.resolve($response)
        } else {
            this.errorHandler($response)
            return Promise.reject($response)
        }
    }

    format($response) {
        return $response.json();
    }

    successHandler($response) {
        // console.log("successHandler", $response)
    }


    errorHandler($data) {

    }

}