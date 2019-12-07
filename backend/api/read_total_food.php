<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
$food_table = [];
$sql = "SELECT timestamp, sum(food_calories) FROM food_table WHERE user_id = {$id} group by timestamp order by timestamp asc;
";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $food_table[$i]['timestamp'] = $row['timestamp'];
    $food_table[$i]['sum'] = $row['sum(food_calories)'];
    $i++;
  }

  echo json_encode($food_table);
}
else
{
  http_response_code(404);
}
