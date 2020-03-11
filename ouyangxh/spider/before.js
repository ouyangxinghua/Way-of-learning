const https = require('https');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
// 服务端的 $ jquery
const url = 'https://m.mogu.com/wall/s?q=%E5%A5%B3%E8%A3%85&ptp=32._mf1_1239_4537.0.0.GLxDsGec&acm=3.mce.1_10_1luqg.132826.0.izZN3rwgEEoqR.pos_1-m_509776-sd_119-mf_4537_1125057-idx_1-mfs_15-dm1_5000';
// 爬取每一页的方法
function spiderMovies(start) {
    https.get(url, (res) => {
        res.setEncoding('utf-8');
        // 源源不断收到数据
        let html = '';
        res.on('data', (chunk) => {
            html += chunk;
        });
        // 数据发完了
        res.on('end', () => {
            // 可以用的 html
            const $ = cheerio.load(html);
            let movies = [];
            $('#J_scroll_wallbox').each(function () {
                // this 在哪个作用域之内查找 - 每一部电影
                // 默认全局 每次都找到第一张
                const picUrl = $('.goods_list_mod .J_dynamic_img', this).attr('src');
                console.log(picUrl)
                const movie = {
                    picUrl
                }
                movies.push(movie);
                // downloadImg(picUrl);
            })
            // 文件名上标示一下 数据页数
            // saveLocalData(start / 25, movies);
        })
    })
}
const dataDir = './moviesData/'
function saveLocalData(page, movies) {
    // 文本信息
    fs.writeFile(dataDir + `data${page}.json`,
        JSON.stringify(movies),
        (err) => {
            if (!err) {
                console.log('数据保存成功');
            } else {
                console.log(err);
            }
        }
    )
}
function downloadImg(picUrl) {
    https.get(picUrl, (res) => {
        res.setEncoding('binary');
        let imageData = '';
        res.on('data', (chunk) => {
            imageData += chunk;
        })
        res.on('end', () => {
            // https://img3.doubanio.com/
            // view/photo/s_ratio_poster
            // /public/p480747492.jpg
            fs.writeFile(imageDir + path.basename(picUrl),
                imageData,
                'binary',
                (err) => {
                    if (!err) {
                        console.log('image downloaded:',
                            path.basename(picUrl))
                    }
                }
            )
        })
    })
}
// es6 generate 函数
// function* doSpider(x) {
//     let start = 0;
//     while (start < x) {
//         yield start
//         // 
//         spiderMovies(start);
//         start += 25;
//     }
// }
// for (let x of doSpider(250)) {
//     console.log('爬取', x);
// }
