import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:37
* @route '/mhp/sites/{mhpSite}/completion'
*/
export const store = (args: { mhpSite: string | number } | [mhpSite: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/sites/{mhpSite}/completion',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:37
* @route '/mhp/sites/{mhpSite}/completion'
*/
store.url = (args: { mhpSite: string | number } | [mhpSite: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mhpSite: args }
    }

    if (Array.isArray(args)) {
        args = {
            mhpSite: args[0],
        }
    }

    const parsedArgs = {
        mhpSite: args.mhpSite,
    }

    return store.definition.url
            .replace('{mhpSite}', parsedArgs.mhpSite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:37
* @route '/mhp/sites/{mhpSite}/completion'
*/
store.post = (args: { mhpSite: string | number } | [mhpSite: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::update
* @see app/Http/Controllers/MhpCompletionController.php:62
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
export const update = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/mhp/sites/{mhpSite}/completion/{completion}',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::update
* @see app/Http/Controllers/MhpCompletionController.php:62
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
update.url = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            mhpSite: args[0],
            completion: args[1],
        }
    }

    const parsedArgs = {
        mhpSite: args.mhpSite,
        completion: typeof args.completion === 'object'
        ? args.completion.id
        : args.completion,
    }

    return update.definition.url
            .replace('{mhpSite}', parsedArgs.mhpSite.toString())
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::update
* @see app/Http/Controllers/MhpCompletionController.php:62
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
update.put = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:52
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
export const show = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{mhpSite}/completion/{completion}',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:52
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
show.url = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            mhpSite: args[0],
            completion: args[1],
        }
    }

    const parsedArgs = {
        mhpSite: args.mhpSite,
        completion: typeof args.completion === 'object'
        ? args.completion.id
        : args.completion,
    }

    return show.definition.url
            .replace('{mhpSite}', parsedArgs.mhpSite.toString())
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:52
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
show.get = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:52
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
show.head = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::destroy
* @see app/Http/Controllers/MhpCompletionController.php:78
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
export const destroy = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{mhpSite}/completion/{completion}',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::destroy
* @see app/Http/Controllers/MhpCompletionController.php:78
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
destroy.url = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            mhpSite: args[0],
            completion: args[1],
        }
    }

    const parsedArgs = {
        mhpSite: args.mhpSite,
        completion: typeof args.completion === 'object'
        ? args.completion.id
        : args.completion,
    }

    return destroy.definition.url
            .replace('{mhpSite}', parsedArgs.mhpSite.toString())
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::destroy
* @see app/Http/Controllers/MhpCompletionController.php:78
* @route '/mhp/sites/{mhpSite}/completion/{completion}'
*/
destroy.delete = (args: { mhpSite: string | number, completion: number | { id: number } } | [mhpSite: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MhpCompletionController = { store, update, show, destroy }

export default MhpCompletionController