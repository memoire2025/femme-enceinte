<?php

use App\Patiente;

try {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $offset = ($page -1) * $limit;

        $patientes_inst = new Patiente();

        $total_patientes = count($patientes_inst->getAll());

        $total_page = ceil($total_patientes/$limit);

        $patientes = $patientes_inst->getPaginate($limit, $offset);

        if (empty($patientes)) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Aucun patientes trouvé'
            ]);
            exit;
        }

        echo json_encode([
            'status' => 'success',
            'message' => 'patientes trouvé avec success',
            'data' => $patientes,
            'total' => $total_patientes,
            'total_page' => $total_page
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