<?php
        
    require_once __DIR__ . '/../function.php';

    use App\Personnel;
    use App\Patiente;
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $exp = time() + 10600;

    function generateJWT($code, $role, $exp) {
        $payload = [
            "code-femmeEnceinte" => $code,
            "role-femmeEnceinte" => $role,
            "exp-femmeEnceinte" => $exp
        ];
        return JWT::encode($payload, JWT_SECRET, 'HS256');
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $username = securisation($data['username']);
    $mdp = securisation($data['mdp']);
    
    if (!empty($username) && !empty($mdp)) :
            
        $patiente = new Patiente();
        $personnel_info = Personnel::login($username, $mdp);
        
        if (!empty($personnel_info)) :
            
            $accessToken = generateJWT($personnel_info['code'], $personnel_info['role'], $exp);
            
            echo json_encode([
                'status' => 'success',
                'message' => 'Connexion réussie!',
                'accessToken' => $accessToken,
                'role' => $personnel_info['role'],
                'code' => $personnel_info['code'],
                'exp' => $exp,
            ]);
            exit;
        else :

            $personnel_info = $patiente->login($username, $mdp, $exp);
            
            if (!empty($personnel_info)) :
                $role = "patiente";
                $accessToken = generateJWT($personnel_info['code'], $role);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Connexion réussie!',
                    'accessToken' => $accessToken,
                    'role' => $role,
                    'code' => $personnel_info['code'],
                    'exp' => $exp,
                ]);
                exit;
            endif;

            echo json_encode(['status' => 'error', 'message' => 'E-mail ou mot de passe incorrect !']);
    
        endif;        
    else :
        echo json_encode(['status' => 'error', 'message' => 'Champs vides !']);
        exit;
    endif;
