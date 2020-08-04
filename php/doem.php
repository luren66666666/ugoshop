<?php
//1.输出接口(简单接口，复杂接口)

// 设置字符编码。
header('content-type:text/html;charset=utf-8');
//利用php操作数据库
//1.连接数据库 - mysqli类
// new mysqli(主机名,用户名,密码,数据库的名称);

define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','root');//密码
define('DBNAME','ugoshop');//数据库的名称

$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
//@:容错处理，让错误信息不显示。
if($conn->connect_error){//如果上面的数据库连接出错，显示下面的错误。
    die('数据库连接失败'.$conn->connect_error);
}
$result_home = $conn->query("select * from ugoshophome");
$result_list = $conn->query("select * from ugoshoplist");

$home = array();
$list = array();

for($i=0;$i<$result_home->num_rows;$i++){
    $home[$i] = $result_home->fetch_assoc();
}
for($i=0;$i<$result_list ->num_rows;$i++){
    $list [$i] = $result_list ->fetch_assoc();
}
class data{

}
$d1 = new data();
$d1->arr1 = $home;
$d1->arr2 = $list ;
// echo $d1; //必须转成JSON格式才能生成接口

echo json_encode($d1);

//http://localhost/ugoshop/php/doem.php


