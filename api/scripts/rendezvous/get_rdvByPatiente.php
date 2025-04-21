<?php

use App\Patiente;
use App\RendezVous;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') :
        
        // $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        // $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        // $offset = ($page -1) * $limit;

        $code_patiente = isset($_GET['code']) ? $_GET['code'] : '';

        $patientes_inst = new Patiente();
        $rdv_inst = new RendezVous();

        $patientes = $patientes_inst->findOne($code_patiente);
        
        if (empty($patientes)) :
            echo json_encode([
                'status' => 'error',
                'message' => 'Aucun patientes trouvé'
            ]);
            exit;
        endif;
        
        $rdvFetch = $rdv_inst->getJoinPaginate($code_patiente);
        // echo json_encode(['message' => $rdvFetch]);
        // exit;

        if (empty($rdvFetch)) :
            echo json_encode([
                'status' => 'error',
                'message' => 'Rendez-vous non trouvé'
            ]);
        endif;

        echo json_encode([
            'status' => 'success',
            'message' => 'patiente trouvé avec success',
            'data' => $rdvFetch,
        ]);

    else :
        echo json_encode([
            'status' => 'error',
            'message' => 'Methode non autoriser pour recuperer les données'
        ]);
        exit;
    endif;
} catch (\Throwable $th) {
    die('Erreur serveur à la recuperation de données'. $th->getMessage());
}