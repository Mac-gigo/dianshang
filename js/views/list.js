let gtype = location.search.slice(1);
let keyvalue = getCookie("keyvalue");
$('#keyvalue').val(keyvalue);
getData(1, 18);
let flag = true;

function getData(index, length) {
  $.ajax({
    url: "../api/listdata.php",
    type: "post",
    data: {
      index,
      length,
      keyvalue,
      gtype
    }
  }).then(res => {
    res = JSON.parse(res);
    if (flag) {
      //列表
      $('.m-style').pagination({
        totalData: res.total,
        showData: length,
        coping: true,
        endPage: '末页',
        homePage: '首页',
        prevContent: '上一页',
        nextContent: '下一页',
        jump: true,
        current: 1,
        callback: function (e) {
          flag = false;
          getData(e.getCurrent(), length);
        }
      });
    }
    render(res.list);
  })
}

//渲染列表页面
function render(data) {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  let ste = "";
  data.forEach((item, index) => {
    let seller = item.seller_name.substr(1);
    let str = `<figure class="col-lg-4 col-xs-6">
            <ul>
                <li>分类</li>/
                <li>${item.key_word}</li>/
                <li>关键词：${keyvalue}</li>
            </ul>
            <img src="${item.img}" alt="">
            <figcaption>
            <p>${item.title}</p>
            <span class="lateprice">${item.lateprice}</span>
            <span>￥${item.price}</span><br>
            <p>店铺名：${seller}</p>
        <a href="./goodscar.html">查看购物车</a>
        <a href="./details.html?id=${item.goods_id}">查看商品详情</a>
        <p>${item.sell_info}<p>
        </figcaption>
        </figure>`;
    ste += str;
  });
  $('.con').html(ste);
}

//搜索标签的功能
$(".smaspan li").removeClass("active");
$(".smaspan li").each(function (index, item) {
  if (index == gtype) {
    $("#keyvalue").attr("placeholder", $(item).find("a").html())
    $(item).addClass("active");
  }
})
$(".smaspan").on("click", "li", function (e) {
  $(".smaspan li").removeClass("active");
  $(this).addClass("active");
  $("#keyvalue").attr("placeholder", e.target.innerHTML);
  gtype = $(this).index();
});

//搜索功能
$("#keysearch").on('click', function () {
  keyvalue = $('#keyvalue').val();
  flag = true;
  getData(1, 18);
})
//搜索按钮键盘摁enter实现跳转
$('#keyvalue').on("keydown",function(e){
  if(e.keyCode == 13){
    e.preventDefault();
    $('#keysearch').trigger('click');
  }
})