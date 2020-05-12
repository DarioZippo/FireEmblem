<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "FireEmblemDBManager.php";

	function showStore()
	{
		global $FireEmblemDB;

		$query = "SELECT * "
				."FROM item "
				/*."ORDER BY type"*/;

		$result = $FireEmblemDB->performQuery($query);

		$FireEmblemDB->CloseConnection();
		return $result;
	}

?>
