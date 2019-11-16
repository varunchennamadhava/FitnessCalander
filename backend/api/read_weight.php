<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$weight_table = [];
$sql = "SELECT * FROM weight_table";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $weight_table[$i]['weight_id']    = $row['weight_id'];
    $weight_table[$i]['weight'] = $row['weight'];
    $weight_table[$i]['height'] = $row['height'];
    $weight_table[$i]['timestamp'] = $row['timestamp'];
    $weight_table[$i]['user_id'] = $row['user_id'];
    $i++;
  }

  echo json_encode($weight_table);
}
else
{
  http_response_code(404);
}
