<?php

use App\RendezVous;

$headers = getallheaders();

if (!isset($headers['Authorization'])) :
    http_response_code(401);
    echo json_encode(["message" => "Token manquant"]);
    header("location : /login");
    exit;
endif;

try {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') :
        
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $offset = ($page -1) * $limit;

        $rendezVous_inst = new RendezVous();

        $rendezVous_total = count($rendezVous_inst->getAll());

        $rendezVous = $rendezVous_inst->getPaginate($limit, $offset);

        if (empty($rendezVous)) :
            echo json_encode([
                'status' => 'error',
                'message' => 'Aucun entré trouvé'
            ]);
            exit;
        endif;

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $userData = verifyJWT($token);

        echo json_encode([
            'status' => 'success',
            'message' => 'Rendez vous trouvé avec success',
            'data' => $rendezVous,
            'total' => $rendezVous_total,
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