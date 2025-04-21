<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once __DIR__ .'/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define("JWT_SECRET", "fb10c919e4970ecf1675da0763432ea24889052ab24e9ad94917d194fcb5bc0f");

function verifyJWT($token) {
    try {
        $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
        return (array) $decoded; // Convertir en tableau
    } catch (Exception $e) {
        return null; // JWT invalide
    }
}

$requestUri = $_SERVER['REQUEST_URI'];

// Supprime les paramètres de requête, si présents
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Table de routage (URI => fichier PHP à inclure)
$routesGetMethode = [

    '/deconnexion' => __DIR__ . '/scripts/users/deconnexion.php',
    '/get_user' => __DIR__ . '/scripts/users/get_user.php',
    '/get_patiente' => __DIR__ . '/scripts/patiente/get_patiente.php',
    '/get_rdv' => __DIR__ . '/scripts/rendezvous/get_rdv.php',
    '/get_dossier' => __DIR__ . '/scripts/dossier_med/get_dossier_med.php',
    '/get_patiente_by_code' => __DIR__ . '/scripts/patiente/get_byCode.php',
    '/get_rdv_by_patiente' => __DIR__ . '/scripts/rendezvous/get_rdvByPatiente.php',

    '/recherche_dossier' => __DIR__ . '/scripts/dossier_med/recherche.php',

];

$routesPostMethod = [
    '/login' => __DIR__ . '/scripts/users/login.php',
    '/add_user' => __DIR__ . '/scripts/users/add_user.php',
    '/add_patiente' => __DIR__ . '/scripts/patiente/add_patiente.php',
    '/add_rdv' => __DIR__ . '/scripts/rendezvous/add_rdv.php',
    '/add_dossier' => __DIR__ . '/scripts/dossier_med/add_dossier_med.php',
    '/delete_user' => __DIR__ . '/scripts/users/delete_user.php',
    

    '/refresh_token' => __DIR__ . '/scripts/refresh_token.php',
];


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    if (array_key_exists($requestPath, $routesGetMethode)) {
        require $routesGetMethode[$requestPath];
    } else {
        http_response_code(404);
        echo "Page not found 404.";
    }   
}elseif ($_SERVER['REQUEST_METHOD'] == 'POST'){

    if (array_key_exists($requestPath, $routesPostMethod)) {
        require $routesPostMethod[$requestPath];
    } else {
        http_response_code(404);
        echo "Page de scripts not found!";
    }
}else{
    echo "Méthode non autorisé";
}
