import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import users from './users'
import roles from './roles'
import accessControl from './access-control'
/**
* @see \App\Http\Controllers\AdminDashboardController::__invoke
* @see app/Http/Controllers/AdminDashboardController.php:12
* @route '/admin'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::__invoke
* @see app/Http/Controllers/AdminDashboardController.php:12
* @route '/admin'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::__invoke
* @see app/Http/Controllers/AdminDashboardController.php:12
* @route '/admin'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::__invoke
* @see app/Http/Controllers/AdminDashboardController.php:12
* @route '/admin'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const admin = {
    users,
    dashboard,
    roles,
    accessControl,
}

export default admin