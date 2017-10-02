<?php
namespace App\Lib;

use PDO;

//Class connect to the database
class Database
{

    private $location = "127.0.0.1";
    private $user = "root";
    private $pwd = "password";
    private $db = "sky";

    public static function start()
    {

        $pdo = new PDO('mysql:host=127.0.0.1;dbname=sky;charset=utf8', 'root', 'password');        
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);        
        return $pdo;
    }
}