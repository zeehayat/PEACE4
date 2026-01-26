import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
export const store = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mhp/sites/{site}/eme-info',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
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
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
store.post = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EmeInfoController::update
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
export const update = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/mhp/sites/{site}/eme-info',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EmeInfoController::update
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
update.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmeInfoController::update
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
update.put = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\EmeInfoController::update
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
update.patch = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

const emeInfo = {
    store,
    update,
}

export default emeInfo