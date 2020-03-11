const wrap = () => {
    // get().then();
    return new Promise((resolve, reject) => {
        Promise.then(({ header, data }) => {
            // header
            // Link:<https://api.github.com/events?page=2>; rel="next", <https://api.github.com/events?page=10>; rel="last"
        })
        const links = parseLinks(header.link);
        const nextUrl = links['rel="next"'];
        if (nextUrl) {
            return resolve({
                data,
                next: () => wrap(new Promise((resolve, reject) => {
                    // 发请求
                    wx.request({
                        success: res => {
                            resolve({
                                data: res.data,
                                headers: res.header
                            });
                        },
                        fail: err => {
                            reject(err);
                        }
                    })
                })
                )
            })
        }
        return resolve({
            data,
            next: null
        })
    })
}
//  pageAble.wrap()
module.exports = {
    wrap
}