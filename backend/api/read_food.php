<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$food_table = [];
$sql = "SELECT * FROM food_table";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $food_table[$i]['food_id']    = $row['food_id'];
    $food_table[$i]['food_name'] = $row['food_name'];
    $food_table[$i]['food_calorie'] = $row['food_calorie'];
    $food_table[$i]['timestamp'] = $row['timestamp'];
    $food_table[$i]['user_id'] = $row['user_id'];
    $i++;
  }

  echo json_encode($food_table);
}
else
{
  http_response_code(404);
}