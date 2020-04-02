<template>

  <div class="container">

    <div class="service-container">
      <div class="service-part-box">
        <p class="service-part-title">热门服务推荐</p>
        <div class="service-part-line"></div>
        <div class="service-part-main service-part-mb">
          <div class="service-part-module" @click.stop="enterServer('hot', 1)">
            <div class="service-part-icon-10"></div>
            <p>商事信息查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('hot', 2)">
            <div class="service-part-icon-06"></div>
            <p>社保查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('hot', 3)">
            <div class="service-part-icon-03"></div>
            <p>公积金查询</p>
          </div>
        </div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('hot', 3)">
            <div class="service-part-icon-03"></div>
            <p>公积金查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('hot', 4)">
            <div class="service-part-icon-22"></div>
            <p>司法行政</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">中心服务</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('center', 1)">
            <div class="service-part-icon-10"></div>
            <p>商事信息查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('center', 2)">
            <div class="service-part-icon-28"></div>
            <p>办件查询</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">公积金</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('funds', 1)">
            <div class="service-part-icon-03"></div>
            <p>公积金查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('funds', 2)">
            <div class="service-part-icon-04"></div>
            <p>公积金办理</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">社保</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('security', 1)">
            <div class="service-part-icon-06"></div>
            <p>社保查询</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">税务</p>
        <div class="service-part-line"></div>
        <div class="service-part-main service-part-mb">
          <div class="service-part-module" @click.stop="enterServer('customs', 1, true)">
            <div class="service-part-icon-20"></div>
            <p>纳税查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('customs', 2)">
            <div class="service-part-icon-12"></div>
            <p>办税预约</p>
          </div>
        </div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('customs', 3, true)">
            <div class="service-part-icon-14"></div>
            <p>发票查验</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">出入境服务</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('exit', 1, true)">
            <div class="service-part-icon-27"></div>
            <p>办理进度查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('exit', 2, true)">
            <div class="service-part-icon-13"></div>
            <p>出入境业务办理</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">交管服务</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('intersection', 1, true)">
            <div class="service-part-icon-23"></div>
            <p>违章查询</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">公安户政</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('police', 1)">
            <div class="service-part-icon-19"></div>
            <p>职能咨询预约</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('police', 2)">
            <div class="service-part-icon-18"></div>
            <p>网上申办</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">司法服务</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('judicial', 1)">
            <div class="service-part-icon-22"></div>
            <p>司法行政</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">学历服务</p>
        <div class="service-part-line"></div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('educational', 1)">
            <div class="service-part-icon-24"></div>
            <p>学历查询</p>
          </div>
        </div>
      </div>
      <div class="service-part-box">
        <p class="service-part-title">医疗服务</p>
        <div class="service-part-line"></div>
        <div class="service-part-main service-part-mb">
          <div class="service-part-module" @click.stop="enterServer('medical', 1)">
            <div class="service-part-icon-25"></div>
            <p>医疗机构查询</p>
          </div>
          <div class="service-part-module" @click.stop="enterServer('medical', 2)">
            <div class="service-part-icon-17"></div>
            <p>挂号预约</p>
          </div>
        </div>
        <div class="service-part-main">
          <div class="service-part-module" @click.stop="enterServer('medical', 3)">
            <div class="service-part-icon-26"></div>
            <p>医院导航</p>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script type="text/javascript">
let _self;

