<?php

	foreach($_GET as $name => $value) {
		print "$name : $value<br>";
	}

	foreach($_POST as $name => $value) {
		print "$name : $value<br>";
	}

?>