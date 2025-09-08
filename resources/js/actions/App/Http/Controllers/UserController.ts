import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/users'
*/
const index6e8299a085c11017e62ab420951fb27c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'get',
})

index6e8299a085c11017e62ab420951fb27c.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/users'
*/
index6e8299a085c11017e62ab420951fb27c.url = (options?: RouteQueryOptions) => {
    return index6e8299a085c11017e62ab420951fb27c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/users'
*/
index6e8299a085c11017e62ab420951fb27c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/users'
*/
index6e8299a085c11017e62ab420951fb27c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/admin/users'
*/
const indexde7b92f5d57ab3be25571f27f05793f8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexde7b92f5d57ab3be25571f27f05793f8.url(options),
    method: 'get',
})

indexde7b92f5d57ab3be25571f27f05793f8.definition = {
    methods: ["get","head"],
    url: '/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/admin/users'
*/
indexde7b92f5d57ab3be25571f27f05793f8.url = (options?: RouteQueryOptions) => {
    return indexde7b92f5d57ab3be25571f27f05793f8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/admin/users'
*/
indexde7b92f5d57ab3be25571f27f05793f8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexde7b92f5d57ab3be25571f27f05793f8.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:28
* @route '/admin/users'
*/
indexde7b92f5d57ab3be25571f27f05793f8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexde7b92f5d57ab3be25571f27f05793f8.url(options),
    method: 'head',
})

export const index = {
    '/users': index6e8299a085c11017e62ab420951fb27c,
    '/admin/users': indexde7b92f5d57ab3be25571f27f05793f8,
}

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/users/create'
*/
const createec5b3671142b81b262ce84c1986109db = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createec5b3671142b81b262ce84c1986109db.url(options),
    method: 'get',
})

createec5b3671142b81b262ce84c1986109db.definition = {
    methods: ["get","head"],
    url: '/users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/users/create'
*/
createec5b3671142b81b262ce84c1986109db.url = (options?: RouteQueryOptions) => {
    return createec5b3671142b81b262ce84c1986109db.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/users/create'
*/
createec5b3671142b81b262ce84c1986109db.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createec5b3671142b81b262ce84c1986109db.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/users/create'
*/
createec5b3671142b81b262ce84c1986109db.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createec5b3671142b81b262ce84c1986109db.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/admin/users/create'
*/
const create7057a041592e3390f6febd1e2eee4682 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create7057a041592e3390f6febd1e2eee4682.url(options),
    method: 'get',
})

create7057a041592e3390f6febd1e2eee4682.definition = {
    methods: ["get","head"],
    url: '/admin/users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/admin/users/create'
*/
create7057a041592e3390f6febd1e2eee4682.url = (options?: RouteQueryOptions) => {
    return create7057a041592e3390f6febd1e2eee4682.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/admin/users/create'
*/
create7057a041592e3390f6febd1e2eee4682.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create7057a041592e3390f6febd1e2eee4682.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:49
* @route '/admin/users/create'
*/
create7057a041592e3390f6febd1e2eee4682.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create7057a041592e3390f6febd1e2eee4682.url(options),
    method: 'head',
})

export const create = {
    '/users/create': createec5b3671142b81b262ce84c1986109db,
    '/admin/users/create': create7057a041592e3390f6febd1e2eee4682,
}

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:62
* @route '/users'
*/
const store6e8299a085c11017e62ab420951fb27c = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'post',
})

store6e8299a085c11017e62ab420951fb27c.definition = {
    methods: ["post"],
    url: '/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:62
* @route '/users'
*/
store6e8299a085c11017e62ab420951fb27c.url = (options?: RouteQueryOptions) => {
    return store6e8299a085c11017e62ab420951fb27c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:62
* @route '/users'
*/
store6e8299a085c11017e62ab420951fb27c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:62
* @route '/admin/users'
*/
const storede7b92f5d57ab3be25571f27f05793f8 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storede7b92f5d57ab3be25571f27f05793f8.url(options),
    method: 'post',
})

storede7b92f5d57ab3be25571f27f05793f8.definition = {
    methods: ["post"],
    url: '/admin/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:62
* @route '/admin/users'
*/
storede7b92f5d57ab3be25571f27f05793f8.url = (options?: RouteQueryOptions) => {
    return storede7b92f5d57ab3be25571f27f05793f8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:62
* @route '/admin/users'
*/
storede7b92f5d57ab3be25571f27f05793f8.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storede7b92f5d57ab3be25571f27f05793f8.url(options),
    method: 'post',
})

export const store = {
    '/users': store6e8299a085c11017e62ab420951fb27c,
    '/admin/users': storede7b92f5d57ab3be25571f27f05793f8,
}

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}'
*/
const showf898f2daa993cc45af847e1a1f899673 = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showf898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'get',
})

showf898f2daa993cc45af847e1a1f899673.definition = {
    methods: ["get","head"],
    url: '/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}'
*/
showf898f2daa993cc45af847e1a1f899673.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return showf898f2daa993cc45af847e1a1f899673.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}'
*/
showf898f2daa993cc45af847e1a1f899673.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showf898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}'
*/
showf898f2daa993cc45af847e1a1f899673.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showf898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}'
*/
const showfcf537c0ef09758de25ef4ed617562a1 = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'get',
})

