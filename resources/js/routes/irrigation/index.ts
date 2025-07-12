import { queryParams, type QueryParams } from './../../wayfinder'
import irrigationSchemes from './irrigation-schemes'
import irrigationSchemeContracts from './irrigation-scheme-contracts'
import adminApprovals from './admin-approvals'
import completions from './completions'
/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
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
    url: '/irrigation/index',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const irrigation = {
    irrigationSchemes,
    irrigationSchemeContracts,
    adminApprovals,
    completions,
    index,
}

export default irrigation