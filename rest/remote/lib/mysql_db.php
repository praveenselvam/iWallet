<?php
 /**
 * @class MySQLDB
 */
class MySQLDB {
	
    public function __construct() {
    
		$user="root";
		$password="p@ssw0rd";
		$database="iWallet";
		mysql_connect('127.0.0.1',$user,$password);
		@mysql_select_db($database) or die("Unable to select database");
		
		//	Looks like PHP closes the DB connection when the script execution is over.
		//	http://www.phpfreaks.com/forums/index.php?topic=237633.0
		//mysql_close();
    }

	public function all(){
		
		$query="SELECT * FROM ExpenseItems ORDER BY eitem_date DESC, eitem_ID DESC";
		$result=mysql_query($query);
		$num=mysql_numrows($result);

		$x = '{"items":[';
		$is_first = true;
		$i=0;
		while ($i < $num) {

			$id 		= mysql_result($result,$i,"eitem_id");
			$desc	 	= mysql_result($result,$i,"eitem_desc");
			$price		= mysql_result($result,$i,"eitem_price");
			$sharing	= mysql_result($result,$i,"eitem_sharing");
			$date		= mysql_result($result,$i,"eitem_date");
			
			if(!$is_first) $x = $x . ', ';
			$x = $x . '{
				"id":			"'. $id . '",
				"description":	"'. $desc . '",
				"price":		"' . $price . '", 
				"sharing":		"' . $sharing . '", 
				"date":			"' . $date . '"
			}';
			$is_first = false;
			$i++;
		}
		$x = $x . ']}';
		
		return $x;
		
	}
	
    public function insert($records) {
		foreach ($records as &$rec) {
			$query="INSERT INTO ExpenseItems (`user_id`, `eitem_desc`, `eitem_price`, `eitem_sharing`, `eitem_date`) VALUES (1, '" . $rec->description . "', " . $rec->price . ", " . $rec->price . ", '" . $rec->date . "')";
			global $logger;
			$logger->log_message($query);
			$result=mysql_query($query);
			$logger->log_message('RESULT: ' . $result);
		}
    }
    
	/*
	// fake a database pk
    public function pk() {
        return $_SESSION['pk']++;
    }
    // fake a resultset
    public function rs() {
        return $_SESSION['rs'];
    }
    public function insert($rec) {
        array_push($_SESSION['rs'], $rec);
    }
    public function update($idx, $attributes) {
        $_SESSION['rs'][$idx] = $attributes;
    }
    public function destroy($idx) {
        return array_shift(array_splice($_SESSION['rs'], $idx, 1));
    }*/
}