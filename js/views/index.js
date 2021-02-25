//存储网址
localStorage.setItem('url', location.href);
//获取数据
getData();
function getData() {
  $.ajax({
    url: "./api/getdata.php",
  }).then(res => {
    res = JSON.parse(res);
    render(res);
    rander(res);
  })
}
//渲染有好货部分
function render(data) {
  let date = data.filter(item => {
    return item.sell_info.substr(2) >= 5000;
  });
  let str ='';
  let ax = [];
  for(let i=0;i<6;i++){
    //随机生成一个数字，来挑好货
    //查重
    do{
      var rand = parseInt(Math.random()*22);
      var g = ax.some(item =>{
      return rand == item 
    });
  }while(g);
  ax[i] = rand;
    date.forEach((item,index) => {
      if(index == ax[i]){
        str += `<a href="./html/details.html?id=${item.goods_id}">
      <figure class="col-lg-2 col-xs-4">
        <img class="goods_img"
          src="${item.img}" alt="">
        <h5>${item.title}</h5>
        <h6>月销量到达${item.sell_info.substr(2)}</h6>
      </figure>
    </a>`;
      }
    });
  }
  $('#goodsfig').html(str);
}
//渲染爆款单品部分
function rander(data) {
  let date = data.filter(item => {
    return item.sell_info.substr(2) >= 1000;
  });
  let str ='';
  let ax = [];
  //随机生成一个数字，来挑好货
  for(let i=0;i<10;i++){
  //查重
  do{
    var rand = parseInt(Math.random()*151);
    var g = ax.some(item =>{
    return rand == item 
  });
}while(g);
ax[i] = rand;
  date.forEach((item,index) =>{
    if(index == ax[i]){
    str += `<a href="./html/details.html?id=${item.goods_id}">
      <figure class="col-xs-4">
        <img class="goods_img"
          src="${item.img}" alt="">
        <h5>${item.title}</h5>
        <h5>店铺名：${item.seller_name.substr(1)}</h5>
        <div class="iteminfo">
          <span class="price">${item.price}</span>
          <span class="lateprice">${item.lateprice}</span>
        </div>
        <p class="sell_info">${item.sell_info}</p>
      </figure>
    </a>`
  }
  })
}
$('#hotitem').html(str);  
}
let x = 0;
//搜索标签 的功能 
$(".smaspan").on("click", "li", function () {
  $(".smaspan li").removeClass("active");
  $(this).addClass("active");
  x = $(this).index();
  $("#keyvalue").attr("placeholder",$(this).text());
})
//搜索按钮实现跳转
$("#keysearch").on("mousedown", function () {
  setCookie("keyvalue", $("#keyvalue").val());
  location.href = "./html/list.html?" + x;
})
//搜索按钮键盘摁enter实现跳转
$('#keyvalue').on("keydown",function(e){
  if(e.keyCode == 13){
    e.preventDefault();
    $('#keysearch').trigger('mousedown');
  }
})
//热门分类功能跳转
$('#hotcat').on('click', 'li', function () {
  x = 0;
  $('#keyvalue').val($(this).html());
  $('#keysearch').trigger('mousedown');
})

//当有账户登陆时
let username = localStorage.getItem('login');
if (username) {
  $('#biglogin h3').html(`欢迎登陆！${username}`);
  $('#smalogin').css('display', 'none');
  $('#biglogin').css('display', 'block');
  //购物车和注销按钮功能
  $('.btnz').click(function () {
    location.href = "./html/goodscar.html";
  })
  $('.btnc').click(function () {
    localStorage.removeItem('login');
    $('#smalogin').css('display', 'block');
    $('#biglogin').css('display', 'none');
  })
}
//登陆注册跳转
$('.btnx').click(function () {
  location.href = "./html/login.html";
})
$('.btny').click(function () {
  location.href = "./html/regist.html";
})