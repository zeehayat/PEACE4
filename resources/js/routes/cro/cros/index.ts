import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CroController::index
* @see app/Http/Controllers/CroController.php:23
* @route '/cro/cros'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cro/cros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CroController::index
* @see app/Http/Controllers/CroController.php:23
* @route '/cro/cros'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroController::index
* @see app/Http/Controllers/CroController.php:23
* @route '/cro/cros'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CroController::index
* @see app/Http/Controllers/CroController.php:23
* @route '/cro/cros'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CroController::create
* @see app/Http/Controllers/CroController.php:46
* @route '/cro/cros/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cro/cros/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CroController::create
* @see app/Http/Controllers/CroController.php:46
* @route '/cro/cros/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroController::create
* @see app/Http/Controllers/CroController.php:46
* @route '/cro/cros/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CroController::create
* @see app/Http/Controllers/CroController.php:46
* @route '/cro/cros/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CroController::store
* @see app/Http/Controllers/CroController.php:56
* @route '/cro/cros'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cro/cros',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CroController::store
* @see app/Http/Controllers/CroController.php:56
* @route '/cro/cros'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroController::store
* @see app/Http/Controllers/CroController.php:56
* @route '/cro/cros'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CroController::show
* @see app/Http/Controllers/CroController.php:0
* @route '/cro/cros/{cro}'
*/
export const show = (args: { cro: string | number } | [cro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cro/cros/{cro}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CroController::show
* @see app/Http/Controllers/CroController.php:0
* @route '/cro/cros/{cro}'
*/
show.url = (args: { cro: string | number } | [cro: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cro: args }
    }

    if (Array.isArray(args)) {
        args = {
            cro: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cro: args.cro,
    }

    return show.definition.url
            .replace('{cro}', parsedArgs.cro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroController::show
* @see app/Http/Controllers/CroController.php:0
* @route '/cro/cros/{cro}'
*/
show.get = (args: { cro: string | number } | [cro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CroController::show
* @see app/Http/Controllers/CroController.php:0
* @route '/cro/cros/{cro}'
*/
show.head = (args: { cro: string | number } | [cro: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CroController::edit
* @see app/Http/Controllers/CroController.php:66
* @route '/cro/cros/{cro}/edit'
*/
export const edit = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/cro/cros/{cro}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CroController::edit
* @see app/Http/Controllers/CroController.php:66
* @route '/cro/cros/{cro}/edit'
*/
edit.url = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cro: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cro: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cro: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cro: typeof args.cro === 'object'
        ? args.cro.id
        : args.cro,
    }

    return edit.definition.url
            .replace('{cro}', parsedArgs.cro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroController::edit
* @see app/Http/Controllers/CroController.php:66
* @route '/cro/cros/{cro}/edit'
*/
edit.get = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CroController::edit
* @see app/Http/Controllers/CroController.php:66
* @route '/cro/cros/{cro}/edit'
*/
edit.head = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CroController::update
* @see app/Http/Controllers/CroController.php:77
* @route '/cro/cros/{cro}'
*/
export const update = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/cro/cros/{cro}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CroController::update
* @see app/Http/Controllers/CroController.php:77
* @route '/cro/cros/{cro}'
*/
update.url = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cro: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cro: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cro: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cro: typeof args.cro === 'object'
        ? args.cro.id
        : args.cro,
    }

    return update.definition.url
            .replace('{cro}', parsedArgs.cro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroController::update
* @see app/Http/Controllers/CroController.php:77
* @route '/cro/cros/{cro}'
*/
update.put = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CroController::update
* @see app/Http/Controllers/CroController.php:77
* @route '/cro/cros/{cro}'
*/
update.patch = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CroController::destroy
* @see app/Http/Controllers/CroController.php:87
* @route '/cro/cros/{cro}'
*/
export const destroy = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cro/cros/{cro}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CroController::destroy
* @see app/Http/Controllers/CroController.php:87
* @route '/cro/cros/{cro}'
*/
destroy.url = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cro: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cro: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cro: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cro: typeof args.cro === 'object'
        ? args.cro.id
        : args.cro,
    }

    return destroy.definition.url
            .replace('{cro}', parsedArgs.cro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroController::destroy
* @see app/Http/Controllers/CroController.php:87
* @route '/cro/cros/{cro}'
*/
destroy.delete = (args: { cro: number | { id: number } } | [cro: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const cros = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default cros