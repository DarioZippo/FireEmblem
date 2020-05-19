<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "FireEmblemDBManager.php";

    function addCoins($username, $reward)
    {
        global $FireEmblemDB;

        $query = "UPDATE user "
                ."SET coins = coins + " . $reward
                ." WHERE username = " . "'" . $username . "'";
        $result = $FireEmblemDB->performQuery($query);

        $FireEmblemDB->closeConnection();

        return $result;
    }

    function updateRanking($username, $seed, $win, $score, $turns)
    {
        global $FireEmblemDB;

        $query = "INSERT INTO `level` "
                ."Values ('" . $seed .  "'); "
                ."INSERT INTO `game` "
                ."Values ('" . $username . "', '" . $seed . "', '" . $win . "', '" . $score . "', '" . $turns . "', " . "CURRENT_TIMESTAMP()" . " );" ;
                
        $result = $FireEmblemDB->performMultiQuery($query);

        $FireEmblemDB->closeConnection();
        
        return $result;
    }
?>