<?php


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_SESSION['panier'])) {
        unset($_SESSION['panier']);

        echo json_encode([
            'status' => 'success',
            'message' => 'Produits vidé du panier',
            'data' => $_SESSION['panier']
        ]);
    } else {

        echo json_encode([
            'status' => 'error',
            'message' => 'Le panier est vide'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Méthode non autorisée'
    ]);
}