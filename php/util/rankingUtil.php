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

    function showLevel($seed)
    {
        global $FireEmblemDB;
        //Verifico se il livello è già presente nel database
        $query = 'SELECT * '
                .'FROM `level` '
                .'WHERE seed = "' . $seed . '"';

        $result = $FireEmblemDB->performQuery($query);

        $FireEmblemDB->closeConnection();
        
        return $result;
    }

    function insertLevel($seed)
    {
        global $FireEmblemDB;

        $query = "INSERT INTO `level` "
            ."Values ('" . $seed .  "')";

        $result = $FireEmblemDB->performQuery($query);

        checkResult($result, $query);

        $FireEmblemDB->closeConnection();
        
        return $result;
    }

    function updateRanking($username, $seed, $win, $score, $turns)
    {
        global $FireEmblemDB;

        $query = "INSERT INTO `game` "
            ."Values ('" . $username . "', '" . $seed . "', '" . $win . "', '" . $score . "', '" . $turns . "', " . "CURRENT_TIMESTAMP()" . " );" ;
        
        $result = $FireEmblemDB->performQuery($query);
        
        checkResult($result, $query);

        $FireEmblemDB->closeConnection();
        
        return $result;
    }

    function showRanking()
    {
        global $FireEmblemDB;

        $query = "SELECT * "
                ."FROM game "
                ."ORDER BY score DESC, date";
                
        $result = $FireEmblemDB->performQuery($query);

        $FireEmblemDB->closeConnection();
        
        return $result;
    }
?>