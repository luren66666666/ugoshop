<?php
//读懂php文件。
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

$pagesize = 12; //单个页面展示的数据条数，自由设置

$sql = "select * from ugoshoplist"; //获取所有的数据

$result = $conn->query($sql); //获取数据的结果集(记录集)

$num = $result->num_rows; //记录集的总条数  60

$pagenum = ceil($num / $pagesize); //获取页数  向上取整  5


//获取前端的传来的页面，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//接收传入的页面
    $pagevalue = $_GET['page'];
} else {//没有传入页码，页码为1.
    $pagevalue = 1;
}

//偏移量(截取数据库数据)的索引
//$pagesize = 10; //单个页面展示的数据条数，自由设置
$page = ($pagevalue - 1) * $pagesize;

//limit
//limit接收一个或者两个数字参数(整数)
//参1：数据开始位置的索引(从0开始)，偏移量
//参2：返回的记录集数目。
//select * from taobaogoods limit 0 , 10  从偏移量0开始 取10条
//limit 10,10  从偏移量10开始 取10条
//limit 20,10 从偏移量20开始  取10条

$sql1 = "select * from ugoshoplist limit $page,$pagesize";
$res = $conn->query($sql1);


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口

//http://10.31.163.32/ugoshop/php/listdata.php
