import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CroReportController::index
* @see app/Http/Controllers/CroReportController.php:19
* @route '/cro/reports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cro/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CroReportController::index
* @see app/Http/Controllers/CroReportController.php:19
* @route '/cro/reports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroReportController::index
* @see app/Http/Controllers/CroReportController.php:19
* @route '/cro/reports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CroReportController::index
* @see app/Http/Controllers/CroReportController.php:19
* @route '/cro/reports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CroReportController::exportMethod
* @see app/Http/Controllers/CroReportController.php:38
* @route '/cro/reports/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/cro/reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CroReportController::exportMethod
* @see app/Http/Controllers/CroReportController.php:38
* @route '/cro/reports/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CroReportController::exportMethod
* @see app/Http/Controllers/CroReportController.php:38
* @route '/cro/reports/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CroReportController::exportMethod
* @see app/Http/Controllers/CroReportController.php:38
* @route '/cro/reports/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const reports = {
    index,
    export: exportMethod,
}

export default reports