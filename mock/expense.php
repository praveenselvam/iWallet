{
	"items": [{
		"description": "Pizza", 
		"price":"450.00", 
		"sharing": "2", 
		"date": "2010-08-14",
		"test": "<?php
		
			/*foreach ( $post_data as $key => $value) 
			{
				$post_items[] = $key . '=' . $value;
			}*/
			//$post_string = implode ('&', $post_items);
			echo $_REQUEST['data'];
		?>"
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