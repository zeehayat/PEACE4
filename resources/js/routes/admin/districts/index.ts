import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DistrictController::index
* @see app/Http/Controllers/DistrictController.php:16
* @route '/admin/districts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/districts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DistrictController::index
* @see app/Http/Controllers/DistrictController.php:16
* @route '/admin/districts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DistrictController::index
* @see app/Http/Controllers/DistrictController.php:16
* @route '/admin/districts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DistrictController::index
* @see app/Http/Controllers/DistrictController.php:16
* @route '/admin/districts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:23
* @route '/admin/districts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/districts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:23
* @route '/admin/districts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:23
* @route '/admin/districts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const districts = {
    index,
    store,
}

export default districts