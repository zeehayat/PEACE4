import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/irrigation-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const IrrigationDashboardController = { index }

export default IrrigationDashboardController