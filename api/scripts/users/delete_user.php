<?php

use App\Utilisateur;

try {
    if ($_SERVER['REQUEST_METHOD'] === "POST") :

        $data = json_decode(file_get_contents('php://input'), true);

        $code = $data['code'] ?? null;
        
        new Utilisateur("", "", "", "","");
        
        Utilisateur::deleteOne($code);
        echo json_encode([
            'status' => 'success',
            'message' => 'Utilisateur supprimer avec succès'
        ]);
    else :
        json_encode([
            'status' => 'error',
            'message' => 'Méthode non autorisé'
        ]);
        exit;
    endif;
} catch (\Throwable $th) {
    die('Erreur serveur à la suppression d\'utilisateur'. $th->getMessage());
}