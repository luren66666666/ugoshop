<?php
//1.设置字符编码
header('content-type:text/html;charset=utf-8');

//2.数据库连接
define('HOST', 'localhost'); //主机名
define('USERNAME', 'root'); //用户名
define('PASSWORD', 'root'); //密码，如果没有密码，直接设为空define('PASSWORD', '');
define('DBNAME', 'ugoshop'); //数据库的名称
$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if ($conn->connect_error) {
    die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
}

$conn->query('SET NAMES UTF8');
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
//http://10.31.163.32/ugoshop/php/verify.php