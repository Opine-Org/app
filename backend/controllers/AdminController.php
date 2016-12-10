<?php
use Valitron\Validator;

class AdminController {
    private $userService;
    private $adminModel;

    public function __construct ($userService, $adminModel)
    {
        $this->userService = $userService;
        $this->adminModel = $adminModel;
    }

    public function homePage ()
    {
        $session = $this->userService->getTokenSession();
        error_log(print_r($session, true));

        //$this->adminModel->getUserWidgets(1, [1])

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
        // validate input (should have already been validated by frontend)
        $v = new Validator($input);
        $v->rule('required', 'email')->message('{field} is required')->label('Email');
        $v->rule('email', 'email')->message('{field} is must be in a valid format')->label('Email');
        $v->rule('required', 'password')->message('{field} is required')->label('Password');
        if (!$v->validate()) {
            http_response_code(400);
            return json_encode([
                'status' => 'error',
                'error' => implode(', ', ValdidationHelper::flattenErrors($v->errors()))
            ]);
        }

        // try to login
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

        // lookup user's roles
        $userRoles = $this->userService->getUserRoles($user['id']);

        // create a new token
        $token = $this->userService->encodeJWT($user['id'], $user['email'], $userRoles);

        // api response
        return json_encode([
            'status' => 'ok',
            'payload' => [
                'user' => $user,
                'token' => $token,
                'roles' => $userRoles
            ]
        ]);
    }

    public function register (array $input) : string
    {
        // validate input (should have already been validated by frontend)
        $v = new Validator($input);
        $v->rule('required', 'email')->message('{field} is required')->label('Email');
        $v->rule('email', 'email')->message('{field} is must be in a valid format')->label('Email');
        $v->rule('required', 'password')->message('{field} is required')->label('Password');
        $v->rule('required', 'first_name')->message('{field} is required')->label('First Name');
        $v->rule('required', 'last_name')->message('{field} is required')->label('Last Name');
        if (!$v->validate()) {
            error_log(print_r(array_values($v->errors()), true));
            http_response_code(400);
            return json_encode([
                'status' => 'error',
                'error' => implode(', ', ValdidationHelper::flattenErrors($v->errors()))
            ]);
        }

        // add user to the database
        $userId = $this->userService->addUser($input['first_name'], $input['last_name'], $input['email'], $input['password']);
        if ($userId === 0) {
            return json_encode([
                'status' => 'error',
                'notice' => [
                    'messages' => [
                        'duplicate registration'
                    ]
                ]
            ]);
        }

        // lookup user's roles
        $userRoles = $this->userService->getUserRoles($userId);

        // create a new token
        $token = $this->userService->encodeJWT($userId, strtolower(trim($input['email'])), $userRoles);

        // api response
        return json_encode([
            'status' => 'ok',
            'payload' => [
                'user' => [
                    'id' => $userId,
                    'email' => $input['email'],
                    'first_name' => $input['first_name'],
                    'last_name' => $input['last_name']
                ],
                'token' => $token,
                'roles' => $userRoles
            ]
        ]);
    }
}
