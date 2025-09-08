import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationSchemeController::getSchemes
* @see app/Http/Controllers/IrrigationSchemeController.php:131
* @route '/irrigation/schemes/auto-search'
*/
export const getSchemes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSchemes.url(options),
    method: 'get',
})

getSchemes.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/auto-search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::getSchemes
* @see app/Http/Controllers/IrrigationSchemeController.php:131
* @route '/irrigation/schemes/auto-search'
*/
getSchemes.url = (options?: RouteQueryOptions) => {
    return getSchemes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::getSchemes
* @see app/Http/Controllers/IrrigationSchemeController.php:131
* @route '/irrigation/schemes/auto-search'
*/
getSchemes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSchemes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::getSchemes
* @see app/Http/Controllers/IrrigationSchemeController.php:131
* @route '/irrigation/schemes/auto-search'
*/
getSchemes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSchemes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:32
* @route '/irrigation/schemes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:32
* @route '/irrigation/schemes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:32
* @route '/irrigation/schemes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:32
* @route '/irrigation/schemes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:76
* @route '/irrigation/schemes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/irrigation/schemes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:76
* @route '/irrigation/schemes'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:76
* @route '/irrigation/schemes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:91
* @route '/irrigation/schemes/{scheme}'
*/
export const show = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:91
* @route '/irrigation/schemes/{scheme}'
*/
show.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheme: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return show.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:91
* @route '/irrigation/schemes/{scheme}'
*/
show.get = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:91
* @route '/irrigation/schemes/{scheme}'
*/
show.head = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
export const edit = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
edit.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
    }

    return edit.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
edit.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
edit.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:101
* @route '/irrigation/schemes/{scheme}'
*/
export const update = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/irrigation/schemes/{scheme}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:101
* @route '/irrigation/schemes/{scheme}'
*/
update.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheme: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return update.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:101
* @route '/irrigation/schemes/{scheme}'
*/
update.put = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:101
* @route '/irrigation/schemes/{scheme}'
*/
update.patch = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:116
* @route '/irrigation/schemes/{scheme}'
*/
export const destroy = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/irrigation/schemes/{scheme}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:116
* @route '/irrigation/schemes/{scheme}'
*/
destroy.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheme: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return destroy.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:116
* @route '/irrigation/schemes/{scheme}'
*/
destroy.delete = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const IrrigationSchemeController = { getSchemes, index, create, store, show, edit, update, destroy }

export default IrrigationSchemeController