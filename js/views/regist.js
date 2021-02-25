//验证手机号
jQuery.validator.addMethod('testtell',function(value){
  let reg = /^1[34579]\d{9}$/;
  if(reg.test(value)){
    return true
  }
  return false
},'手机号格式不正确');
//验证账户
jQuery.validator.addMethod('testuser',function(value){
  let reg = /^([\u4e00-\u9fa5]{2,4}|[a-zA-Z0-9]{1,14})$/;
  if(reg.test(value)){
    return true
  }
  return false
},'用户名只能由2-4个汉字或最多14位字母数字组合而成');
//验证密码
jQuery.validator.addMethod('testpass',function(value){
  let reg = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
  if(reg.test(value)){
    return true
  }
  return false
},'8-16个字符,没有空格,数字、字母、字符至少有两种');
//验证复选框
jQuery.validator.addMethod("isAgreeRule", function(value, element) {
return element.checked;
}, "请阅读并同意用户协议后提交!");
$('#box').validate({
  rules:{
    username:{
      required:true,
      testuser:true
    },
    password:{
      required:true,
      testpass:true
    },
    pass:{
      equalTo:"#password"
    },
    tell:{
      required:true,
      testtell:true
    },
    check:{
      isAgreeRule:true
    }
  },
  messages:{
    username:{},
  },
  submitHandler:function(){
    $.ajax({
      url:"../api/regist.php",
      data:{
        username:$('#username').val(),
        password:$('#password').val()
      },
    }).then(res =>{
      if(res == 'usererror'){
        alert('此用户名已被注册！！！！');
      }else{
        alert('注册成功，即将返回登陆界面');
        window.location.href = './login.html';
      }
    })
  }
})