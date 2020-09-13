<?php
	if(isset($_POST['submit'])){
		$name=$_POST['name'];
		$origen=$_POST['origen'];
		$destino=$_POST['destino'];
		$peso=$_POST['peso'];
		$kilos=$_POST['kilos'];
		$valordeclarado=$_POST['valordeclarado'];
		$email=$_POST['email'];
		$phone=$_POST['phone'];
		$msg=$_POST['msg'];

		$to='alexxis2233@gmail.com'; // Receiver Email ID, Replace with your email ID
		$subject='Solicitud de cotización';
		$message="Ha recibido una solicitud de cotización de :".$name."\n"."Phone :".$phone."\n".
		"Localidad de origen :".$origen."\n"."Localidad de destino :".$destino."\n"."Detalles de la carga:".$peso."\n"."Kilos :".$kilos."\n".
		"Valor declarado para el seguro :".$valordeclarado."\n"."Correo electrónico :".$email."\n".;
		$headers="De: ".$email;

		if(mail($to, $subject, $message, $headers)){
			echo "<h1>Mensaje enviado correctamente! Gracias por solicitar la cotización, Te contestaremos a la brevedad!</h1>";
		}
		else{
			echo "Algo salió mal!";
		}
	}
?>