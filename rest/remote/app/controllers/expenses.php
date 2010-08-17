<?php
/**
 * @class Expenses
 * A simple application controller extension
 */
class Expenses extends ApplicationController {
	
    /**
     * view
     * Retrieves rows from database.
     */
    public function view() {
		
		return Expense::all();
	
    }

    /**
     * create
     */
    public function create() {

        $res = new Response();
		$rec = Expense::create($this->params);

		echo "{\"items\": []}";
		
		return;
		
        $rec = Expense::create($this->params);
        if ($rec) {
            $res->success = true;
            $res->message = "Created new User" . $rec->id;
            $res->data = $rec->to_hash();
        } else {
            $res->message = "Failed to create User";
        }
        return $res->to_json();
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

