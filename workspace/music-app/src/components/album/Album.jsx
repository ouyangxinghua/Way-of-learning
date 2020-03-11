import React, { Component } from 'react';
import './album.styl';
import { CSSTransition } from 'react-transition-group';
import Scroll from '../../common/scroll/Scroll';
import { getAlbumInfo } from '../../api/recommend';
import * as AlbumModel from '../../model/album';
import * as SongModel from '../../model/song';
import Header from '../../common/header/header';
import { getSongVKey } from '../../api/song'

class Album extends Component {
  state = {
    show: false,
    songs: [],
    album: {},
    loading: true
  }
  getSongUrl = (song, mId) => {
    // 请求
    getSongVKey(mId).then(res => {
      console.log(res.data.items)
      if (res.data.items){
        let item = res.data.items[0];
        song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
      }
    })
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    // console.log(this.props.match)
    getAlbumInfo(id).then(res => {
      // console.log('getAlbuminfo', res);
      let album = AlbumModel.createAlbumBydetail(res.data);
      album.desc = res.data.desc;
      let songList = res.data.list;
      let songs = [];
      songList.forEach(item => {
        let song = SongModel.createSong(item);
        this.getSongUrl(song, item.songmid);
        songs.push(song);
      });
      this.setState({
        // show: true,
        album: album,
        songs,
        loading: false
      })
    })
  }
  selectSong = (song) => {
    return () => {
      // console.log(this.props)
      this.props.changeCurrentSong(song)
    }
  }
  render() {
    console.log("album")
    const { album } = this.state
    const songsNode = this.state.songs.map((song) => {
      return (
        <div className="song" key={song.id}
        onClick={ this.selectSong(song) }>
          <div className="song-name">
            {song.name}
          </div>
          <div className="song-singer">
            {song.singer}
          </div>
        </div>
      )
    })
    return (
      <CSSTransition in={this.state.show} timeout={300} classNames="translate">
        <div className="music-album">
          <Header title={album.name} ref="header"/>
          <div style={{ position: 'relative' }}>
            <div ref="albumBg" className="album-img"
            style={{ backgroundImage: `url(${album.img})`}}>
              <div className="filter"></div>
            </div>
            <div ref="albumFixedBg" className="album-img fixed">
              <div className="filter"></div>
            </div>
            <div className="play-wrapper" ref="playButtonWrapper">
              <div className="play-button">
                <i className="icon-play"></i>
                <span>播放全部</span>
              </div>
            </div>
          </div>
          <div className="album-container">
            <div className="album-scroll">
              <Scroll onScroll={() => {}}>
                <div className="album-wrapper">
                  <div className="song-count">
                    专辑 共{songsNode.length}首
                  </div>
                  <div className="songlist">
                    {songsNode}
                  </div>
                  <div className="album-info" style={album.desc ? {} : { display: "none" }}>
                    <h1 className="album-title">专辑简介</h1>
                    <div className="album-desc">
                      {album.desc}
                    </div>
                  </div>
                </div>
              </Scroll>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default Album;