import React, { Component } from 'react';
import Swiper from 'swiper'; 
import { Route } from 'react-router-dom'
import Lazyload, { forceCheck } from 'react-lazyload';
import 'swiper/dist/css/swiper.css';
import { getCarousel, getNewAlbum } from '../../api/recommend';
import { createAlbumByItem } from '../../model/album';
import Scroll from '../../common/scroll/Scroll'
import Loading from '../../common/loading/loading'
import './recommend.styl'
import Album from '../../containers/Album'

class Recommend extends Component {
  state = { 
    slideList: [],
    albumList: [],
    refreshScroll: false,
    show: true
  }
  componentDidMount() {
    getCarousel().then(res => {
      // console.log(res);
      this.setState({
        slideList: res.data.slider
      }, () => {
        if (!this.sliderSwiper) {
          this.sliderSwiper = new Swiper('.slider-container', {
            loop: true,
            autoplay: true,
            pagination: '.swiper-pagination'
          })
        }
      })
    })
    getNewAlbum().then(res => {
      // console.log(res);
      let albumList = res.albumlib.data.list;
      // console.log('albumList', albumList);
      this.setState({
        albumList,
        show: false
      }, () => {
        this.setState({
          refreshScroll: true
        })
      })
    })
  }
  renderSwiperItem = () => {
    const { slideList } = this.state;
    return (
      <>
        {
          slideList.map((slider) => {
            return (
              <div className="swiper-slide" key={slider.id}>
                <a href={slider.linkUrl} className="slider-nav">
                  <img src={slider.picUrl} width="100%" height="100%" alt="" />
                </a>
              </div>
            )
          })
        }
      </>
    )
  }
  handleToAlbumDetail = (url) => {
    console.log(url)
    console.log(this.props.history)
      this.props.history.push({
        pathname: url
      })
  }
  renderAlbum = () => {
    const { albumList = [] } = this.state;
    const { match } = this.props;
    // console.log(this.props.match.url)
    return albumList.map(item => {
      // 渲染 album
      const album = createAlbumByItem(item);
      // console.log(album.mId)
      return (
        <div className="album-wrapper" key={album.mId}
        onClick={() => this.handleToAlbumDetail(`${match.url}/${album.mId}`) }>
          <div className="left">
            <Lazyload>
              <img src={album.img} width="100%" height="100%" alt="" />
            </Lazyload>
          </div>
          <div className="right">
            <div className="album-name">
              {album.name}
            </div>
            <div className="singer-name">
              {album.singer}
            </div>
            <div className="public-time">
              {album.publicTime}
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    console.log("recommend")
    const { refreshScroll } = this.state;
    const { match } = this.props;
    return (
      <div className="music-recommend">
        <Scroll refresh={refreshScroll} onScroll={forceCheck}>
          <div>
            <div className="slider-container">
              <div className="swiper-wrapper">
                {this.renderSwiperItem()}
              </div>
              <div className="swiper-pagination"></div>
            </div>
            <div className="album-container">
              <h1 className="title">最新专辑</h1>
              <div className="album-list">
                {this.renderAlbum()}
              </div>
            </div>
          </div>
        </Scroll>
        <Loading title="正在加载中..." show={this.state.show}></Loading>
        <Route path={`${match.url}/:id`} component={Album}/>
      </div>
    );
  }
}

export default Recommend;