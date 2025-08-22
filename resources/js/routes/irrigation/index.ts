import { queryParams, type QueryParams } from './../../wayfinder'
import schemes from './schemes'
import physicalProgresses from './physical-progresses'
import adminApprovals from './admin-approvals'
/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
export const dashboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ['get','head'],
    url: '/irrigation-dashboard',
}

/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
dashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
dashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationDashboardController::dashboard
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
dashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
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