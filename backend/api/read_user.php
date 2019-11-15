<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$user_table = [];
$sql = "SELECT * FROM user_table";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $user_table[$i]['id']    = $row['id'];
    $user_table[$i]['username'] = $row['username'];
    $user_table[$i]['birthday'] = $row['birthday'];
    $user_table[$i]['height'] = $row['height'];
    $user_table[$i]['gender'] = $row['gender'];
    $i++;
  }

  echo json_encode($user_table);
}
else
{
  http_response_code(404);
}
