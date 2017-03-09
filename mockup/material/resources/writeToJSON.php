<?php

if (isset($_POST["write"]) && !empty($_POST["write"])) { //Checks if action value exists
    $data = $_POST["write"];
    writeToJSON($data);
}



function writeToJSON($repo_arr) {
    
//    $json = file_get_contents('userRepoSelection.json');
//    $json_data = json_decode($json,true);
    $newarr = array('repoSelection' => array());
    
//    foreach ($json_data['repoSelection'] as $key => $jsons) {
//         foreach($jsons as $key => $value) {
//             echo $key . " : " . $value;
//        }
//    }
    
    foreach ($repo_arr as $v) {
        array_push($newarr['repoSelection'], array('name' => $v));
    }


    //saving data in Players object...
    

    $json = json_encode($newarr);

    file_put_contents('userRepoSelection.json', $json);
    }

?>