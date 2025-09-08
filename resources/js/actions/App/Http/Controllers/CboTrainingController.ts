import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
const indexa80ab20771c186a14f35722457593c1b = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa80ab20771c186a14f35722457593c1b.url(args, options),
    method: 'get',
})

indexa80ab20771c186a14f35722457593c1b.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/trainings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
indexa80ab20771c186a14f35722457593c1b.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cbo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
    }

    return indexa80ab20771c186a14f35722457593c1b.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
indexa80ab20771c186a14f35722457593c1b.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa80ab20771c186a14f35722457593c1b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
indexa80ab20771c186a14f35722457593c1b.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa80ab20771c186a14f35722457593c1b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
const indexb7ac9408542d3b44a00165f039867ce2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb7ac9408542d3b44a00165f039867ce2.url(options),
    method: 'get',
})

indexb7ac9408542d3b44a00165f039867ce2.definition = {
    methods: ["get","head"],
    url: '/cbo/trainings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
indexb7ac9408542d3b44a00165f039867ce2.url = (options?: RouteQueryOptions) => {
    return indexb7ac9408542d3b44a00165f039867ce2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
indexb7ac9408542d3b44a00165f039867ce2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb7ac9408542d3b44a00165f039867ce2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
indexb7ac9408542d3b44a00165f039867ce2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb7ac9408542d3b44a00165f039867ce2.url(options),
    method: 'head',
})

export const index = {
    '/cbo/cbos/{cbo}/trainings': indexa80ab20771c186a14f35722457593c1b,
    '/cbo/trainings': indexb7ac9408542d3b44a00165f039867ce2,
}

/**
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:66
* @route '/cbo/cbos/{cbo}/trainings/create'
*/
export const create = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/trainings/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:66
* @route '/cbo/cbos/{cbo}/trainings/create'
*/
create.url = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
    }

    return create.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:66
* @route '/cbo/cbos/{cbo}/trainings/create'
*/
create.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:66
* @route '/cbo/cbos/{cbo}/trainings/create'
*/
create.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/cbos/{cbo}/trainings'
*/
const storea80ab20771c186a14f35722457593c1b = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea80ab20771c186a14f35722457593c1b.url(args, options),
    method: 'post',
})

storea80ab20771c186a14f35722457593c1b.definition = {
    methods: ["post"],
    url: '/cbo/cbos/{cbo}/trainings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/cbos/{cbo}/trainings'
*/
storea80ab20771c186a14f35722457593c1b.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cbo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
    }

    return storea80ab20771c186a14f35722457593c1b.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/cbos/{cbo}/trainings'
*/
storea80ab20771c186a14f35722457593c1b.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea80ab20771c186a14f35722457593c1b.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/trainings'
*/
const storeb7ac9408542d3b44a00165f039867ce2 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb7ac9408542d3b44a00165f039867ce2.url(options),
    method: 'post',
})

storeb7ac9408542d3b44a00165f039867ce2.definition = {
    methods: ["post"],
    url: '/cbo/trainings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/trainings'
*/
storeb7ac9408542d3b44a00165f039867ce2.url = (options?: RouteQueryOptions) => {
    return storeb7ac9408542d3b44a00165f039867ce2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/trainings'
*/
storeb7ac9408542d3b44a00165f039867ce2.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb7ac9408542d3b44a00165f039867ce2.url(options),
    method: 'post',
})

export const store = {
    '/cbo/cbos/{cbo}/trainings': storea80ab20771c186a14f35722457593c1b,
    '/cbo/trainings': storeb7ac9408542d3b44a00165f039867ce2,
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
const show9d521b0d4fd464ba323eecb2e7e62ccb = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'get',
})

show9d521b0d4fd464ba323eecb2e7e62ccb.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show9d521b0d4fd464ba323eecb2e7e62ccb.url = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return show9d521b0d4fd464ba323eecb2e7e62ccb.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show9d521b0d4fd464ba323eecb2e7e62ccb.get = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show9d521b0d4fd464ba323eecb2e7e62ccb.head = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
const show057d54411cdd4a6750c134090861c6b7 = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'get',
})

show057d54411cdd4a6750c134090861c6b7.definition = {
    methods: ["get","head"],
    url: '/cbo/trainings/{training}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
show057d54411cdd4a6750c134090861c6b7.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return show057d54411cdd4a6750c134090861c6b7.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
show057d54411cdd4a6750c134090861c6b7.get = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
show057d54411cdd4a6750c134090861c6b7.head = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'head',
})

export const show = {
    '/cbo/cbos/{cbo}/trainings/{training}': show9d521b0d4fd464ba323eecb2e7e62ccb,
    '/cbo/trainings/{training}': show057d54411cdd4a6750c134090861c6b7,
}

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:98
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
export const edit = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/trainings/{training}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:98
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
edit.url = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return edit.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:98
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
edit.get = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:98
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
edit.head = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
const update9d521b0d4fd464ba323eecb2e7e62ccb = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'put',
})

update9d521b0d4fd464ba323eecb2e7e62ccb.definition = {
    methods: ["put","patch"],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update9d521b0d4fd464ba323eecb2e7e62ccb.url = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return update9d521b0d4fd464ba323eecb2e7e62ccb.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update9d521b0d4fd464ba323eecb2e7e62ccb.put = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update9d521b0d4fd464ba323eecb2e7e62ccb.patch = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
const update057d54411cdd4a6750c134090861c6b7 = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'put',
})

update057d54411cdd4a6750c134090861c6b7.definition = {
    methods: ["put","patch"],
    url: '/cbo/trainings/{training}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
update057d54411cdd4a6750c134090861c6b7.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return update057d54411cdd4a6750c134090861c6b7.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
update057d54411cdd4a6750c134090861c6b7.put = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
update057d54411cdd4a6750c134090861c6b7.patch = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'patch',
})

export const update = {
    '/cbo/cbos/{cbo}/trainings/{training}': update9d521b0d4fd464ba323eecb2e7e62ccb,
    '/cbo/trainings/{training}': update057d54411cdd4a6750c134090861c6b7,
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
const destroy9d521b0d4fd464ba323eecb2e7e62ccb = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'delete',
})

destroy9d521b0d4fd464ba323eecb2e7e62ccb.definition = {
    methods: ["delete"],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
destroy9d521b0d4fd464ba323eecb2e7e62ccb.url = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return destroy9d521b0d4fd464ba323eecb2e7e62ccb.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
destroy9d521b0d4fd464ba323eecb2e7e62ccb.delete = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9d521b0d4fd464ba323eecb2e7e62ccb.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/trainings/{training}'
*/
const destroy057d54411cdd4a6750c134090861c6b7 = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'delete',
})

destroy057d54411cdd4a6750c134090861c6b7.definition = {
    methods: ["delete"],
    url: '/cbo/trainings/{training}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/trainings/{training}'
*/
destroy057d54411cdd4a6750c134090861c6b7.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return destroy057d54411cdd4a6750c134090861c6b7.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/trainings/{training}'
*/
destroy057d54411cdd4a6750c134090861c6b7.delete = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy057d54411cdd4a6750c134090861c6b7.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/cbo/cbos/{cbo}/trainings/{training}': destroy9d521b0d4fd464ba323eecb2e7e62ccb,
    '/cbo/trainings/{training}': destroy057d54411cdd4a6750c134090861c6b7,
}

const CboTrainingController = { index, create, store, show, edit, update, destroy }

export default CboTrainingController