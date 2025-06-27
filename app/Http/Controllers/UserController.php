
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;

class UserController extends Controller
{
    protected UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = User::latest()->paginate(10);
        return inertia('Users/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'User created.');
    }

    public function update(Request $request, User $user)
    {
        $this->service->update($user, $request->all());
        return redirect()->back()->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $this->service->delete($user);
        return redirect()->back()->with('success', 'User deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('Users/Show', compact('item'));
    }
}
