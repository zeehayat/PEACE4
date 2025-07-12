import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/admin-approvals'
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
    url: '/irrigation/admin-approvals',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/admin-approvals'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/admin-approvals'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/admin-approvals'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/create'
*/
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/irrigation/admin-approvals/create',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::store
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:25
* @route '/irrigation/admin-approvals'
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
    url: '/irrigation/admin-approvals',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::store
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:25
* @route '/irrigation/admin-approvals'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::store
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:25
* @route '/irrigation/admin-approvals'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/admin-approvals/{admin_approval}'
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
    url: '/irrigation/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/admin-approvals/{admin_approval}'
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
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/admin-approvals/{admin_approval}'
*/
show.get = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/admin-approvals/{admin_approval}'
*/
show.head = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/edit'
*/
export const edit = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/admin-approvals/{admin_approval}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/edit'
*/
edit.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/edit'
*/
edit.get = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/edit'
*/
edit.head = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/admin-approvals/{admin_approval}'
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
    url: '/irrigation/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/admin-approvals/{admin_approval}'
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
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/admin-approvals/{admin_approval}'
*/
update.put = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/admin-approvals/{admin_approval}'
*/
update.patch = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::destroy
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:100
* @route '/irrigation/admin-approvals/{admin_approval}'
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
    url: '/irrigation/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::destroy
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:100
* @route '/irrigation/admin-approvals/{admin_approval}'
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
* @see \App\Http\Controllers\IrrigationAdminApprovalController::destroy
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:100
* @route '/irrigation/admin-approvals/{admin_approval}'
*/
destroy.delete = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const adminApprovals = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default adminApprovals