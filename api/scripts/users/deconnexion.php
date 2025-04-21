<?php

    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Token manquant"]);
        exit;
    }

    try {

        // Exemple d’utilisation
        $headers = getallheaders();
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $userData = verifyJWT($token);

        if (!$userData) {
            echo json_encode(['message' => 'Session don\'t exist']);
            exit;
        }

        unset($_SESSION['cardio-exp']['code']);
        unset($_SESSION['cardio-exp']['role']);
        session_destroy();

        echo json_encode(['route' => '/login', 'status' => 'success']);
   
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => true,
            'status' => 'error',
            'message' => 'Erreur serveur : ' . $e->getMessage()
        ]);
    }
    exit;
    
?>