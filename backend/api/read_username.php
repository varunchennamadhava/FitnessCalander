<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
$user_table = [];
$sql = "SELECT user_table.username, user_table.user_id FROM user_table where user_id  ={$id} ";


if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $user_table[$i]['user_id']    = $row['user_id'];
    $user_table[$i]['username'] = $row['username'];
    $i++;
  }

  echo json_encode($user_table);
}
else
{
  http_response_code(404);
}
