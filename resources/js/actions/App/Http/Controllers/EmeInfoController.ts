import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
const stored5a3a4716b7c71613d8cbaf7d52defaa = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored5a3a4716b7c71613d8cbaf7d52defaa.url(args, options),
    method: 'post',
})

stored5a3a4716b7c71613d8cbaf7d52defaa.definition = {
    methods: ["post"],
    url: '/mhp/sites/{site}/eme-info',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
stored5a3a4716b7c71613d8cbaf7d52defaa.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return stored5a3a4716b7c71613d8cbaf7d52defaa.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
stored5a3a4716b7c71613d8cbaf7d52defaa.post = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored5a3a4716b7c71613d8cbaf7d52defaa.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
const stored5a3a4716b7c71613d8cbaf7d52defaa = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: stored5a3a4716b7c71613d8cbaf7d52defaa.url(args, options),
    method: 'put',
})

stored5a3a4716b7c71613d8cbaf7d52defaa.definition = {
    methods: ["put","patch"],
    url: '/mhp/sites/{site}/eme-info',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
stored5a3a4716b7c71613d8cbaf7d52defaa.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return stored5a3a4716b7c71613d8cbaf7d52defaa.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
stored5a3a4716b7c71613d8cbaf7d52defaa.put = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: stored5a3a4716b7c71613d8cbaf7d52defaa.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
stored5a3a4716b7c71613d8cbaf7d52defaa.patch = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: stored5a3a4716b7c71613d8cbaf7d52defaa.url(args, options),
    method: 'patch',
})

export const store = {
    '/mhp/sites/{site}/eme-info': stored5a3a4716b7c71613d8cbaf7d52defaa,
    '/mhp/sites/{site}/eme-info': stored5a3a4716b7c71613d8cbaf7d52defaa,
}

const EmeInfoController = { store }

export default EmeInfoController