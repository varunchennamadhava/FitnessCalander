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
  if((float)$request->weight < 0 || (float)$request->height < 0)
  {
    return http_response_code(400);
  }

  // Sanitize.
  $weight = mysqli_real_escape_string($con, trim((float)$request->weight));
  $height = mysqli_real_escape_string($con, trim((float)$request->height));
  $timestamp= mysqli_real_escape_string($con, trim($request->timestamp));



  // Create.
  $sql = "INSERT INTO `weight_table`(`weight_id`,`weight`,`height`,`timestamp`,`user_id`) VALUES (null,'{$weight}','{$height}','{$timestamp}', {$id})";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $weight_table = [
      'weight' => $weight,
      'height' => $height,
      'timestamp' => $timestamp,
      'user_id' => $id,
      'weight_id'    => mysqli_insert_id($con)
    ];
    echo json_encode($weight_table);
  }
  else
  {
    http_response_code(422);
  }
}
