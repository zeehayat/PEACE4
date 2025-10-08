import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:16
* @route '/cbo/report'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cbo/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:16
* @route '/cbo/report'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:16
* @route '/cbo/report'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:16
* @route '/cbo/report'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboReportController::exportMethod
* @see app/Http/Controllers/CboReportController.php:97
* @route '/cbo/report/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/cbo/report/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboReportController::exportMethod
* @see app/Http/Controllers/CboReportController.php:97
* @route '/cbo/report/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboReportController::exportMethod
* @see app/Http/Controllers/CboReportController.php:97
* @route '/cbo/report/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboReportController::exportMethod
* @see app/Http/Controllers/CboReportController.php:97
* @route '/cbo/report/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const cbo = {
    index,
    export: exportMethod,
}

export default cbo