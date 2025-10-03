import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:17
* @route '/mhp/reports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mhp/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:17
* @route '/mhp/reports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:17
* @route '/mhp/reports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:17
* @route '/mhp/reports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:84
* @route '/mhp/reports/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:84
* @route '/mhp/reports/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:84
* @route '/mhp/reports/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:84
* @route '/mhp/reports/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const MhpReportController = { index, exportMethod, export: exportMethod }

export default MhpReportController