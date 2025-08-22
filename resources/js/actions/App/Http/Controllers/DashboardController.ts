import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/'
*/
const index2922ba73aee8066b091270d31ff4c8f8 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index2922ba73aee8066b091270d31ff4c8f8.url(options),
    method: 'get',
})

index2922ba73aee8066b091270d31ff4c8f8.definition = {
    methods: ['get','head'],
    url: '/',
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/'
*/
index2922ba73aee8066b091270d31ff4c8f8.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index2922ba73aee8066b091270d31ff4c8f8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/'
*/
index2922ba73aee8066b091270d31ff4c8f8.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index2922ba73aee8066b091270d31ff4c8f8.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/'
*/
index2922ba73aee8066b091270d31ff4c8f8.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index2922ba73aee8066b091270d31ff4c8f8.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/dashboard'
*/
const indexe4446d8ebf548503a74323120a848d7c = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexe4446d8ebf548503a74323120a848d7c.url(options),
    method: 'get',
})

indexe4446d8ebf548503a74323120a848d7c.definition = {
    methods: ['get','head'],
    url: '/dashboard',
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/dashboard'
*/
indexe4446d8ebf548503a74323120a848d7c.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexe4446d8ebf548503a74323120a848d7c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/dashboard'
*/
indexe4446d8ebf548503a74323120a848d7c.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexe4446d8ebf548503a74323120a848d7c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/dashboard'
*/
indexe4446d8ebf548503a74323120a848d7c.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexe4446d8ebf548503a74323120a848d7c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/mhp-dashboard'
*/
const indexd5198ffaa2ec55cdf3655c37e5cad3a0 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexd5198ffaa2ec55cdf3655c37e5cad3a0.url(options),
    method: 'get',
})

indexd5198ffaa2ec55cdf3655c37e5cad3a0.definition = {
    methods: ['get','head'],
    url: '/mhp-dashboard',
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/mhp-dashboard'
*/
indexd5198ffaa2ec55cdf3655c37e5cad3a0.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexd5198ffaa2ec55cdf3655c37e5cad3a0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/mhp-dashboard'
*/
indexd5198ffaa2ec55cdf3655c37e5cad3a0.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexd5198ffaa2ec55cdf3655c37e5cad3a0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:19
* @route '/mhp-dashboard'
*/
indexd5198ffaa2ec55cdf3655c37e5cad3a0.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexd5198ffaa2ec55cdf3655c37e5cad3a0.url(options),
    method: 'head',
})

export const index = {
    '/': index2922ba73aee8066b091270d31ff4c8f8,
    '/dashboard': indexe4446d8ebf548503a74323120a848d7c,
    '/mhp-dashboard': indexd5198ffaa2ec55cdf3655c37e5cad3a0,
}

const DashboardController = { index }

export default DashboardController