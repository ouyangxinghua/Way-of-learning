const $ = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://juejin.im/books';

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
  const books = $('.info', html);
  // 遍历册子节点，分别统计它的购买人数，和销售额总和
  books.each(function () {
    const book = $(this)
    const price = $(book.find('.price-text')).text().replace('￥', '')
    const count = book.find('.message').last().find('span').text().split('人')[0]
    totalSale += Number(price) * Number(count)
    totalSold += Number(count)
  })

  // 最后打印出来
  console.log(
    `共 ${totalBooks} 本小册子`,
    `共 ${totalSold} 人次购买`,
    `约 ${Math.round(totalSale / 10000)} 万`
  )
  const evalResult = await page.evaluate(() => {
    const node = document.querySelector('.poster-img');
    console.log('这段文字来自 puppeteer')
    return node.dataset.src;
  });
  console.log('封面', evalResult)
}
run()
