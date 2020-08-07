<?php
include "conn.php";
//验证手机号是否重复
if(isset($_GET['tel'])){
    $tel = $_GET['tel'];
    $result = $conn->query("select * from userinfo where tel = '$tel' ");
    if($result->fetch_assoc()){
        echo 2;//手机号重复
    }else {
        echo 1;
    }
}
//http://localhost/ugoshop/php/enterVe.php