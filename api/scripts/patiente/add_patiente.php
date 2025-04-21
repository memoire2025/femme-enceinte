<?php

require_once __DIR__ . '/../function.php';

use App\Patiente;

try {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents("php://input"), true);

        $nom = isset($data['nom']) ? strtoupper(securisation($data['nom'])) : null;
        $prenom = isset($data['prenom']) ? strtoupper(securisation($data['prenom'])) : null;
        $naissance = isset($data['naissance']) ? securisation($data['naissance']) : null;
        $telephone = isset($data['telephone']) ? strtolower(securisation($data['telephone'])) : null;
        $mdp = isset($data['mdp']) ? (securisation($data['mdp'])) : null;
        $email = isset($data['email']) ? securisation($data['email']) : null;
        $date_dernieres_regles = isset($data['date_dernieres_regles']) ? strtolower(securisation($data['date_dernieres_regles'])) : null;
        $date_accouchement_prevue = isset($data['date_accouchement_prevue']) ? strtolower(securisation($data['date_accouchement_prevue'])) : null;

        
        
        if (!empty($nom) && !empty($naissance) && !empty($telephone) && !empty($mdp) && !empty($email) && !empty($prenom) && !empty($date_dernieres_regles) && !empty($date_accouchement_prevue)) {

            if (!preg_match('/(@gmail.com)$/i', $email)):
                echo json_encode([
                    'status' => 'Error',
                    'message' => 'Email incorrecte !!',
                ]);
                exit;
            endif;

            $username = strtolower("@" . $prenom);

            $patiente_inst = new Patiente($nom, $prenom, $username, $naissance, $mdp, $telephone, $email, $date_dernieres_regles, $date_accouchement_prevue);

            if ($patiente_inst->exist()) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'L\'entré renseigné existe déjà'
                ]);
                exit;
            }
            
            if ($patiente_inst->add()) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'L\'entré ajouté avec success!'
                ]);
                exit;
            }

            echo json_encode([
                'status' => 'error',
                'message' => 'Erreur lors de l\'insertion du diagnostic'
            ]);

            
        }

        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez renseiger tout le champs obligatoire'
        ]);

    }else{
        echo json_encode([
            'status' => 'error',
            'message' => 'Méthode non autorisé pour ce formulaire'
        ]);
        exit;
    }
} catch (\Throwable $th) {
    die('Erreur Serveur'. $th->getMessage());
}