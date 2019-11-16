<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$calorie_table = [];
$sql = "SELECT * FROM calorie_table";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $calorie_table[$i]['calorie_id']    = $row['calorie_id'];
    $calorie_table[$i]['extreme'] = $row['extreme'];
    $calorie_table[$i]['mild'] = $row['mild'];
    $calorie_table[$i]['no_loss'] = $row['no_loss'];
    $calorie_table[$i]['user_id'] = $row['user_id'];
    $i++;
  }

  echo json_encode($calorie_table);
}
else
{
  http_response_code(404);
}
