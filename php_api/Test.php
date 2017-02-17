<!DOCTYPE HTML>
<Html>
<header>
    <title>Hey
    </title>
</header>
<body>
    <?php

    require_once 'vendor/autoload.php';

    $client = new \Github\Client();

    $user = $client->authenticate('CharlesPhilippeLabbe','1maisondu', Github\Client::AUTH_HTTP_PASSWORD);

    $s = $client->api('repo')->statistics('abhandal','SOEN341-G4');
    $ns = array_keys($s[0]);
    foreach($ns as $i)
        echo($i . '<br>');
//echo $s;
    foreach($s as $i)
        foreach($i as $j)
         echo $j. '<br>';
    ?>
</body>
</Html>
