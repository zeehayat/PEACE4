import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:122
* @route '/vendors/auto-search'
*/
export const autoSearch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})

autoSearch.definition = {
    methods: ['get','head'],
    url: '/vendors/auto-search',
}

/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:122
* @route '/vendors/auto-search'
*/
autoSearch.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return autoSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:122
* @route '/vendors/auto-search'
*/
autoSearch.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:122
* @route '/vendors/auto-search'
*/
autoSearch.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: autoSearch.url(options),
    method: 'head',
})

const vendors = {
    autoSearch,
}

export default vendors