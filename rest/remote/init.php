<?php
    session_start();

    // base framework
    require(dirname(__FILE__).'/lib/logger.php');
    require(dirname(__FILE__).'/lib/mysql_db.php');
    require(dirname(__FILE__).'/lib/session_db.php');
    require(dirname(__FILE__).'/lib/application_controller.php');
    require(dirname(__FILE__).'/lib/model.php');
    require(dirname(__FILE__).'/lib/request.php');
    require(dirname(__FILE__).'/lib/response.php');

    // require /models (Should iterate app/models and auto-include all files there)
    require(dirname(__FILE__).'/app/models/expense.php');
	
	$logger = new Logger();
	
    // Fake a database connection using _SESSION
    $dbh = new SessionDB();
	$mdb = new MySQLDB();


