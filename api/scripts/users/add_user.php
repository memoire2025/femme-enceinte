<?php

    require_once __DIR__ . '/../function.php';

    use App\Personnel;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $data = json_decode(file_get_contents("php://input"), true);

        $username = isset($data['username']) ? securisation($data['username']) : null;
        $mdp = isset($data['mdp']) ? securisation($data['mdp']) : null;
        $sexe = isset($data['sexe']) ? strtolower(securisation($data['sexe'])) : null;
        $role = isset($data['role']) ? strtolower(securisation($data['role'])) : null;

        if (!empty($role) && !empty($mdp) && !empty($username) && !empty($sexe)) :
                
            new Personnel($username, $mdp, $role, $sexe);

            if ($exist_user = Personnel::exist()) :
                echo json_encode(['status' => 'error', 'message' => 'L\'utilisateur avec cet e-mail existe déjà!']);
                exit;
            endif;

            if (Personnel::add()) :

                echo json_encode(['status' => 'success', 'message' => 'Utilisateur enregistré avec succès!']);
                exit;
            else :
                echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'enregistrement!']);
                exit;
            endif;
                
        else :
            echo json_encode(['status' => 'error', 'message' => 'Veuillez remplir tous les champs obligatoires!']);
            exit;
        endif;
    endif;
?>