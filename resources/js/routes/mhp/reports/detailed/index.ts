import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/detailed/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const detailed = {
    export: exportMethod,
}

export default detailed