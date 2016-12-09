<?php
use Valitron\Validator;

class AdminController {
    private $userService;
    private $postService;

    public function __construct ($userService)
    {
        $this->userService = $userService;
    }

    public function homePage ()
    {
        return '{}';
    }

    public function loginPage ()
    {
        return '{}';
    }

    public function registerPage ()
    {
        return '{}';
    }

    public function logout ()
    {
        return '{}';
    }

    public function login (array $input) : string
    {
        $v = new Validator($input);
        $v->rule('required', 'email')->message('{field} is required')->label('Email');
        $v->rule('email', 'email')->message('{field} is must be in a valid format')->label('Email');
        $v->rule('required', 'password')->message('{field} is required')->label('Password');
        if (!$v->validate()) {
            http_response_code(400);
            return json_encode([
                'status' => 'error',
                'errors' => $v->errors()
            ]);
        }

        $user = $this->userService->login($input['email'], $input['password']);
        if (empty($user)) {
            return json_encode([
                'status' => 'error',
                'notice' => [
                    'messages' => [
                        'login failed'
                    ]
                ]
            ]);
        }

        $token = $this->userService->encodeJWT($user['id'], $user['email'], []);

        return json_encode([
            'status' => 'ok',
            'payload' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }

    public function register (array $input) : string
    {
        $userId = $this->userService->addUser($input['first_name'], $input['last_name'], $input['email'], $input['password']);
        if ($userId === false) {
            http_response_code(500);
            return false;
        }
        $token = $this->userService->encodeJWT($userId, $input['email'], []);
        return json_encode([
            'userId' => $userId,
            'token' => $token,
            'email' => $input['email'],
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name']
        ]);
    }
}
