import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:24
* @route '/mhp/mhp-completion/store'
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
    url: '/mhp/mhp-completion/store',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:24
* @route '/mhp/mhp-completion/store'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:24
* @route '/mhp/mhp-completion/store'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

const mhpCompletion = {
    store,
}

export default mhpCompletion