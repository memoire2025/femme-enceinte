<?php

$data = json_decode(file_get_contents("php://input"), true);

$refreshToken = $data["refreshToken"] ?? '';

try {
    // Vérifier si le refresh token est valide
    $decoded = JWT::decode($refreshToken, new Key(REFRESH_SECRET, 'HS256'));

    // Générer un nouveau access token
    $newAccessToken = JWT::encode([
        "code" => $decoded->code,
        "role" => $decoded->role,
        "exp" => time() + (3600 * 3) // 3 heures
    ], JWT_SECRET, 'HS256');

    echo json_encode([
        "status" => "success",
        "accessToken" => $newAccessToken
    ]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Refresh token invalide ou expiré"]);
}
?>
