import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
export const autoSearch = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: autoSearch.url(options),
    method: 'get',
})

autoSearch.definition = {
    methods: ["get","head"],
    url: '/vendors/auto-search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
autoSearch.url = (options?: RouteQueryOptions) => {
    return autoSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
autoSearch.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: autoSearch.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::autoSearch
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
autoSearch.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: autoSearch.url(options),
    method: 'head',
})

const vendors = {
    autoSearch,
}

export default vendors