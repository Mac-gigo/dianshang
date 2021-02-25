<?php
$username = $_GET['username'];

$con = mysqli_connect('localhost','root','caonima521','demo2');

$sql = "SELECT *FROM `goods` WHERE `goods_id` in (SELECT `goods_id` FROM `car` WHERE `username` = '$username')";

$res = mysqli_query($con,$sql);

if(!$res){
    die("数据库连接错误".mysqli_error($con));
}
$arr = array();
$row = mysqli_fetch_assoc($res);
while($row){
    array_push($arr,$row);
    $row = mysqli_fetch_assoc($res);
}

$carsql = "SELECT * FROM `car` WHERE `username` = '$username'";
$carres = mysqli_query($con,$carsql);

$car = array();
$carrow = mysqli_fetch_assoc($carres);
while($carrow){
    array_push($car,$carrow);
    $carrow = mysqli_fetch_assoc($carres);
}

for($i = 0;$i <count($arr);$i++){
    for($j = 0;$j< count($car);$j++){
        if($arr[$i]['goods_id'] == $car[$j]['goods_id']){
            $arr[$i]['goods_num'] = $car[$j]['goods_num'];
        }
    }
}
print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>