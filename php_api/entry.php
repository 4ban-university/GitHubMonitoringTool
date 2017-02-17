<?php require_once("sessionfns.php");

    function process(){
        require_once 'vendor/autoload.php';

        $usr = $_POST['username'];
        $pass = $_POST['password'];
      //  setcookie("username",$usr, time() + 600, "/","",1);
       // setcookie("password", $pass, time() + 600,"/","",1);
        
        

        $client = new \Github\Client();

        $user = $client->authenticate($usr,$pass, Github\Client::AUTH_HTTP_PASSWORD);
        
        $_SESSION['username'] = $usr;
        $_SESSION['password'] = $pass;
        
        
        

        $name = $client->currentUser()->show();
        $name = $name['name'];
        $data = array("follows" => $client->currentUser()->follow()->all(),
                "followers" => $client->currentUser()->followers(),
                "stars" => $client->currentUser()->starring(),
                "watching" => $client->currentUser()->subscriptions());

        echo "<p>Hello $name ($usr)". '<br>';
        echo "You follow " . count($data['follows']) . " person/people <br>" .
            "You are followed by " . count($data['followers']) . " person/people <br>" .
            "You have starred " . count($data['stars']) . " repo(s) <br> " .
            "You are watching " . count($data['watching']) . " repo(s) </p>";

       // if(processing == success) {
            //using cookies for name and password


       // echo $_COOKIE['username'];
            header("Location: Entered.php?name=$name&repo=SOEN341-G4&admin=abhandal");
           // exit();
      //  }

    }

    if(empty($_POST['submit'])){
        session_id(md5(time() . rand() . $_SERVER['REMOTE_ADDR']));
        session_start();

        $_SESSION['username'] = "";
        $_SESSION['password'] = "";

        require("FormEntry.php");

    }

    elseif($_POST['submit'] == "Enter"){

        session_start();
        process();
        require("FormEntry.php");
    }

?>
</body>
</html>