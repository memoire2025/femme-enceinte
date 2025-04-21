<?php

namespace App;

class RendezVous extends Database {
    protected $table = 'rendezvous';

    private $code_patient;
    private $date_heure;
    private $code_medecin;
    private $motif;

    private static $config;

    public function __construct($code_patient = null, $date_heure = null, $code_medecin = null, $motif = null)
    {
        $this->code_patient = $code_patient;
        $this->date_heure = $date_heure;
        $this->code_medecin = $code_medecin;
        $this->motif = $motif;

        self::$config = (ConfigDB::getInstance())->getConfig();
        parent::__construct(self::$config);
    }

    public function add() {
        $data = [
            'code' => bin2hex(random_bytes(16)),
            'code_patiente' => $this->code_patient,
            'date_heure' => $this->date_heure,
            'medecin' => $this->code_medecin,
            'motif' => $this->motif,
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
            return self::findByParams($this->table, 'code_patiente = :code_patiente AND date_heure = :date', [
                'code_patiente' => $this->code_patient,
                'date' => $this->date_heure,
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

    public function getJoinPaginate($code_patiente) {
        try {
            $stmt = self::$db->prepare(
                "SELECT 
                r.date_heure, r.motif, pt.nom, pt.prenom, pr.username 
                FROM $this->table r
                INNER JOIN patiente pt ON pt.code = r.code_patiente
                INNER JOIN personnel pr ON pr.code = r.medecin
                WHERE r.code_patiente = :code_patiente"
            );

            $stmt->bindParam(':code_patiente', $code_patiente, \PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount() > 0) :
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            endif;
            return [];
        } catch (\PDOException $e) {
            die('Erreur join rdv '. $e->getMessage());
        }
        
    }


}