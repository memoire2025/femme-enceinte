<?php

namespace App;

class Database {
    protected static $db;

    public function __construct($config) {
        try {
            self::$db = new \PDO(
                "mysql:host={$config['host']};dbname={$config['dbname']}",
                $config['username'],
                $config['password']
            );
            self::$db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            self::$db->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
            self::$db->setAttribute(\PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES utf8mb4");
            
        } catch (\PDOException $e) {
            die("Erreur de connexion : " . $e->getMessage());
        }
    }

    // Méthode pour récupérer un enregistrement par ID
    public static function find($table, $code) {
        $stmt = self::$db->prepare("SELECT * FROM $table WHERE code = :code");
        $stmt->execute(['code' => $code]);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(\PDO::FETCH_ASSOC);
            exit;
        }
        return [];
    }

    public static function findByParamsNoData($table, $params, $data) {
        $stmt = self::$db->prepare("SELECT COUNT(*) FROM $table WHERE $params");
        $stmt->execute($data);
        return $stmt->fetchColumn();
    }

    // Méthode Pour trouver les données par paramètre
    public static function findByParams($table, $params, $data) {
        $stmt = self::$db->prepare("SELECT * FROM $table WHERE $params");
        $stmt->execute($data);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(\PDO::FETCH_ASSOC);
            exit;
        }
        return [];
    }

    // Méthode pour récupérer tous les enregistrements
    public static function all($table) {
        $stmt = self::$db->prepare("SELECT * FROM $table");
        if ($stmt->execute()) {
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
        return [];
    }
    // Méthode pour récupérer une pagination
    public static function paginate($table, $limit, $offset){
        $query = "SELECT * FROM $table LIMIT :limit OFFSET :offset";
        $stmt = self::$db -> prepare($query);
        $stmt -> bindParam(":limit", $limit, \PDO::PARAM_INT);
        $stmt -> bindParam(":offset", $offset, \PDO::PARAM_INT);
        $stmt -> execute();
        if ($stmt -> rowCount() > 0){
            return $stmt -> fetchAll(\PDO::FETCH_ASSOC);
        }
        return [];
    }

    //méthode pour la recherche dans la bdd
    public static function search($table, $columns, $keyword, $field = '*') {
        $query = "SELECT $field FROM $table WHERE $columns LIKE :keyword";
        $stmt = self::$db->prepare($query);
        $stmt->execute(['keyword' => '%'.$keyword.'%']);
        if ($stmt->rowCount() > 0) {
            return $stmt -> fetchAll(\PDO::FETCH_ASSOC);
        }
        return [];
    }

    // Méthode pour supprimer un enregistrement
    public static function delete($table, $code) {
        $stmt = self::$db->prepare("DELETE FROM $table WHERE code = :code");
        $stmt->execute(['code' => $code]);
        return $stmt->rowCount();
    }

    // Méthode pour insérer un enregistrement
    public static function insert($table, $data) {
        $columns = implode(',', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        $stmt = self::$db->prepare("INSERT INTO $table ($columns) VALUES ($placeholders)");
        return $stmt->execute($data);
    }

    // Méthode pour mettre à jour un enregistrement par paramettre
    public static function updateByParam($table, $columns, $params, $data) {

        $query = " UPDATE $table SET $columns WHERE $params";
        $stmt = self::$db->prepare($query);

        if ($stmt->execute(array_values($data))) {
            return $stmt;
        }
        return false;
    }

    // Méthode pour mettre à jour un enregistrement
    public static function updateByCode($table, $data, $code) {
        $columns = '';
        foreach ($data as $key => $value) {
            $columns .= "$key = :$key, ";
        }
        $columns = rtrim($columns, ', ');
        $stmt = self::$db->prepare("UPDATE $table SET $columns WHERE id = :id");
        $data['id'] = $code;
        return $stmt->execute($data);
    }

    public static function getJoinTable($table1, $table2, $on, $dataGet ='*', $condition = '', $data = []){
        $query = "
                    SELECT 
                        $dataGet
                    FROM 
                        $table1
                    INNER JOIN 
                        $table2 
                    ON 
                        $on
                ";
                if (!empty($condition)) {
                    $query .= " WHERE $condition";
                }
                $stmt = self::$db->prepare($query);
                $stmt->execute($data);

                if ($stmt->rowCount() > 0) {
                    return $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    exit;
                }
                return [];
    }

    public static function getJoinTablePaginate($table1, $table2, $on, $dataGet ='*', $order = "", $limit, $offset){
        $query = "
                    SELECT 
                        $dataGet
                    FROM 
                        $table1
                    INNER JOIN 
                        $table2 
                    ON 
                        $on
                    ORDER BY
                        $order
                    LIMIT :limit OFFSET :offset
                ";
            
                $stmt = self::$db->prepare($query);
                $stmt -> bindParam(":limit", $limit, \PDO::PARAM_INT);
                $stmt -> bindParam(":offset", $offset, \PDO::PARAM_INT);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    return $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    exit;
                }
                return [];
    }

}

