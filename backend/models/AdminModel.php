<?php

class AdminModel {
    private $db;

    public function __construct (PDO $db)
    {
        $this->db = $db;
    }

    public function getUserWidgets (int $userId, array $roleIds) : array
    {
        // integer array queries can be tricky
        $roleClauses = [];
        $params = [];
        foreach ($roleIds as $roleId) {
            $roleClauses[] = ':roleId' . $roleId . ' = ANY(role_ids)';
            $params[':roleId' . $roleId] = $roleId;
        }

        // build SQL dynamically
        $sql = 'SELECT
            *
        FROM
            widgets
        WHERE ' . implode(' OR ', $roleClauses);

        // prepare statement
        $result = $this->db->prepare($sql);
        $result->execute($params);
        $records = $result->fetchAll(PDO::FETCH_ASSOC);
        if (empty($records)) {
            return [];
        }
        return $records;
    }
}
