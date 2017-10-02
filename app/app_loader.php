<?php
$base = __DIR__ . '/../app/';

$folders = [
    'lib',
    'model',
    'route'
];

//Autoload all the php in the folders lib , model and route
foreach($folders as $f)
{
    foreach (glob($base . "$f/*.php") as $filename)
    {
        require $filename;
    }
}