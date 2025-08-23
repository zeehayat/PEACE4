import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
export const store = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/sites/{site}/eme-info',
}

/**
* @see \App\Http\Controllers\EmeInfoController::store
* @see app/Http/Controllers/EmeInfoController.php:14
* @route '/mhp/sites/{site}/eme-info'
*/
store.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
store.post = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

const EmeInfoController = { store }

export default EmeInfoController