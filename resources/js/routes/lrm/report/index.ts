import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\LrmReportController::index
* @see app/Http/Controllers/LrmReportController.php:57
* @route '/lrm/lrm-report'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmReportController::index
* @see app/Http/Controllers/LrmReportController.php:57
* @route '/lrm/lrm-report'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmReportController::index
* @see app/Http/Controllers/LrmReportController.php:57
* @route '/lrm/lrm-report'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmReportController::index
* @see app/Http/Controllers/LrmReportController.php:57
* @route '/lrm/lrm-report'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmReportController::exportMethod
* @see app/Http/Controllers/LrmReportController.php:71
* @route '/lrm/lrm-report/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-report/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmReportController::exportMethod
* @see app/Http/Controllers/LrmReportController.php:71
* @route '/lrm/lrm-report/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmReportController::exportMethod
* @see app/Http/Controllers/LrmReportController.php:71
* @route '/lrm/lrm-report/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmReportController::exportMethod
* @see app/Http/Controllers/LrmReportController.php:71
* @route '/lrm/lrm-report/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const report = {
    index,
    export: exportMethod,
}

export default report