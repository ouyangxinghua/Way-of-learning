Component({
  properties:{

  },
  data:{
    text:'这是初始文字'
  },
  methods:{
    onClick:function(e){
      this.setData({
        text:'点击了'
      })
      this.triggerEvent('onTextChange')
    },
    setText:function(text){
      this.setData({
        text: text
      })
    }
  }
})