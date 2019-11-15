<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if(trim($request->username) === '' || trim($request->birthday) === '' || trim($request->height) === '' || trim($request->gender) === '') {
    return http_response_code(400);
  }

  // Sanitize.
  $id = mysqli_real_escape_string($con, (int)$request->id);
  $username = mysqli_real_escape_string($con, trim($request->username));
  $birthday = mysqli_real_escape_string($con, trim($request->birthday));
  $height = mysqli_real_escape_string($con, trim($request->height));
  $gender = mysqli_real_escape_string($con, trim($request->gender));

  // Update.
  $sql = "UPDATE `user_table` SET `username`='$username',`birthday`='$birthday',`height`='$height',`gender`='$gender' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }
}