export default {
  name: 'service',
  data () {
    return {
      current_module: 'hot', // 当前模块(hot：热门服务推荐；funds：公积金；security：社保；drug：药品医疗；judicial：司法服务)
      current_server: 1 // 当前模块下的某个服务
    }
  },
  components: {},
  watch: {},
  mounted () {
    _self = this;
  },
  methods: {
    /**
     * 前往某个模块下的某个服务
     * module:当前模块(hot：热门服务推荐；funds：公积金；security：社保；customs：税务；exit：出入境服务；intersection：交管服务)
     * server:当前模块下的某个服务
     * jump:是否需求跳转打开页面
     */
    enterServer (module, server, jump) {
      _self.current_module = module;
      _self.current_server = server;

      let path = '';

      if (module === 'hot') {
        /**
         * server:(1：商事信息查询；2：社保查询；3：公积金查询；4：司法行政)
         */
        if (server === 1) {
          path = 'http://cri.gz.gov.cn/sofpro/gzyyqt/bmcx/business/mainBusiness.jsp?page=1';
        } else if (server === 2) {
          path = 'http://gzlss.hrssgz.gov.cn/gzlss_web/weixin/getSubList.xhtml?';
        } else if (server === 3) {
          path = 'https://wx.gzgjj.gov.cn/wap/mes-search.html';
        } else if (server === 4) {
          path = 'http://www.gdsf.gov.cn/wx/convenience.html';
        }
      } else if (module === 'center') {
        /**
         * server:(1：商事信息查询；2：办件查询)
         */
        if (server === 1) {
          path = 'http://cri.gz.gov.cn/sofpro/gzyyqt/bmcx/business/mainBusiness.jsp?page=1';
        } else if (server === 2) {
          _self.$router.push({ path: '/user/affair-schedule/schedule-search' });

          return false;
        }
      } else if (module === 'funds') {
        /**
         * server:(1：公积金查询；2：公积金办理)
         */
        if (server === 1) {
          path = 'https://wx.gzgjj.gov.cn/wap/mes-search.html';
        } else if (server === 2) {
          path = 'https://wx.gzgjj.gov.cn/wap/business.html';
        }
      } else if (module === 'security') {
        /**
         * server:(1：社保查询)
         */
        if (server === 1) {
          path = 'http://gzlss.hrssgz.gov.cn/gzlss_web/weixin/getSubList.xhtml?';
        }
      } else if (module === 'customs') {
        /**
         * server:(1：纳税查询；2：办税预约  3：发票查验)
         */
        if (server === 1) {
          path = 'https://wssw.12366.gov.cn/sjwg/swws/smcy/nsrSwdjSmcyAction.do?method=searchWap&accessNo=6229646&gdbsRandom=c2bbfb5852574512843f53ae50a5faae&gdbsItemConfigId=c2b1d54079a011e6812c005056a368e2';
        } else if (server === 2) {
          path = 'http://yymtax.gdltax.gov.cn/gdyypt/r.asyn?s=bookingHandler&m=bookingJsp&ssoFlag=0&accessNo=6229678&gdbsRandom=23763c2a93154bcb814047096485633a&gdbsItemConfigId=c2b142a679a011e6812c005056a368e2';
        } else if (server === 3) {
          path = 'http://waptest.gdbs.gov.cn/gdbsService/wap/mobileH/jsp/wxgzh/dsj/fpjy.jsp?accessNo=6229712&gdbsRandom=17e1c18186524d1999a4de07a358294d&gdbsItemConfigId=93908a585fbd4ce4015fc9cf726e0149';
        }
      } else if (module === 'exit') {
        /**
         * server:(1：证件办理进度查询；2：出入境业务办理)
         */
        if (server === 1) {
          path = 'http://www.gdcrj.com/gdcrjwx/gdsweixin_query.html';
        } else if (server === 2) {
          path = 'http://www.gdcrj.com/gdcrjwx/ywbl.html?openid=oqu9Fw6LfwFoWkMrkQK9CDdsW0NE';
        }
      } else if (module === 'intersection') {
        /**
         * server:(1：违章查询)
         */
        if (server === 1) {
          path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx56409403289233ca&redirect_uri=http%3A%2F%2Fgzjjwx.gzjd.gov.cn%2FWechatAPIServer%2Fmember%2FotherCarPage2%3Fsource%3D&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect';
        }
      } else if (module === 'police') {
        /**
         * server:(1：户政业务职能咨询预约；2：户政业务网上申办)
         */
        if (server === 1) {
          path = 'http://gzhzyw.gzjd.gov.cn/hzzxwx/';
        } else if (server === 2) {
          path = 'http://gzhzyw.gzjd.gov.cn/hzyw/ysl/main.do?openid=orEamjhDG3fP389lDtQFkHqVdilc';
        }
      } else if (module === 'judicial') {
        /**
         * server:(1：司法行政)
         */
        if (server === 1) {
          path = 'http://www.gdsf.gov.cn/wx/convenience.html';
        }
      } else if (module === 'educational') {
        /**
         * server:(1：学历查询)
         */
        if (server === 1) {
          path = 'https://www.chsi.com.cn/xlcx/lscx/query.do?code=001J8XGD0As3Zd2334HD0dgYGD0J8XGL&state=wxsub';
        }
      } else if (module === 'medical') {
        /**
         * server:(1：医疗机构查询；2：挂号预约  3：医院导航)
         */
        if (server === 1) {
          path = 'http://url.cn/5vudWWN';
        } else if (server === 2) {
          path = 'http://wap.guahao.gov.cn/v4_wap/index/index.html?code=061LDSs70KiLAI1qsEs70AUYs70LDSsV&state=123&_time=1534212048478#/index';
        } else if (server === 3) {
          path = 'http://wap.guahao.gov.cn/v4_wap/index/index.html?TYPE=navigation#/index';
        }
      }
      // 判断是否跳转打开,某些第三方页面不支持在iframe框架内打开
      console.log(jump);
      if (jump === true) {
        window.location.href = path;
      } else {
        _self.$router.push({ path: '/service/service-iframe', query: {serviceUrl: path} });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/utils.scss';
.service-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  position: absolute;
  background: rgb(242, 242, 242);
  top:0;
  left:0;
  .single-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .service-part-box {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background: white;
    padding: torem(28px) 0 torem(49px) torem(33px);
    margin-bottom: torem(20px);
  }
  .service-part-title {
    font-family: PingFangSC-Regular;
    font-size: torem(34px);
    color: $main-color;
    letter-spacing: 0;
  }
  .service-part-line {
    width: 100%;
    height: 1px;
    background: #E5E5E5;
    margin: torem(21px) 0 torem(35px);
  }
  .service-part-main {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 torem(51px) 0 torem(18px);
    display: flex;
  }
  .service-part-mb {
    margin-bottom: torem(46px);
  }
  .service-part-module {
    width: 50%;
    height: torem(60px);
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    div {
      width: torem(60px);
      height: torem(60px);
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: torem(12px);
    }
    p {
      font-family: PingFangSC-Medium;
      font-size: torem(28px);
      color: #333333;
      letter-spacing: 0;
      font-weight: 600;
      margin-left: torem(20px);
    }
  }
  .service-part-icon-01{
    background-image:url('../../assets/images/icon/convenience-services/icon-01.png');
  }
  .service-part-icon-02{
    background-image:url('../../assets/images/icon/convenience-services/icon-02.png');
  }
  .service-part-icon-03{
    background-image:url('../../assets/images/icon/convenience-services/icon-03.png');
  }
  .service-part-icon-04{
    background-image:url('../../assets/images/icon/convenience-services/icon-04.png');
  }
  .service-part-icon-05{
    background-image:url('../../assets/images/icon/convenience-services/icon-05.png');
  }
  .service-part-icon-06{
    background-image:url('../../assets/images/icon/convenience-services/icon-06.png');
  }
  .service-part-icon-07{
    background-image:url('../../assets/images/icon/convenience-services/icon-07.png');
  }
  .service-part-icon-08{
    background-image:url('../../assets/images/icon/convenience-services/icon-08.png');
  }
  .service-part-icon-09{
    background-image:url('../../assets/images/icon/convenience-services/icon-09.jpg');
  }
  .service-part-icon-10{
    background-image:url('../../assets/images/icon/convenience-services/icon-10.jpg');
  }
  .service-part-icon-11{
    background-image:url('../../assets/images/icon/convenience-services/icon-11.jpg');
  }
  .service-part-icon-12{
    background-image:url('../../assets/images/icon/convenience-services/icon-12.png');
  }
  .service-part-icon-13{
    background-image:url('../../assets/images/icon/convenience-services/icon-13.png');
  }
  .service-part-icon-14{
    background-image:url('../../assets/images/icon/convenience-services/icon-14.png');
  }
  .service-part-icon-15{
    background-image:url('../../assets/images/icon/convenience-services/icon-15.png');
  }
  .service-part-icon-16{
    background-image:url('../../assets/images/icon/convenience-services/icon-16.png');
  }
  .service-part-icon-17{
    background-image:url('../../assets/images/icon/convenience-services/icon-17.png');
  }
  .service-part-icon-18{
    background-image:url('../../assets/images/icon/convenience-services/icon-18.png');
  }
  .service-part-icon-19{
    background-image:url('../../assets/images/icon/convenience-services/icon-19.png');
  }
  .service-part-icon-20{
    background-image:url('../../assets/images/icon/convenience-services/icon-20.png');
  }
  .service-part-icon-21{
    background-image:url('../../assets/images/icon/convenience-services/icon-21.png');
  }
  .service-part-icon-22{
    background-image:url('../../assets/images/icon/convenience-services/icon-22.png');
  }
  .service-part-icon-23{
    background-image:url('../../assets/images/icon/convenience-services/icon-23.png');
  }
  .service-part-icon-24{
    background-image:url('../../assets/images/icon/convenience-services/icon-24.png');
  }
  .service-part-icon-25{
    background-image:url('../../assets/images/icon/convenience-services/icon-25.png');
  }
  .service-part-icon-26{
    background-image:url('../../assets/images/icon/convenience-services/icon-26.png');
  }
  .service-part-icon-27{
    background-image:url('../../assets/images/icon/convenience-services/icon-27.png');
  }
  .service-part-icon-28{
    background-image:url('../../assets/images/icon/convenience-services/icon-28.png');
  }
}
</style>
