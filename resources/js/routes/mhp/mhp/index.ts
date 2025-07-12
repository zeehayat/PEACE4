import { queryParams, type QueryParams } from './../../../wayfinder'
import sites from './sites'
import adminApprovals from './admin-approvals'
/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
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
    url: '/mhp/index',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::reviseCost
* @see app/Http/Controllers/MhpAdminApprovalController.php:39
* @route '/mhp/revise-cost/{mhpSite}/{field}'
*/
export const reviseCost = (args: { mhpSite: string | number, field: string | number } | [mhpSite: string | number, field: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: reviseCost.url(args, options),
    method: 'put',
})

reviseCost.definition = {
    methods: ['put'],
    url: '/mhp/revise-cost/{mhpSite}/{field}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::reviseCost
* @see app/Http/Controllers/MhpAdminApprovalController.php:39
* @route '/mhp/revise-cost/{mhpSite}/{field}'
*/
reviseCost.url = (args: { mhpSite: string | number, field: string | number } | [mhpSite: string | number, field: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            mhpSite: args[0],
            field: args[1],
        }
    }

    const parsedArgs = {
        mhpSite: args.mhpSite,
        field: args.field,
    }

    return reviseCost.definition.url
            .replace('{mhpSite}', parsedArgs.mhpSite.toString())
            .replace('{field}', parsedArgs.field.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::reviseCost
* @see app/Http/Controllers/MhpAdminApprovalController.php:39
* @route '/mhp/revise-cost/{mhpSite}/{field}'
*/
reviseCost.put = (args: { mhpSite: string | number, field: string | number } | [mhpSite: string | number, field: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: reviseCost.url(args, options),
    method: 'put',
})

const mhp = {
    sites,
    adminApprovals,
    index,
    reviseCost,
}

export default mhp