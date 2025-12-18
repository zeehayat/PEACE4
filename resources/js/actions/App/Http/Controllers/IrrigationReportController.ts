import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationReportController::index
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationReportController::index
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationReportController::index
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationReportController::index
* @see app/Http/Controllers/IrrigationReportController.php:13
* @route '/irrigation/schemes/report'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const IrrigationReportController = { index }

export default IrrigationReportController