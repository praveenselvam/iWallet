<?php
/**
 * @class Logger
 */

class Logger {

	const APP_ERROR_DIR = '../errors.log';
	
    public function log_message($message) {
		error_log("\n" . $message, 3, self::APP_ERROR_DIR);
	}
}

?>