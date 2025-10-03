import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpSiteController::details
* @see app/Http/Controllers/MhpSiteController.php:170
* @route '/cbo/{mhpSite}/details'
*/
export const details = (args: { mhpSite: number | { id: number } } | [mhpSite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})

details.definition = {
    methods: ["get","head"],
    url: '/cbo/{mhpSite}/details',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpSiteController::details
* @see app/Http/Controllers/MhpSiteController.php:170
* @route '/cbo/{mhpSite}/details'
*/
details.url = (args: { mhpSite: number | { id: number } } | [mhpSite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mhpSite: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { mhpSite: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            mhpSite: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        mhpSite: typeof args.mhpSite === 'object'
        ? args.mhpSite.id
        : args.mhpSite,
    }

    return details.definition.url
            .replace('{mhpSite}', parsedArgs.mhpSite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::details
* @see app/Http/Controllers/MhpSiteController.php:170
* @route '/cbo/{mhpSite}/details'
*/
details.get = (args: { mhpSite: number | { id: number } } | [mhpSite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::details
* @see app/Http/Controllers/MhpSiteController.php:170
* @route '/cbo/{mhpSite}/details'
*/
details.head = (args: { mhpSite: number | { id: number } } | [mhpSite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: details.url(args, options),
    method: 'head',
})

const sites = {
    details,
}

export default sites