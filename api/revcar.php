<?php
$id = $_GET['goods_id'];
$num = $_GET['goods_num'];
$username = $_GET['username'];

$con = mysqli_connect('localhost','root','caonima521','demo2');

$sql = "UPDATE `car` SET `goods_num` = '$num' WHERE `username`='$username' AND `goods_id` = '$id'";

if(!$num){
  $sql = "DELETE FROM `car` WHERE `username` = '$username' AND `goods_id` = '$id'";
}
$res = mysqli_query($con,$sql);

if(!$res){
    dei('数据库连接失败' . mysqli_error($con));
}
print_r(json_encode(array('code'=> "$res",'msg'=> "减少成功")));
?>