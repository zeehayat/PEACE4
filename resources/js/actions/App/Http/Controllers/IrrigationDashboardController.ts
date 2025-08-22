import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/irrigation-dashboard',
}

/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationDashboardController::index
* @see app/Http/Controllers/IrrigationDashboardController.php:17
* @route '/irrigation-dashboard'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const IrrigationDashboardController = { index }

export default IrrigationDashboardController