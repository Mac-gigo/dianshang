<?php
$con = mysqli_connect('localhost','root','caonima521','demo2');

$sql = "SELECT * FROM `goods`";

$res = mysqli_query($con,$sql);

if(!$res){
  die("数据库链接错误");
}
$arr = array();
$row = mysqli_fetch_assoc($res);
while($row){
  array_push($arr,$row);
  $row = mysqli_fetch_assoc($res);
}
print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>