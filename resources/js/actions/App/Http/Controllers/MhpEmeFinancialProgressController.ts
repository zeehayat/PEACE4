import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::index
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:11
* @route '/mhp/mhp-eme-financial-progresses'
*/
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-eme-financial-progresses',
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::index
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:11
* @route '/mhp/mhp-eme-financial-progresses'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::index
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:11
* @route '/mhp/mhp-eme-financial-progresses'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::index
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:11
* @route '/mhp/mhp-eme-financial-progresses'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::store
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:40
* @route '/mhp/mhp-eme-financial-progresses'
*/
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/mhp-eme-financial-progresses',
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::store
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:40
* @route '/mhp/mhp-eme-financial-progresses'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::store
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:40
* @route '/mhp/mhp-eme-financial-progresses'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::update
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:65
* @route '/mhp/mhp-eme-financial-progresses/{progress}'
*/
export const update = (args: { progress: number | { id: number } } | [progress: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/mhp/mhp-eme-financial-progresses/{progress}',
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::update
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:65
* @route '/mhp/mhp-eme-financial-progresses/{progress}'
*/
update.url = (args: { progress: number | { id: number } } | [progress: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { progress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { progress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            progress: args[0],
        }
    }

    const parsedArgs = {
        progress: typeof args.progress === 'object'
        ? args.progress.id
        : args.progress,
    }

    return update.definition.url
            .replace('{progress}', parsedArgs.progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::update
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:65
* @route '/mhp/mhp-eme-financial-progresses/{progress}'
*/
update.post = (args: { progress: number | { id: number } } | [progress: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::destroy
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:87
* @route '/mhp/mhp-eme-financial-progresses/{progress}'
*/
export const destroy = (args: { progress: number | { id: number } } | [progress: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/mhp-eme-financial-progresses/{progress}',
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::destroy
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:87
* @route '/mhp/mhp-eme-financial-progresses/{progress}'
*/
destroy.url = (args: { progress: number | { id: number } } | [progress: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { progress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { progress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            progress: args[0],
        }
    }

    const parsedArgs = {
        progress: typeof args.progress === 'object'
        ? args.progress.id
        : args.progress,
    }

    return destroy.definition.url
            .replace('{progress}', parsedArgs.progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmeFinancialProgressController::destroy
* @see app/Http/Controllers/MhpEmeFinancialProgressController.php:87
* @route '/mhp/mhp-eme-financial-progresses/{progress}'
*/
destroy.delete = (args: { progress: number | { id: number } } | [progress: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MhpEmeFinancialProgressController = { index, store, update, destroy }

export default MhpEmeFinancialProgressController