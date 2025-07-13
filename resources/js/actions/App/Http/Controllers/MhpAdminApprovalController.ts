import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals'
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
    url: '/mhp/admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:14
* @route '/mhp/admin-approvals'
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
    url: '/mhp/admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:14
* @route '/mhp/admin-approvals'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:14
* @route '/mhp/admin-approvals'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals/{admin_approval}'
*/
export const show = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals/{admin_approval}'
*/
show.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { admin_approval: args }
    }

    if (Array.isArray(args)) {
        args = {
            admin_approval: args[0],
        }
    }

    const parsedArgs = {
        admin_approval: args.admin_approval,
    }

    return show.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals/{admin_approval}'
*/
show.get = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals/{admin_approval}'
*/
show.head = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:59
* @route '/mhp/admin-approvals/{admin_approval}'
*/
export const update = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:59
* @route '/mhp/admin-approvals/{admin_approval}'
*/
update.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { admin_approval: args }
    }

    if (Array.isArray(args)) {
        args = {
            admin_approval: args[0],
        }
    }

    const parsedArgs = {
        admin_approval: args.admin_approval,
    }

    return update.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:59
* @route '/mhp/admin-approvals/{admin_approval}'
*/
update.put = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:59
* @route '/mhp/admin-approvals/{admin_approval}'
*/
update.patch = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals/{admin_approval}'
*/
export const destroy = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals/{admin_approval}'
*/
destroy.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { admin_approval: args }
    }

    if (Array.isArray(args)) {
        args = {
            admin_approval: args[0],
        }
    }

    const parsedArgs = {
        admin_approval: args.admin_approval,
    }

    return destroy.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/admin-approvals/{admin_approval}'
*/
destroy.delete = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::updateRevisedCost
* @see app/Http/Controllers/MhpAdminApprovalController.php:108
* @route '/mhp/revise-cost/{mhpSite}/{field}'
*/
export const updateRevisedCost = (args: { mhpSite: string | number, field: string | number } | [mhpSite: string | number, field: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updateRevisedCost.url(args, options),
    method: 'put',
})

updateRevisedCost.definition = {
    methods: ['put'],
    url: '/mhp/revise-cost/{mhpSite}/{field}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::updateRevisedCost
* @see app/Http/Controllers/MhpAdminApprovalController.php:108
* @route '/mhp/revise-cost/{mhpSite}/{field}'
*/
updateRevisedCost.url = (args: { mhpSite: string | number, field: string | number } | [mhpSite: string | number, field: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updateRevisedCost.definition.url
            .replace('{mhpSite}', parsedArgs.mhpSite.toString())
            .replace('{field}', parsedArgs.field.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::updateRevisedCost
* @see app/Http/Controllers/MhpAdminApprovalController.php:108
* @route '/mhp/revise-cost/{mhpSite}/{field}'
*/
updateRevisedCost.put = (args: { mhpSite: string | number, field: string | number } | [mhpSite: string | number, field: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updateRevisedCost.url(args, options),
    method: 'put',
})

const MhpAdminApprovalController = { index, store, show, update, destroy, updateRevisedCost }

export default MhpAdminApprovalController