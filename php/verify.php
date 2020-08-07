<?php
include "conn.php";
//验证手机号和密码是否正确
if(isset($_GET['tel']) && isset($_GET['password'])){
    $tel = $_GET['tel'];
    $password = $_GET['password'];
    $result = $conn->query("select * from userinfo where tel = '$tel' and password = '$password'");
    if($result->fetch_assoc()){
        echo 1;//验证成功，可以登录
    }else {
        echo 2;
    }
}
//http://localhost/ugoshop/php/verify.php