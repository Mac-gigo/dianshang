//登陆事件
$('.btnx').click(function(){
  $.ajax({
    url:'../api/login.php',
    data:{
      username:$(".user").val(),
      password:$(".pass").val()
    }
  }).then(res =>{
    res = JSON.parse(res);
    if(res.code  == 0 ){
      $('.user').val("");
      $('.pass').val("");
      alert("账号或密码错误，请重新输入");
    }
    if(res.code == 1){
      localStorage.setItem('login',$('.user').val());
      let url = localStorage.getItem('url');
      location.href = url;
    }
  })
})
//注册事件
$('.btny').click(function () {
  location.href = './regist.html';
})