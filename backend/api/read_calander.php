<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
$calander_table = [];
$sql = "SELECT food_table.food_calories, food_table.timestamp, weight_table.weight, weight_table.height, weight_table.timestamp FROM food_table JOIN weight_table ON food_table.timestamp = weight_table.timestamp WHERE food_table.user_id  ={$id} ";


if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $calander_table[$i]['foodCalories']    = $row['food_calories'];
    $calander_table[$i]['foodTimestamp'] = $row['timestamp'];
    $calander_table[$i]['weight'] = $row['weight'];
    $calander_table[$i]['height'] = $row['height'];
    $calander_table[$i]['weightTimestamp'] = $row['timestamp'];
    $i++;
  }

  echo json_encode($calander_table);
}
else
{
  http_response_code(404);
}
