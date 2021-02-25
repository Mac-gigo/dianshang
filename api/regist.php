<?php
$username = $_GET['username'];
$password = $_GET['password'];

$con = mysqli_connect('localhost','root','caonima521','demo2');

$sql = "INSERT INTO `user` (`username`, `password`, `user_id`) VALUES ('$username', '$password', NULL)";

$res = mysqli_query($con,$sql);

if(!$res){
  die('usererror');
}
?>