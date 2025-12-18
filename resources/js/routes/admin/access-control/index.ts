import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AccessControlController::index
* @see app/Http/Controllers/AccessControlController.php:15
* @route '/admin/access-control'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/access-control',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AccessControlController::index
* @see app/Http/Controllers/AccessControlController.php:15
* @route '/admin/access-control'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccessControlController::index
* @see app/Http/Controllers/AccessControlController.php:15
* @route '/admin/access-control'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AccessControlController::index
* @see app/Http/Controllers/AccessControlController.php:15
* @route '/admin/access-control'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AccessControlController::store
* @see app/Http/Controllers/AccessControlController.php:41
* @route '/admin/access-control'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/access-control',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AccessControlController::store
* @see app/Http/Controllers/AccessControlController.php:41
* @route '/admin/access-control'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccessControlController::store
* @see app/Http/Controllers/AccessControlController.php:41
* @route '/admin/access-control'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const accessControl = {
    index,
    store,
}

export default accessControl