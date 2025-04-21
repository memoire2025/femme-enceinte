<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $panier = isset($_SESSION['panier']) ? $_SESSION['panier'] : [];

    $totalPanier = 0;

    if (!empty($panier)) {
        echo json_encode([
            'status' => 'success',
            'data' => $panier,
            'message' => 'Panier récupéré avec succès'
        ]);
    } else {
        echo json_encode([
            'status' => 'empty',
            'message' => 'Le panier est vide.',
        ]);
    }
    exit;
}
