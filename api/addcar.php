<?php
$good_id = $_GET['goods_id'];
$username = $_GET['username'];

$con = mysqli_connect('localhost','root','caonima521','demo2');

$sql = "SELECT * FROM `car` WHERE `userName` = '$username' AND `goods_id` = '$good_id'";

$res = mysqli_query($con,$sql);

if(!$res){
    die('数据库链接错误' . mysqli_error($con));
}
$row = mysqli_fetch_assoc($res);

if(!$row){
    $addsql = "INSERT INTO `car` VALUES (null,'$username','$good_id','1')";

    $addres = mysqli_query($con,$addsql);
    print_r(json_encode(array('code'=>$addres,'msg'=>'添加成功'),JSON_UNESCAPED_UNICODE));
}else{
    $num = ++$row['goods_num'];
    $updata = "UPDATE `car` SET `goods_num` = '$num' WHERE `userName` = '$username' AND `goods_id` = '$good_id'";

    $upres = mysqli_query($con,$updata);

    print_r(json_encode(array('code'=> $upres,'msg'=>"添加成功")));
}
?>