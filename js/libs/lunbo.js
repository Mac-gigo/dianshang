class Swiper {
  constructor() {
    this.w = $('.swiper-item').width();
    this.num = 0;
    this.len = $('.swiper .swiper-item').length - 1;
    this.timer = null;
  }
  init() {
    //设置定时器
    this.setTime();
    //滑上停止定时器
    this.hover();
    //点击指示
    this.pointClick();
    //点击左右箭头
    this.lrClick();
  }
  setTime() {
    this.timer = setInterval(() => {
      this.num++;	
      if (this.num > this.len) {
        this.num = 0;
      }
      let cssTrx = -this.num * this.w;
      $('.swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
      $('.swiper').css({transform: `translateX(${cssTrx}px)`})
    }, 3000)
  }
  hover() {
    $('.swiper-contione').hover(() => {
      clearInterval(this.timer)
    }, () => {
      this.setTime();
    });
  }
  pointClick() {
    let that = this;
    $('.swiper-point-item .point').click(function() {
      that.num = $(this).index();
      let cssTrx = -that.num * that.w;
      $(this).addClass('active').siblings().removeClass('active');
      $('.swiper').css({
        transform: `translateX(${cssTrx}px)`
      })
    })
  }
  lrClick() {
    $('.swiper-left img').click(() => {
      this.num--;
      if (this.num < 0) {
        this.num = this.len;
      };
      console.log(this.num)
      let cssTrx = -this.num * this.w;
      $('.swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
      $('.swiper').css({
        transform: `translateX(${cssTrx}px)`
      })
    });
    
    $('.swiper-right img').click(() => {
      this.num++;
      if (this.num > this.len) {
        this.num = 0;
      }
      let cssTrx = -this.num * this.w;
      $('.swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
      $('.swiper').css({
        transform: `translateX(${cssTrx}px)`
      })
    })
  }
}
let sw = new Swiper();
sw.init();