<?php
include "conn.php";
//将注册的用户信息存入数据库
if(isset($_GET['tel']) && isset($_GET['password'])){
    $tel = $_GET['tel'];
    $password = $_GET['password'];
    $conn->query("insert userinfo values(null,'$tel','$password')");
    //页面跳转
    //header('');
}
//http://localhost/ugoshop/php/register.php