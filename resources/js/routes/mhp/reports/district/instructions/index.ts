import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district/instructions/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const instructions = {
    export: exportMethod,
}

export default instructions