<?php

namespace App\Lib;

//Class to generate randowm data
class Generate
{
	public static function randomFloatBetween($minimum, $maximum)
	{
		//if ($minimum > $maximum)
		//	return -1;
		$randomFloat = $minimum + mt_rand() / mt_getrandmax() * ($maximum - $minimum);
		return round($randomFloat, 2);
	}

	public static function randomIntegerBetween($minimum, $maximum)
	{
		//if ($minimum > $maximum)
		//	return -1;
		return rand($minimum, $maximum);
	}

	public static function randomTimestamp()
	{
		$numberMinutes = self::randomIntegerBetween(1,5);
		$currentDate = date("Y-m-d H:i:s");
		$dateTimestamp = strtotime($currentDate);
		$dateTimestamp = $dateTimestamp - ($numberMinutes * 60);
		//return date("Y-m-d H:i:s", $dateTimestamp);	
		return $dateTimestamp;
	}

}
