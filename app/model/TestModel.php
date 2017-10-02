<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Generate;

class TestModel
{    
    private $db;
    private $tableName;

    //Connection to a specific table of a our database
    public function __construct() {
    	$this->tableName = "Test";
        $this->db = Database::start();
    } 

    //Insert the rows specific by parameter with randowm value for the columns
    public function insertRandomRows($totalRowsToInsert){

    	$response;

		while ($totalRowsToInsert>0)
		{
	  		$column1 = Generate::randomTimestamp();
    	  	$column2 = Generate::randomFloatBetween(0,100);
    	  	$column3 = Generate::randomIntegerBetween(1,500000);

	  		$queryToAdd .= "INSERT INTO $this->tableName (timestamp, cpu_load, concurrency) VALUES (".$column1.", ".$column2.", ".$column3.");";
	  		$totalRowsToInsert--;
    	}
    	  	
	  	$stm = $this->db->prepare($queryToAdd);
		$stm->execute();
		$response = "OK";
		  
    	echo $response;
    	return json_encode($response);	
    }
    
    //Return the content of this model
    public function getAll()
    {
    	try
		{
			$stm = $this->db->prepare("SELECT * FROM $this->tableName ORDER BY timestamp ASC");
			$stm->execute();
			return $stm->fetchAll();
		}
		catch(Exception $e)
		{
			return $e->getMessage();
		}
    }
   
    //Return data between a range of time
    public function getBetween($from, $to)
    {
    	try
		{
			$sql = "SELECT * FROM $this->tableName WHERE timestamp<=$to AND timestamp>=$from ORDER BY timestamp ASC";
			$stm = $this->db->prepare($sql);
			$stm->execute();
			return $stm->fetchAll();
		}
		catch(Exception $e)
		{
			return $e->getMessage();
		}
    }

    //Return data between a since on particular time until now
    public function getDataSince($from)
    {
    	
    	try
		{
			$sql = "SELECT * FROM $this->tableName WHERE timestamp >= ".$from." ORDER BY timestamp ASC";
			$stm = $this->db->prepare($sql);
			$stm->execute();
			return $stm->fetchAll();
		}
		catch(Exception $e)
		{
			return $e->getMessage();
		}
    }

    //Return the average value of a column inside a time slot
    public function getAVGDataInColumnSlotTime($column,$from,$to)
    {
    	try
		{
			$sql = "SELECT AVG($column) FROM $this->tableName WHERE timestamp<=$to AND timestamp>=$from";
			$stm = $this->db->prepare($sql);
			$stm->execute();
			return $stm->fetchAll();
		}
		catch(Exception $e)
		{
			return $e->getMessage();
		}
    }

    //Return the max value of a column inside a time slot
    public function getMaxDataInColumnSlotTime($column,$from,$to)
    {
    	try
		{
			$sql = "SELECT MAX($column) FROM $this->tableName WHERE timestamp<=$to AND timestamp>=$from";
			$stm = $this->db->prepare($sql);
			$stm->execute();
			return $stm->fetchAll();
		}
		catch(Exception $e)
		{
			return $e->getMessage();
		}
    }

    //Return the min value of a column inside a time slot
    public function getMinDataInColumnSlotTime($column,$from,$to)
    {
    	try
		{
			$sql = "SELECT MIN($column) FROM $this->tableName WHERE timestamp<=$to AND timestamp>=$from";
			$stm = $this->db->prepare($sql);
			$stm->execute();
			return $stm->fetchAll();
		}
		catch(Exception $e)
		{
			return $e->getMessage();
		}
    }
}
