<?php

require_once __DIR__ . '/../function.php';

use App\RendezVous;

$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["message" => "Token manquant"]);
    header("location : /login");
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') :

        $data = json_decode(file_get_contents("php://input"), true);
        
        $code_patient = isset($data['code_patiente']) ? securisation($data['code_patiente']) : null;
        $date_heure = isset($data['date_heure']) ? securisation($data['date_heure']) : null;
        // $code_medecin = isset($data['code_medecin']) ? securisation($data['code_medecin']) : null;s
        $motif = isset($data['motif']) ? securisation($data['motif']) : null;
        // $csrf = isset($data['csrf']) ? $data['csrf'] : null;

        // if ($csrf == null && $csrf !== $_SESSION['csrf']) {
        //     echo json_encode(['status' => 'error', 'message' => 'Invalid Token']);
        //     exit;
        // }
        
        if (!empty($code_patient) && !empty($date_heure) && !empty($motif)) :

            $token = str_replace('Bearer ', '', $headers['Authorization']);
            $userData = verifyJWT($token);

            $code_medecin = $userData['code-femmeEnceinte'];

            $rendezVous_inst = new RendezVous($code_patient, $date_heure, $code_medecin, $motif);
            
            if ($rendezVous_inst->exist()) :
                echo json_encode([
                    'status' => 'error',
                    'message' => 'La patiente à déjà un rendez-vous avec ce medenin à cette date et heures'
                ]);
                exit;
            endif;

            if ($rendezVous_inst->add()) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Le rendez-vous ajouté avec success!'
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