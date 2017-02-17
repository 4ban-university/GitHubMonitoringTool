<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Entry</title>
    <h1>Enter GitHub information</h1>
</head>
<br>
<form method="post" action="">
<label>Username: <input type="text" name="username" size="30"/></label><br>
<label>Password: <input type="password" name="password"/></label><br>
<input type="submit" name="submit" value="Enter"/>
</form>

<?php
    $usr = $_SESSION['username'];
    $pass = $_SESSION['password'];


?>

<p>DISCLAIMER: This might not be a secure form.</p>

