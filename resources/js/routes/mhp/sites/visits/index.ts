import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
export const index = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
index.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return index.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/mhp/sites/{site}/visits'
*/
export const store = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mhp/sites/{site}/visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/mhp/sites/{site}/visits'
*/
store.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return store.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/mhp/sites/{site}/visits'
*/
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
export const update = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/mhp/sites/{site}/visits/{visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
update.url = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
update.put = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
update.patch = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/mhp/sites/{site}/visits/{visit}'
*/
export const destroy = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mhp/sites/{site}/visits/{visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/mhp/sites/{site}/visits/{visit}'
*/
destroy.url = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/mhp/sites/{site}/visits/{visit}'
*/
destroy.delete = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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