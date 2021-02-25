getData();
  //放大镜效果
    //获取id
    let id = location.search.slice(1);
    id = id.split('=');
    id = id[1];
 //获取数据
 function getData() {
      $.ajax({
        url: "../api/getdata.php",
      }).then(res => {
        res = JSON.parse(res);
        console.log(res);
        render(res);
      })
    }
//渲染结构
function render(data){
  let ste = '';
  data.forEach((item) => {
    if(item.goods_id == id){
      console.log(item);
      let str = ` <ol class="breadcrumb">
          <li><a href="${item.title_url}">详情(可以到真正购买的页面哦！)</a></li>
          <li><a href="../index.html">返回首页</a></li>
      </ol>
      <div class="media">
          <div class="media-left">
                  <img class="media-object my-foto"
                      src="${item.img}"
                      alt="...">
          </div>
          <div class="media-body">
              <h4 class="media-heading">${item.title}
              </h4>
              <div class="lateprice">
                <i>原价：</i>
                  <span>${item.lateprice}</span>
              </div>
              <div class="price">
                <i>现价：</i>
                  <span>￥${item.price}</span>
              </div>
              <h4 class="seller">店铺名：${item.seller_name.substr(1)}</h4>
              <div>
                  <button class="btn btn-warning btn-lg" id="addcar" >添加到购物车</button>
                  <button class="btn btn-danger btn-lg" id="gocar">查看购物车</button>
              </div>
              <h5 class="mes"><span>服务承诺：</span> &nbsp;&nbsp;&nbsp;&nbsp;正品保证 &nbsp; &nbsp;&nbsp;&nbsp;极速退款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七天无理由退货</h5>
              <h5 class="sell_info">${item.sell_info}</h5>
          </div>
      </div>`;
      $('.container').html(str);
      //放大镜效果
      $(".my-foto").imagezoomsl({
       innerzoommagnifier: true,
       classmagnifier: window.external ? window.navigator.vendor === "Yandex" ? "" : "round-loupe" : "",
       magnifierborder: "5px solid #F0F0F0",                               // fix для Opera, Safary, Yandex		  
       zoomrange: [2, 8],
       zoomstart: 4,
       magnifiersize: [150, 150]		
   });
}
if(id < item.goods_id*1 && item.goods_id*1 <= id*1+6){
  ste += `<figure class="col-lg-4 col-xs-6">
        <a href="./details.html?id=${item.goods_id}">
        <img class="my-foto" src="${item.img}" alt="">
        <h5>￥${item.price}</h5>
      </a>
      </figure>`;
}
});
$('.container-fluid').html(ste);
}

//购物车的点击事件
$('.container').on('click',function (e) {
  if(e.target.id == 'gocar'){
    location.href = './goodscar.html'
  }
  if(e.target.id == 'addcar'){
    let login = localStorage.getItem('login');
    if(!login){
      alert('请先去登录页面登陆');
      localStorage.setItem('url',location.href);
      location.href = './login.html';
      return
    }
    $.ajax({
      url:'../api/addcar.php',
      data:{
        goods_id:id,
        username:login
      }
    }).then(res => {
      alert('已成功添加到购物车')
    })
  }
})