<?php

    use App\Patiente;
    require_once __DIR__ . '/../function.php';

    try {
        $r = isset($_GET['r']) ? securisation($_GET['r']) : null;

        if (empty($r)) :
            echo json_encode(['status' => 'error', 'message' => 'Terme de recherche obligatoire']);
            exit;
        endif;

        $dossier_inst = new Patiente();
        $data_r = $dossier_inst->recherche($r);
        
        if (empty($data_r)) :
            echo json_encode(['status' => 'error', 'message' => 'Aucune patiente trouvé']);
            exit;
        endif;

        echo json_encode(['status' => 'success', 'message' => 'Patiente trouvée', 'data' => $data_r]);

    } catch (\Exception $th) {
        die("Erreur serveur".$th);
    }

    