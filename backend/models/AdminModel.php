<?php

class AdminModel {
    private $db;

    public function __construct (PDO $db)
    {
        $this->db = $db;
    }

    public function getUserWidgets (int $userId, array $roleIds) : array
    {
        return ['a'];
    }
}
