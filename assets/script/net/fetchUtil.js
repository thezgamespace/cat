const apiUrl = require("./apiUrl");

const fetchUtil={};
fetchUtil.request = ($url, $method, $params) => {
    let endPoint = apiUrl.baseUrl + $url;

    let params = {
        method: $method,
        headers: apiUrl.headers,
        body: JSON.stringify($params)
    }

    return fetch(endPoint, params)
        .then(res => {
            if (res.ok) {
                // console.log("success")
            } else {
                // console.log("not success")
            }
            return res.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log("Error"))

}

fetchUtil.get = ($url, $params) => {
    return fetchUtil.request($url, "POST", $params)

}

fetchUtil.post = ($url, $params) => {

    return fetchUtil.request(url, "POST", $params)

}

module.exports = fetchUtil;