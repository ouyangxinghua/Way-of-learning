const Event = require('events')
const request = require('./lib/request.js')
const Play = require('player')
const ev = new Event();
// ev.on('search')
['search','choose'].forEach(evName => {
  const fn = require(`./lib/${evName}`);
  ev.on(evName, async function(...args) {
    const res = await fn(...args);
    ev.emit('handle', evName, res, ...args);
    // console.log(res)
  })
})

ev.on('afterSearch', (res, keyWord) => {
  if (!res.result || !res.result.songs){
    console.log(`没有搜到${keyword}的信息`);
    return false;
  }
  const songs = res.result.songs;
  ev.emit('choose', songs);
})

ev.on('afterChoose', async (select, songs) => {
  // selected 1海阔天空
  const selectSong = songs.find((song, i) => {
    return selected.song == `${i}${song.name}`
  })
  if (selectSong) {
    const { id } = selectSong;
    // 请求歌曲详情
    const url = 'http://neteasecloudmusicapi.zhaoboy.com/song/url?id=' + id
    const songDetail = await request(url)
    const { url: songUrl} = songDetail;
    const player = new player(songUrl);
    player.play();
  }
})

ev.on('handle', (key, res, ...args) => {
  switch(key) {
    case 'search':
      return ev.emit('afterSearch', res, args[0]);
    case 'choose':
      return ev.emit('afterChoose', res, args[0]);
  }
})

function main() {
  const argv = process.argv.slice(2);
  let keyWord = argv[0]
  ev.emit('search', keyWord)
}
main();