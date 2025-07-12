import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp-admin-approvals'
*/
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/mhp-admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp-admin-approvals'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp-admin-approvals'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp-admin-approvals/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/mhp/mhp-admin-approvals/{id}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp-admin-approvals/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp-admin-approvals/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

const mhpAdminApprovals = {
    store,
    update,
}

export default mhpAdminApprovals