<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
date_default_timezone_set('UTC');
require __DIR__ . '/../vendor/autoload.php';
(new Opine\Framework())->frontController();
