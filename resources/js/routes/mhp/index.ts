import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import vendors from './vendors'
import sites from './sites'
import adminApprovals from './admin-approvals'
import physicalProgresses from './physical-progresses'
import operationalCosts from './operational-costs'
import media from './media'
import reports from './reports'
import overview from './overview'
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

/**
* @see \App\Http\Controllers\MhpDashboardController::overview
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
export const overview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.definition = {
    methods: ["get","head"],
    url: '/mhp/overview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpDashboardController::overview
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpDashboardController::overview
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpDashboardController::overview
* @see app/Http/Controllers/MhpDashboardController.php:16
* @route '/mhp/overview'
*/
overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
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
    overview,
}

export default mhp