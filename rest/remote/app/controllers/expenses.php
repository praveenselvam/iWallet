<?php
/**
 * @class Expenses
 * A simple application controller extension
 */
class Expenses extends ApplicationController {
	
	const APP_ERROR_DIR = '../errors.log';
	
    /**
     * view
     * Retrieves rows from database.
     */
    public function view() {
	
		$i = new Expense();
		return $i->all();
	
    }

    /**
     * create
     */
    public function create() {
		echo "{\"items\": []}";
		error_log("create", 3, self::APP_ERROR_DIR); 
    }

    /**
     * update
     */
    public function update() {
		echo "{\"items\": []}";
    }

    /**
     * destroy
     */
    public function destroy() {
		echo "{\"items\": []}";
    }
}

