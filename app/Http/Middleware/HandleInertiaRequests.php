<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

//        dd([
//            'route'          => optional(request()->route())->getName(),
//            'defaults.guard' => config('auth.defaults.guard'),
//            'guards'         => collect(array_keys(config('auth.guards')))
//                ->mapWithKeys(fn ($g) => [$g => Auth::guard($g)->id()])
//                ->all(),
//            'request.user()' => optional($request->user())->id,
//        ]);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => [
                    'can' => [
                        'user_manage' => true,
                    ],
                ],
            ],
            'errors' => fn () => $request->session()->get('errors')
                ? $request->session()->get('errors')->getBag('default')->toArray()
                : (object) [],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
//            'auth.user.can' => $request->user() ? $request->user()->getAllPermissions()->mapWithKeys(function ($permission) {
//                return [$permission->name => true];
//            }) : [],
        ]);
    }
}
