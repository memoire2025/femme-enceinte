<?php

namespace App;

class DossierMed extends Database {
    protected $table = 'dossiermed';

    private $code_patient;
    private $alergies;
    private $antecedant;
    private $groupe_sanguin;

    private static $config;

    public function __construct($code_patient = null, $alergies = null, $antecedant = null, $groupe_sanguin = null)
    {
        $this->code_patient = $code_patient;
        $this->alergies = $alergies;
        $this->antecedant = $antecedant;
        $this->groupe_sanguin = $groupe_sanguin;

        self::$config = (ConfigDB::getInstance())->getConfig();
        parent::__construct(self::$config);
    }

    public function add() {
        $data = [
            'code' => bin2hex(random_bytes(16)),
            'code_patient' => $this->code_patient,
            'alergies' => $this->alergies,
            'antecedant' => $this->antecedant,
            'groupe_sanguin' => $this->groupe_sanguin,
            'temps' => time(),
        ];
        try {
            return self::insert($this->table, $data);
        } catch (\Exception $th) {
            die('Erreur lors de l\'insertion'. $th->getMessage());
        }
    }

    public function getPaginate($limit, $offset) {
        try {
            return self::paginate($this->table, $limit, $offset);
        } catch (\Exception $th) {
            die('Erreur lors de la pagination'. $th->getMessage());
        }
    }

    public function getAll() {
        return self::all($this->table);
    }

    public function exist() {
        try {
            return self::findByParams($this->table, 'code_patient = :code_patient', [
                'code_patient' => $this->code_patient
            ]);
        } catch (\Throwable $th) {
            die('Erreur lors de existSymptome'. $th->getMessage());
        }
    }

    public function getCodePatient($code) {
        try {
            return self::findByParams($this->table, 'code_patient = :code_patient', ['code_patient' => $code]);
        } catch (\Throwable $th) {
            die('Erreur lors de getByCode'. $th->getMessage());
        }
    }

    public function getCode($code) {
        try {
            return self::findByParams($this->table, 'code = :code', ['code' => $code]);
        } catch (\Throwable $th) {
            die('Erreur lors de getByCode'. $th->getMessage());
        }
    }


}