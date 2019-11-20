<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PASS', 'ekineohs1');
define('DB_NAME', 'mydb');
/*
"hi<br />
<b>Warning</b>:  mysqli_connect(): (HY000/2002):
No such file or directory in
 <b>/Users/varunchennamadhava/Desktop/FitnessCalander/backend/api/database.php</b> on
 line <b>15</b><br />
Failed to connect:No such file or directory"



"hi<br />
<b>Warning</b>:  mysqli_connect():
The server requested authentication method unknown to the client [caching_sha2_password] in <b>
/Users/varunchennamadhava/Desktop/FitnessCalander/backend/api/database.php</b> on line <b>22</b><br />
<br />
<b>Warning</b>:  mysqli_connect():
(HY000/2054): The server requested authentication method unknown to the client in
<b>/Users/varunchennamadhava/Desktop/FitnessCalander/backend/api/database.php</b> on line
<b>22</b><br />
Failed to connect:The server requested authentication method unknown to the client"

php client encryption



SyntaxError: Unexpected token h in JSON at position 0
    at JSON.parse (<anonymous>)
    at XMLHttpRequest.onLoad (http://localhost:4200/vendor.js:34668:51)
    at ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:3240:31)
    at Object.onInvokeTask (http://localhost:4200/vendor.js:93176:33)
    at ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:3239:60)
    at Zone.runTask (http://localhost:4200/polyfills.js:3017:47)
    at ZoneTask.invokeTask [as invoke] (http://localhost:4200/polyfills.js:3314:34)
    at invokeTask (http://localhost:4200/polyfills.js:4452:14)
    at XMLHttpRequest.globalZoneAwareCallback (http://localhost:4200/polyfills.js:4489:21)











*/

function connect()
{
  $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}




$con = connect();
