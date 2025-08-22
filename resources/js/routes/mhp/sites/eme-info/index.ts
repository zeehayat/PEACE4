import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EmeInfoController::store
 * @see app/Http/Controllers/EmeInfoController.php:14
 * @route '/mhp/sites/{site}/eme-info'
 */
export const store = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
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
store.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                }
    }

    const parsedArgs = {
                        site: args.site,
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
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})
const emeInfo = {
    store,
}

export default emeInfo