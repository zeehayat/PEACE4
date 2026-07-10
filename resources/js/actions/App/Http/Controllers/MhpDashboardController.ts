import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpDashboardController::index
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mhp/overview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpDashboardController::index
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpDashboardController::index
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpDashboardController::index
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpDashboardController::exportSchemes
* @see app/Http/Controllers/MhpDashboardController.php:243
* @route '/mhp/overview/export-schemes'
*/
export const exportSchemes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSchemes.url(options),
    method: 'get',
})

exportSchemes.definition = {
    methods: ["get","head"],
    url: '/mhp/overview/export-schemes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpDashboardController::exportSchemes
* @see app/Http/Controllers/MhpDashboardController.php:243
* @route '/mhp/overview/export-schemes'
*/
exportSchemes.url = (options?: RouteQueryOptions) => {
    return exportSchemes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpDashboardController::exportSchemes
* @see app/Http/Controllers/MhpDashboardController.php:243
* @route '/mhp/overview/export-schemes'
*/
exportSchemes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSchemes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpDashboardController::exportSchemes
* @see app/Http/Controllers/MhpDashboardController.php:243
* @route '/mhp/overview/export-schemes'
*/
exportSchemes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportSchemes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpDashboardController::exportCbos
* @see app/Http/Controllers/MhpDashboardController.php:286
* @route '/mhp/overview/export-cbos'
*/
export const exportCbos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCbos.url(options),
    method: 'get',
})

exportCbos.definition = {
    methods: ["get","head"],
    url: '/mhp/overview/export-cbos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpDashboardController::exportCbos
* @see app/Http/Controllers/MhpDashboardController.php:286
* @route '/mhp/overview/export-cbos'
*/
exportCbos.url = (options?: RouteQueryOptions) => {
    return exportCbos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpDashboardController::exportCbos
* @see app/Http/Controllers/MhpDashboardController.php:286
* @route '/mhp/overview/export-cbos'
*/
exportCbos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCbos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpDashboardController::exportCbos
* @see app/Http/Controllers/MhpDashboardController.php:286
* @route '/mhp/overview/export-cbos'
*/
exportCbos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCbos.url(options),
    method: 'head',
})

const MhpDashboardController = { index, exportSchemes, exportCbos }

export default MhpDashboardController