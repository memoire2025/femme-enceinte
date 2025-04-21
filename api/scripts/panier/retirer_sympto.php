<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);
    $code = $data['code'] ?? null;

    if (isset($code)) {

        if (isset($_SESSION['panier']) && isset($_SESSION['panier'][$code])) {

            if (!empty($_SESSION['panier'])) {

                unset($_SESSION['panier'][$code]);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Symptome retiré du panier',
                    'data' => $_SESSION['panier']
                ]);
                exit;
            }
            echo json_encode([
                'status' => 'error',
                'message' => 'Le panier est vide',
            ]);
        } else {

            echo json_encode([
                'status' => 'error',
                'message' => 'Symptome non trouvé dans le panier'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Symptome ID manquant'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Méthode non autorisée'
    ]);
}