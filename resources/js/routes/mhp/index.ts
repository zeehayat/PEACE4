import { queryParams, type QueryParams } from './../../wayfinder'
import vendors from './vendors'
import sites from './sites'
import adminApprovals from './admin-approvals'
import physicalProgresses from './physical-progresses'
import financialInstallments from './financial-installments'
import media from './media'
/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:23
* @route '/mhp-dashboard'
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
    url: '/mhp-dashboard',
}

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:23
* @route '/mhp-dashboard'
*/
dashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:23
* @route '/mhp-dashboard'
*/
dashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:23
* @route '/mhp-dashboard'
*/
dashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: dashboard.url(options),
    method: 'head',
})

const mhp = {
    dashboard,
    vendors,
    sites,
    adminApprovals,
    physicalProgresses,
    financialInstallments,
    media,
}

export default mhp