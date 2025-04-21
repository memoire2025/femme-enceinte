<?php

namespace App;
class Personnel extends Database {

    protected static $table = 'personnel';
    private static $user_name;
    private static $mdp;
    private static $role;
    private static $sexe;
    
    private static $config;

    public function __construct($user_name = null, $mdp = null, $role = null, $sexe = null) {

        self::$user_name = $user_name;
        self::$mdp = $mdp;
        self::$role = $role;
        self::$sexe = $sexe;

        self::$config = (ConfigDB::getInstance())->getConfig();

        parent::__construct(self::$config);

    }

    public static function getAll() {
        return self::all(self::$table);
    }

    public static function exist (){

        $params = 'username = :username';
        $data = [
            'username' => self::$user_name
        ];
        return self::findByParams(self::$table, $params, $data);
    }

    public static function getByCode($code){
        return self::find(self::$table, $code);
    }

    public static function getPaginate($limit, $offset) {
        return self::paginate(self::$table, $limit, $offset);
    }

    public static function add() {

        $data = [
            'code' => bin2hex(random_bytes(16)),
            'username' => self::$user_name,
            'mdp' => password_hash(self::$mdp, PASSWORD_BCRYPT),
            'role' => self::$role,
            'sexe' => self::$sexe,
            'temps' => time()
        ];

        try {
            return self::insert(self::$table, $data);
        } catch (\Exception $th) {
            die('Erreur lors de l\'insertion utilisateur'. $th->getMessage());
        }
    
    }

    public static function login($username, $mdp) {

        $user = self::findByParams(self::$table, 'username = :username', ['username' => $username]);

        if ($user) :
            if (password_verify($mdp, $user['mdp'])) :
                return $user;
            endif;
        endif;
        return [];
    }

    public static function deleteOne($code) {
        try {
            return self::delete(self::$table, $code);
        } catch (\Throwable $th) {
            die('Erreur lors de la suppression'. $th->getMessage());
        }
    }
}
