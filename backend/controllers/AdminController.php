<?php

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
        // $token = $this->userService->encodeJWT(123, 'test@test.com', ['ROLE1']);
        // $tokenData = $this->userService->decodeJWT($token);
        // var_dump($tokenData);
        // exit();
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
        http_response_code(400);
        return json_encode([
            'status' => 'error',
            'error' => 'You Suck'
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
