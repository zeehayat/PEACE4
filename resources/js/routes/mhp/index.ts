import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import vendors from './vendors'
import sites from './sites'
import adminApprovals from './admin-approvals'
import physicalProgresses from './physical-progresses'
import operationalCosts from './operational-costs'
import media from './media'
import reports from './reports'
/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:33
* @route '/mhp-dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/mhp-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:33
* @route '/mhp-dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:33
* @route '/mhp-dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:33
* @route '/mhp-dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const mhp = {
    dashboard,
    vendors,
    sites,
    adminApprovals,
    physicalProgresses,
    operationalCosts,
    media,
    reports,
}

export default mhp