<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Enums\KpDistrict;
use App\Http\Controllers\Controller;
class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;

        // This explicitly tells Laravel to use the UserPolicy for the 'user' resource.
        $this->authorizeResource(User::class, 'user');
    }

    public function index(Request $request)
    {
        $query = User::query()->with(['roles', 'permissions']);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => Role::all(['id', 'name']),
            'districts' => KpDistrict::toSelectArray(),
            'filters' => $request->only('search', 'open'),
            'can' => [
                'user_manage' => $request->user()->can('user_manage'),
            ]
        ]);
    }

    public function create()
    {
        // This is the route that was failing. authorizeResource maps this to
        // the 'create' method in UserPolicy.
        $this->authorize('create', User::class);

        // This method typically just returns the view/component for the creation form.
        // In Inertia, this is handled on the frontend by showing a modal,
        // so this method might not even be hit if you're using a modal approach.
        // The check is here for completeness.
    }


    public function store(StoreUserRequest $request)
    {
        // authorizeResource handles this, but we can be explicit.
        $this->userService->createUser($request->validated());
        return redirect()->route('admin.users.index')->with('success', 'User created successfully!');
       // return redirect()->route('admin.users.index')->with('success', 'User created successfully!');
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        // authorizeResource handles this, but we can be explicit.
        $this->userService->updateUser($user, $request->validated());
        return redirect()->route('admin.users.index')->with('success', 'User updated successfully!');
       // return redirect()->route('admin.users.index')->with('success', 'User updated successfully!');
    }

    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully!');
    }
}
