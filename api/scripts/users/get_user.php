<?php

use App\Personnel;

$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["message" => "Token manquant"]);
    header("location : /login");
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $offset = ($page -1) * $limit;
        
        if (!class_exists('App\Personnel')) {
            echo json_encode(['message' => 'Class Utilisateur not found']);
            exit;
        }
        
        $user_inst = new Personnel();
        
        $total_user = count($user_inst->getAll());
        $total_pages = ceil($total_user / $limit);
        $user = $user_inst->getPaginate($limit, $offset);
        
        if (empty($user)) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Aucun user trouvé'
            ]);
            exit;
        }
  
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $userData = verifyJWT($token);
        
        if ($userData) :
            echo json_encode([
                'status' => 'success',
                'message' => 'user trouvé avec success & Accès autorisé',
                'data' => $user,
                'total' => $total_user,
                'user_role' => $userData['role-femmeEnceinte'],
                'total_page' => $total_pages
            ]);
        else :
            http_response_code(401);
            echo json_encode(["message" => "Token invalide"]);
        endif;

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