const $ = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://m.mogu.com/wall/s?q=%E5%A5%B3%E8%A3%85&ptp=32._mf1_1239_4537.0.0.GLxDsGec&acm=3.mce.1_10_1luqg.132826.0.izZN3rwgEEoqR.pos_1-m_509776-sd_119-mf_4537_1125057-idx_1-mfs_15-dm1_5000';

async function run() {
  // 打开浏览器
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  //  networkidle0 没有网络连接
  await page.goto(url, {
    waitUntil: 'networkidle0'
  })
  const html =await page.content();
  const src = $('#J_scroll_wallbox', html);
  let picUrl = [];
  src.each(function () {
    // const url1 = $('.J_dynamic_img', this).attr('src');
    const book = $(this)
    const price1 = $(book.find('.goods_list_mod .J_dynamic_img')).attr('src')
    picUrl.push(price1)
  })
  console.log(
    picUrl
  )
  const evalResult = await page.evaluate(() => {
    return '这段文字来自 puppeteer'
  });
  console.log('封面', evalResult)
}
run()
