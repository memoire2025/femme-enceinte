<?php

namespace App;

class Regles extends Database {
    protected $table = 'regles';
    private $code_R;
    private $code_diagno;
    private $code_precaution;
    private $symptomes;
    private $code_utilisateur;
    private static $config;

    public function __construct($code_diagno, $code_precaution, $symptomes, $code_utilisateur, $code_R = "")
    {
        $this->code_R = $code_R;
        $this->code_diagno = $code_diagno;
        $this->code_precaution = $code_precaution;
        $this->symptomes = $symptomes;
        $this->code_utilisateur = $code_utilisateur;

        self::$config = (ConfigDB::getInstance())->getConfig();
        parent::__construct(self::$config);
    }

    public function setCode_R($code) {
        $this->code_R = $code;
    }

    public function getAllRegle() {
        return self::all($this->table);
    }

    public function addRegles() {
        
        try {

            $code = bin2hex(random_bytes(16));
            $data = [
                'code' => $code,
                'code_R' => $this->code_R,
                'code_diagno' => $this->code_diagno,
                'code_precaution' => $this->code_precaution,
                'symptomes' => $this->symptomes,
                'code_utilisateur' => $this->code_utilisateur,
                'temps' => time()
            ];

            self::insert($this->table, $data);
            self::$db->lastInsertId();
            
            return ['db' => self::$db, 'code' => $code];

        } catch (\Throwable $th) {
            die('Erreur '. $th->getMessage());
        }
    }

    public function existRegle() {
        try {

            return self::findByParams($this->table, 'code_diagno = :code_diagno', ['code_diagno' => $this->code_diagno]);

        } catch (\Exception $th) {
            die('Erreur lors de la verification de l\'existance'.$th->getMessage());
        }
    }
    
    public function existDiagnoSymptome($code_symptome){
        try {
            $stmt = self::$db->prepare(
                "SELECT 
                    -- d.nom AS nom_diagno, 
                    -- p.traitement AS precaution,
                    r.code_diagno,
                    r.code_precaution,
                    GROUP_CONCAT(DISTINCT s.code ORDER BY s.code SEPARATOR ',') AS symptomes_code
                FROM regles r
                INNER JOIN diagnostic d ON d.code = r.code_diagno
                INNER JOIN bases b ON r.code = b.code_regle
                INNER JOIN symptome s ON b.code_symptome = s.code
                INNER JOIN precaution p ON p.code = r.code_precaution
                GROUP BY r.code_diagno, r.code_precaution
                HAVING symptomes_code = $code_symptome
                    AND r.code_diagno = $this->code_diagno
                    AND r.code_precaution = $this->code_precaution
                "
            );
    
            $stmt->execute();
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            die('Erreur lors de la vérification de l\'existance de la règle'.$th->getMessage());
        }
    }

    public function getJoinRegles () {
        $stmt = self::$db->prepare(
            "SELECT 
                r.code AS regle_code,
                r.temps,
                d.nom AS nom_diagno,
                p.traitement AS solution,
                GROUP_CONCAT(DISTINCT s.nom ORDER BY s.nom SEPARATOR ', ') AS symptomes
            FROM $this->table r
            INNER JOIN diagnostic d ON d.code = r.code_diagno 
            INNER JOIN precaution p ON p.code = r.code_precaution
            INNER JOIN bases b ON r.code = b.code_regle
            INNER JOIN symptome s ON b.code_symptome = s.code
            GROUP BY r.code, r.code_diagno, r.code_precaution, d.code, d.nom, p.code, p.traitement
            ORDER BY r.temps"
        );
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
        return [];
    }

    public function getDiagnoBySymptome($symptomes) {
        $stmt = self::$db->prepare(
            "SELECT 
                d.nom AS nom_diagno, 
                p.traitement AS precaution, 
                GROUP_CONCAT(DISTINCT s.code ORDER BY s.code SEPARATOR ',') AS symptomes_code,
                GROUP_CONCAT(DISTINCT s.nom ORDER BY s.nom SEPARATOR ' et ') AS symptomes_nom 
            FROM diagnostic d
            INNER JOIN regles r ON d.code = r.code_diagno
            INNER JOIN bases b ON r.code = b.code_regle
            INNER JOIN symptome s ON b.code_symptome = s.code
            INNER JOIN precaution p ON p.code = r.code_precaution
            GROUP BY d.code, d.nom, p.traitement
            HAVING symptomes_code = '$symptomes'"
        );

        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
        return [];
    }


}