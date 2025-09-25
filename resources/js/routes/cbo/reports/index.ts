import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:15
* @route '/cbo/reports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cbo/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:15
* @route '/cbo/reports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:15
* @route '/cbo/reports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboReportController::index
* @see app/Http/Controllers/CboReportController.php:15
* @route '/cbo/reports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const reports = {
    index,
}

export default reports