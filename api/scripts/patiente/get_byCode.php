<?php

use App\Patiente;

try {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        // $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        // $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        // $offset = ($page -1) * $limit;

        $code_patiente = isset($_GET['code']) ? $_GET['code'] : '';

        $patientes_inst = new Patiente();

        $patientes = $patientes_inst->findOne($code_patiente);
        
        if (empty($patientes)) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Aucun patientes trouvé'
            ]);
            exit;
        }
// echo json_encode(['message' => $patientes]);
//         exit;
        echo json_encode([
            'status' => 'success',
            'message' => 'patiente trouvé avec success',
            'data' => $patientes,
        ]);

    }else{
        echo json_encode([
            'status' => 'error',
            'message' => 'Methode non autoriser pour recuperer les données'
        ]);
        exit;
    }
} catch (\Throwable $th) {
    die('Erreur serveur à la recuperation de données'. $th->getMessage());
}