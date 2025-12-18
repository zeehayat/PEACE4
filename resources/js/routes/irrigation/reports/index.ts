import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationReportController::schemes
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
export const schemes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schemes.url(options),
    method: 'get',
})

schemes.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationReportController::schemes
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
schemes.url = (options?: RouteQueryOptions) => {
    return schemes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationReportController::schemes
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
schemes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schemes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationReportController::schemes
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
schemes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schemes.url(options),
    method: 'head',
})

const reports = {
    schemes,
}

export default reports