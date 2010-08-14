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
	?>
	{
		"items": [{
			"description": "Pizza", 
			"price":"450.00", 
			"sharing": "2", 
			"date": "2010-08-14"
		},
		{
			"description": "Dinner", 
			"price":"300.00", 
			"sharing": "3", 
			"date": "2010-08-12"
		},
		{
			"description": "Mangoes", 
			"price":"50.00", 
			"sharing": "1", 
			"date": "2010-08-14"
		}]
	}
	<?php
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

