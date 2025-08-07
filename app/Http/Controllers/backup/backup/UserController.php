<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(UserRequest $request)
    {
        $data = $request->validated();
        User::create($data);
        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);
        return redirect()->back()->with('success', 'User updated successfully.');
    }
}
