<?php

namespace App;

class Base extends Database {
    protected $table = 'bases';
    private $code_regle;
    private $code_symptome;
    private static $config;

    public function __construct()
    {
        self::$config = (ConfigDB::getInstance())->getConfig();
        parent::__construct(self::$config);
    }

    public function addRegle($code_regle, $code_symptome) {
        $this->code_regle = $code_regle;
        $this->code_symptome = $code_symptome;
        try {
            return self::insert($this->table, [
                'code' => bin2hex(random_bytes(16)),
                'code_regle' => $this->code_regle,
                'code_symptome' => $this->code_symptome,
                'temps' => time() 
            ]);
        } catch (\Throwable $th) {
            throw ('Erreur lors de l\'enregistrement !'.$th->getMessage());
        }
    }

    public function deleteBase($code) {
        try {
            return self::delete($this->table, $code);
        } catch (\Throwable $th) {
            throw ('Erreur lors de la suppression !'.$th->getMessage());
        }
    }

    public function getByCodeSymptome ($code) {
        try {
            return self::findByParams($this->table, 'code_symptome = :code_symptome', ['code_symptome' => $code]);
        } catch (\Throwable $th) {
            throw ('Erreur lors de la vérification par code !'.$th->getMessage());
        }
    }


}