import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import schemes from './schemes'
import physicalProgresses from './physical-progresses'
import adminApprovals from './admin-approvals'
/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/irrigation-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const irrigation = {
    dashboard,
    schemes,
    physicalProgresses,
    adminApprovals,
}

export default irrigation