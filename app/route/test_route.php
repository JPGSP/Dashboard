<?php

use App\Model\TestModel;

//route to add more data to the model test in our database.
//$app->post("/new_records/", function($request, $response, $args){
$app->post("/new_records/", function($request){
		//print_r($request->getParsedBody());
		//$column1 = json_encode($request->getParsedBody());
		$parameterByArray = $request->getParsedBody();
		$parameterToWork = json_decode($parameterByArray['add_row']);

		if (is_int($parameterToWork)){
			$t = new TestModel();
			$t->insertRandomRows($parameterToWork);
			echo "OK";
			json_encode("OK");
		}
		else{
			echo "ERROR";
			json_encode("ERROR");
		}
});

//route to get all the data of the model test in our database.
$app->get('/all_data/',function(){
	$t = new TestModel();
	echo json_encode($t->getAll());
});

//route to get the data ofthe model test in our database inside a particular time.
$app->get('/data_time_slot/{from}/{to}', function ($request, $response, $args) {
   
   	$first_parameter = $args['from'];
	$second_parameter = $args['to'];

	if ($first_parameter>$second_parameter)
		echo json_encode("ERROR");
	else
		{
		$t = new TestModel();
		echo json_encode($t->getBetween($first_parameter,$second_parameter));
		}
});

//route to get the data of the model test in our database from a particular time.
$app->get('/data_from/{from}', function ($request, $response, $args) {   
   	$first_parameter = $args['from'];
	$t = new TestModel();
	echo json_encode($t->getDataSince($first_parameter));
});

//route to get the average value of a column for the model test in our database inside a particular time.
$app->get('/average_data_time_slot/{column}/{fr}/{tt}', function ($request, $response, $args) {   
   	$first_parameter = $args['column'];
   	$second_parameter = $args['fr'];
   	$third_parameter = $args['tt'];

   	if ($second_parameter>$third_parameter)
		echo json_encode("ERROR");

	$t = new TestModel();
	echo json_encode($t->getAVGDataInColumnSlotTime($first_parameter,$second_parameter,$third_parameter));

});

//route to get the max value of a column for the model test in our database inside a particular time.
$app->get('/max_data_time_slot/{column}/{fr}/{tt}', function ($request, $response, $args) {   
   	$first_parameter = $args['column'];
   	$second_parameter = $args['fr'];
   	$third_parameter = $args['tt'];

   	if ($second_parameter>$third_parameter)
		echo json_encode("ERROR");

	$t = new TestModel();
	echo json_encode($t->getMaxDataInColumnSlotTime($first_parameter,$second_parameter,$third_parameter));

});

//route to get the min value of a column for the model test in our database inside a particular time.
$app->get('/min_data_time_slot/{column}/{fr}/{tt}', function ($request, $response, $args) {   
   	$first_parameter = $args['column'];
   	$second_parameter = $args['fr'];
   	$third_parameter = $args['tt'];

   	if ($second_parameter>$third_parameter)
		echo json_encode("ERROR");

	$t = new TestModel();
	echo json_encode($t->getMinDataInColumnSlotTime($first_parameter,$second_parameter,$third_parameter));

});