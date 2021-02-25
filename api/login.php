<?php
$username = $_GET['username'];
$password = $_GET['password'];

$con = mysqli_connect('localhost','root','caonima521','demo2');

$sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `password` = '$password'";

$res = mysqli_query($con,$sql);

if(!$res){
  die(mysqli_error());
}

$row = mysqli_fetch_assoc($res);

if (!$row) {
  // 没有匹配的数据 登录失败
  echo json_encode(array(
    "code" => 0,
    "message" => "登录失败"
  ));
} else {
  // 有匹配的数据 登录成功
  echo json_encode(array(
    "code" => 1,
    "message" => "登录成功"
  ));
}

?>