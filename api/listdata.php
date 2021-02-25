<?php
$keyvalue = $_POST['keyvalue'];
$gtype = $_POST['gtype'];
$index = $_POST['index'];
$length =$_POST['length'];

$array = array();
$con = mysqli_connect('localhost','root','caonima521','demo2');
if($gtype == 0){
  $sql = "SELECT * FROM `goods` WHERE `key_word` LIKE '%$keyvalue%'";
}
if($gtype == 1){
  $sql = "SELECT * FROM `goods` WHERE `title` LIKE '%$keyvalue%'";
}
if($gtype == 2){
  $sql = "SELECT * FROM `goods` WHERE `seller_name` LIKE '%$keyvalue%'";
}
$res = mysqli_query($con,$sql);
if(!$res){
  die("数据库连接错误");
}
$arr = array();
$row = mysqli_fetch_assoc($res);
while($row){
  array_push($arr,$row);
  $row = mysqli_fetch_assoc($res);
}
$array['total'] = count($arr);
$index = $index-1;
if($index >0){
  $index = $index*$length;
}
$array["list"] = array_slice($arr,$index,$length);
print_r(json_encode($array));

?>