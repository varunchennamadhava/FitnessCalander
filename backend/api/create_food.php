<?php
require 'database.php';

// Get the posted data.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->foodName) === '' || (float)$request->foodCalories < 0)
  {
    return http_response_code(400);
  }

  // Sanitize.
  $foodName = mysqli_real_escape_string($con, trim($request->foodName));
  $foodCalories = mysqli_real_escape_string($con, trim((int)$request->foodCalories));
  $timestamp= mysqli_real_escape_string($con, trim($request->timestamp));



  // Create.
  $sql = "INSERT INTO `food_table`(`food_id`,`food_name`,`food_calories`,`timestamp`,`user_id`) VALUES (null,'{$foodName}','{$foodCalories}','{$timestamp}', {$id})";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $food_table = [
      'food_name' => $foodName,
      'food_calories' => $foodCalories,
      'timestamp' => $timestamp,
      'user_id' => $id,
      'food_id'    => mysqli_insert_id($con)
    ];
    echo json_encode($food_table);
  }
  else
  {
    http_response_code(422);
  }
}
