<?php
header('Content-Type: application/json');
require_once  __DIR__ . '/../function.php';

use App\Symptome;
try {

    $sympto_inst = new Symptome("", "");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $data = json_decode(file_get_contents('php://input'), true);
    
        $sympto_code = securisation($data['code'] ?? null);
        $sympto_nom = securisation($data['nom'] ?? null);
    
        if (empty($sympto_code)) {
            echo json_encode(['status' => 'error', 'message' => 'Paramètres invalides.']);
            exit;
        }
    
        // Charger ou initialiser le panier
        $panier = $_SESSION['panier'] ?? [];
        
        $getSympto = $sympto_inst->getSymptomeByCode($sympto_code);
        
        if (!$getSympto) {
            echo json_encode(['status' => 'error', 'message' => 'Produit non trouvé!']);
            exit;
        }
        
        // Vérifier si le symptome est déjà dans le panier
        if (isset($panier[$sympto_code])) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Ce symptome existe déjà pour cette règle'
            ]);
            exit;
        } else {
            // Exemple de données fictives pour le produit
            $symptome = [
                'code' => $sympto_code,
                'nom' => $getSympto['nom'],
            ];
            $panier[$sympto_code] = $symptome;
        }
    
        $_SESSION['panier'] = $panier;
        $countSession = count($panier);
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Symptome ajouté au panier.',
            'totalProduits' => $countSession,
        ]);
        exit;
    }

} catch (\Throwable $th) {
    echo json_encode([
        'error' => true,
        'status' => 'error',
        'message' => 'Erreur serveur : ' . $e->getMessage()
    ]);
}
exit;
