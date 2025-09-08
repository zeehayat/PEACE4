import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
export const index = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/physical-progresses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { site: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
    }

    return index.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
export const create = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/physical-progresses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:75
* @route '/mhp/sites/{site}/physical-progresses'
*/
export const store = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mhp/sites/{site}/physical-progresses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:75
* @route '/mhp/sites/{site}/physical-progresses'
*/
store.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { site: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
    }

    return store.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:75
* @route '/mhp/sites/{site}/physical-progresses'
*/
store.post = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const physicalProgresses = {
    index,
    create,
    store,
}

export default physicalProgresses