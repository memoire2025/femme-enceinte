<?php

require_once __DIR__ . '/../function.php';

use App\DossierMed;

try {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') :

        $data = json_decode(file_get_contents("php://input"), true);
        
        $code_patient = isset($data['code_patient']) ? securisation($data['code_patient']) : null;
        $alergies = isset($data['alergies']) ? securisation($data['alergies']) : null;
        $antecedant = isset($data['antecedant']) ? securisation($data['antecedant']) : null;
        $groupe_sanguin = isset($data['groupe_sanguin']) ? securisation($data['groupe_sanguin']) : null;

        // $csrf = isset($data['csrf']) ? $data['csrf'] : null;

        // if ($csrf == null && $csrf !== $_SESSION['csrf']) {
        //     echo json_encode(['status' => 'error', 'message' => 'Invalid Token']);
        //     exit;
        // }
        
        if (!empty($code_patient) && !empty($alergies) && !empty($antecedant) && !empty($groupe_sanguin)) :
            
            $dossierMed_inst = new DossierMed($code_patient, $alergies, $antecedant, $groupe_sanguin);

            if ($dossierMed_inst->exist()) :
                echo json_encode([
                    'status' => 'error',
                    'message' => 'La dossierMed à déjà un rendez-vous avec ce medenin à cette date et heures'
                ]);
                exit;
            endif;
            
            if ($dossierMed_inst->add()) {
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
        endif;

        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez renseiger tout le champs obligatoire'
        ]);

    else :
        echo json_encode([
            'status' => 'error',
            'message' => 'Méthode non autorisé pour ce formulaire'
        ]);
        exit;
    endif;
} catch (\Throwable $th) {
    die('Erreur Serveur'. $th->getMessage());
}