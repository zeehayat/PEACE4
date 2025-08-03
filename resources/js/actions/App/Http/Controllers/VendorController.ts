import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:17
* @route '/vendors/auto-search'
*/
export const getVendors = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getVendors.url(options),
    method: 'get',
})

getVendors.definition = {
    methods: ['get','head'],
    url: '/vendors/auto-search',
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:17
* @route '/vendors/auto-search'
*/
getVendors.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return getVendors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:17
* @route '/vendors/auto-search'
*/
getVendors.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getVendors.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:17
* @route '/vendors/auto-search'
*/
getVendors.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getVendors.url(options),
    method: 'head',
})

const VendorController = { getVendors }

export default VendorController