<?php

class AdminModel {
    private $db;

    public function __construct (PDO $db)
    {
        $this->db = $db;
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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
            admin_widgets
        WHERE ' . implode(' OR ', $roleClauses) . '
        ORDER BY type, name';

        // prepare statement
        $result = $this->db->prepare($sql);
        $result->execute($params);
        $records = $result->fetchAll(PDO::FETCH_ASSOC);
        if (empty($records)) {
            return [];
        }

        // group output by type
        $output = [];

        foreach ($records as $record) {
            if (!isset($output[$record['type']])) {
                $output[$record['type']] = [];
            }
            $output[$record['type']][] = $record;
        }

        return $output;
    }
}
