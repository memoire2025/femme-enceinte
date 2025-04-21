<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['produits']) || !is_array($data['produits'])) {
    echo json_encode(["message" => "Données invalides"]);
    exit;
}

// Traitement (exemple : insertion dans une base de données)
$pdo = new PDO("mysql:host=localhost;dbname=ma_base", "user", "password");

foreach ($data['produits'] as $produit) {
    $stmt = $pdo->prepare("INSERT INTO commandes (produit_id, quantite) VALUES (?, ?)");
    $stmt->execute([$produit['id'], $produit['quantity']]);
}

echo json_encode(["message" => "Commande enregistrée"]);
?>
