import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
export const index = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
index.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
index.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
index.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/irrigation/schemes/{scheme}/visits'
*/
export const store = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/irrigation/schemes/{scheme}/visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/irrigation/schemes/{scheme}/visits'
*/
store.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/irrigation/schemes/{scheme}/visits'
*/
store.post = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
export const update = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/irrigation/schemes/{scheme}/visits/{visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
update.url = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return update.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
update.put = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
update.patch = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
export const destroy = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/irrigation/schemes/{scheme}/visits/{visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
destroy.url = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return destroy.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
destroy.delete = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const visits = {
    index,
    store,
    update,
    destroy,
}

export default visits