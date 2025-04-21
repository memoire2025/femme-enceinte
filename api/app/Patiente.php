<?php

namespace App;

class Patiente extends Database {
    protected $table = 'patiente';

    private $nom;
    private $prenom;
    private $username;
    private $naissance;
    private $mdp;
    private $telephone;
    private $email;
    private $date_dernieres_regles;
    private $date_accouchement_prevue;

    private static $config;

    public function __construct($nom = null, $prenom = null, $username = null, $naissance = null, $mdp = null, $telephone = null, $email = null, $date_dernieres_regles = null, $date_accouchement_prevue = null)
    {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->username = $username;
        $this->naissance = $naissance;
        $this->mdp = $mdp;
        $this->telephone = $telephone;
        $this->email = $email;
        $this->date_dernieres_regles = $date_dernieres_regles;
        $this->date_accouchement_prevue = $date_accouchement_prevue;

        self::$config = (ConfigDB::getInstance())->getConfig();
        parent::__construct(self::$config);
    }

    public function add() {
        
        $data = [
            'code' => bin2hex(random_bytes(16)),
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'username' => $this->username,
            'naissance' => $this->naissance,
            'mdp' => password_hash($this->mdp, PASSWORD_BCRYPT),
            'telephone' => $this->telephone,
            'email' => $this->email,
            'date_dernieres_regles' => $this->date_dernieres_regles,
            'date_accouchement_prevue' => $this->date_accouchement_prevue,
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
            return self::findByParams($this->table, 'nom = :nom AND prenom = :prenom AND date_dernieres_regles = :date_dernieres_regles ', [
                'nom' => $this->nom,
                'prenom' => $this->prenom,
                'date_dernieres_regles' => $this->date_dernieres_regles
            ]);
        } catch (\Throwable $th) {
            die('Erreur lors de existSymptome'. $th->getMessage());
        }
    }

    public function recherche($r) {
        try {
            return self::search($this->table, 'nom', $r, '*');
        } catch (\Exception $th) {
            die('Erreur lors de existSymptome'. $th->getMessage());
        }
    }

    public function findOne($code) {
        try {
            return self::find($this->table, $code);
        } catch (\Throwable $th) {
            die('Erreur lors de getByCode'. $th->getMessage());
        }
    }

    public function login($username, $mdp) {

        $user = self::findByParams($this->table, 'username = :username', ['username' => $username]);

        if ($user) :
            if (password_verify($mdp, $user['mdp'])) :
                return $user;
            endif;
        endif;
        return [];
    }


}