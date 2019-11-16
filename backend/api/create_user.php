<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->username) === '' || trim($request->birthday) === '' || trim($request->gender) === '')
  {
    return http_response_code(400);
  }

  // Sanitize.
  $username = mysqli_real_escape_string($con, trim($request->username));
  $birthday = mysqli_real_escape_string($con, trim($request->birthday));
  $gender = mysqli_real_escape_string($con, trim($request->gender));


  // Create.
  $sql = "INSERT INTO `user_table`(`user_id`,`username`,`birthday`,`gender`) VALUES (null,'{$username}','{$birthday}','{$gender}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user_table = [
      'username' => $username,
      'birthday' => $birthday,
      'gender' => $gender,
      'user_id'    => mysqli_insert_id($con)
    ];
    echo json_encode($user_table);
  }
  else
  {
    http_response_code(422);
  }
}