showfcf537c0ef09758de25ef4ed617562a1.definition = {
    methods: ["get","head"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}'
*/
showfcf537c0ef09758de25ef4ed617562a1.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return showfcf537c0ef09758de25ef4ed617562a1.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}'
*/
showfcf537c0ef09758de25ef4ed617562a1.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::show
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}'
*/
showfcf537c0ef09758de25ef4ed617562a1.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showfcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'head',
})

export const show = {
    '/users/{user}': showf898f2daa993cc45af847e1a1f899673,
    '/admin/users/{user}': showfcf537c0ef09758de25ef4ed617562a1,
}

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}/edit'
*/
const edit7c8ee6634e997e7396d4cd79528adad3 = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit7c8ee6634e997e7396d4cd79528adad3.url(args, options),
    method: 'get',
})

edit7c8ee6634e997e7396d4cd79528adad3.definition = {
    methods: ["get","head"],
    url: '/users/{user}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}/edit'
*/
edit7c8ee6634e997e7396d4cd79528adad3.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return edit7c8ee6634e997e7396d4cd79528adad3.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}/edit'
*/
edit7c8ee6634e997e7396d4cd79528adad3.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit7c8ee6634e997e7396d4cd79528adad3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/users/{user}/edit'
*/
edit7c8ee6634e997e7396d4cd79528adad3.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit7c8ee6634e997e7396d4cd79528adad3.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}/edit'
*/
const edit7c782003786922e3cd8a2029a30610da = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit7c782003786922e3cd8a2029a30610da.url(args, options),
    method: 'get',
})

edit7c782003786922e3cd8a2029a30610da.definition = {
    methods: ["get","head"],
    url: '/admin/users/{user}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}/edit'
*/
edit7c782003786922e3cd8a2029a30610da.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return edit7c782003786922e3cd8a2029a30610da.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}/edit'
*/
edit7c782003786922e3cd8a2029a30610da.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit7c782003786922e3cd8a2029a30610da.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:0
* @route '/admin/users/{user}/edit'
*/
edit7c782003786922e3cd8a2029a30610da.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit7c782003786922e3cd8a2029a30610da.url(args, options),
    method: 'head',
})

export const edit = {
    '/users/{user}/edit': edit7c8ee6634e997e7396d4cd79528adad3,
    '/admin/users/{user}/edit': edit7c782003786922e3cd8a2029a30610da,
}

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/users/{user}'
*/
const updatef898f2daa993cc45af847e1a1f899673 = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'put',
})

updatef898f2daa993cc45af847e1a1f899673.definition = {
    methods: ["put","patch"],
    url: '/users/{user}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/users/{user}'
*/
updatef898f2daa993cc45af847e1a1f899673.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return updatef898f2daa993cc45af847e1a1f899673.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/users/{user}'
*/
updatef898f2daa993cc45af847e1a1f899673.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/users/{user}'
*/
updatef898f2daa993cc45af847e1a1f899673.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatef898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/admin/users/{user}'
*/
const updatefcf537c0ef09758de25ef4ed617562a1 = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'put',
})

updatefcf537c0ef09758de25ef4ed617562a1.definition = {
    methods: ["put","patch"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/admin/users/{user}'
*/
updatefcf537c0ef09758de25ef4ed617562a1.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return updatefcf537c0ef09758de25ef4ed617562a1.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/admin/users/{user}'
*/
updatefcf537c0ef09758de25ef4ed617562a1.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:70
* @route '/admin/users/{user}'
*/
updatefcf537c0ef09758de25ef4ed617562a1.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatefcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'patch',
})

export const update = {
    '/users/{user}': updatef898f2daa993cc45af847e1a1f899673,
    '/admin/users/{user}': updatefcf537c0ef09758de25ef4ed617562a1,
}

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:78
* @route '/users/{user}'
*/
const destroyf898f2daa993cc45af847e1a1f899673 = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyf898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'delete',
})

destroyf898f2daa993cc45af847e1a1f899673.definition = {
    methods: ["delete"],
    url: '/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:78
* @route '/users/{user}'
*/
destroyf898f2daa993cc45af847e1a1f899673.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return destroyf898f2daa993cc45af847e1a1f899673.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:78
* @route '/users/{user}'
*/
destroyf898f2daa993cc45af847e1a1f899673.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyf898f2daa993cc45af847e1a1f899673.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:78
* @route '/admin/users/{user}'
*/
const destroyfcf537c0ef09758de25ef4ed617562a1 = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyfcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'delete',
})

destroyfcf537c0ef09758de25ef4ed617562a1.definition = {
    methods: ["delete"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:78
* @route '/admin/users/{user}'
*/
destroyfcf537c0ef09758de25ef4ed617562a1.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return destroyfcf537c0ef09758de25ef4ed617562a1.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:78
* @route '/admin/users/{user}'
*/
destroyfcf537c0ef09758de25ef4ed617562a1.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyfcf537c0ef09758de25ef4ed617562a1.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/users/{user}': destroyf898f2daa993cc45af847e1a1f899673,
    '/admin/users/{user}': destroyfcf537c0ef09758de25ef4ed617562a1,
}

const UserController = { index, create, store, show, edit, update, destroy }

export default UserController