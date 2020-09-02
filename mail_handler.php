<?php
	if(isset($_POST['submit'])){
		$name=$_POST['name'];
		$email=$_POST['email'];
		$phone=$_POST['phone'];
		$msg=$_POST['msg'];

		$to='alexxis2233@gmail.com'; // Receiver Email ID, Replace with your email ID
		$subject='Contacto';
		$message="Nombre :".$name."\n"."Phone :".$phone."\n"."Escribió lo siguiente :"."\n\n".$msg;
		$headers="De: ".$email;

		if(mail($to, $subject, $message, $headers)){
			echo "<h1>Mensaje enviado correctamente! Gracias"." ".$name.", Te contestaremos a la brevedad!</h1>";
		}
		else{
			echo "Algo salió mal!";
		}
	}
?>