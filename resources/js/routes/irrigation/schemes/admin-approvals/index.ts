import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/schemes/{scheme}/admin-approvals'
*/
export const index = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/admin-approvals',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/schemes/{scheme}/admin-approvals'
*/
index.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
    }

    return index.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/schemes/{scheme}/admin-approvals'
*/
index.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::index
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:19
* @route '/irrigation/schemes/{scheme}/admin-approvals'
*/
index.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/create'
*/
export const create = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/admin-approvals/create',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/create'
*/
create.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
    }

    return create.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/create'
*/
create.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::create
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/create'
*/
create.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::store
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:25
* @route '/irrigation/schemes/{scheme}/admin-approvals'
*/
export const store = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/irrigation/schemes/{scheme}/admin-approvals',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::store
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:25
* @route '/irrigation/schemes/{scheme}/admin-approvals'
*/
store.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
    }

    return store.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::store
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:25
* @route '/irrigation/schemes/{scheme}/admin-approvals'
*/
store.post = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
export const show = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
show.url = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            admin_approval: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        admin_approval: args.admin_approval,
    }

    return show.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
show.get = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::show
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:111
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
show.head = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}/edit'
*/
export const edit = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}/edit'
*/
edit.url = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            admin_approval: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        admin_approval: args.admin_approval,
    }

    return edit.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}/edit'
*/
edit.get = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::edit
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:0
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}/edit'
*/
edit.head = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
export const update = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
update.url = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            admin_approval: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        admin_approval: args.admin_approval,
    }

    return update.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
update.put = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::update
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:59
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
update.patch = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::destroy
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:100
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
export const destroy = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::destroy
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:100
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
destroy.url = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            admin_approval: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        admin_approval: args.admin_approval,
    }

    return destroy.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationAdminApprovalController::destroy
* @see app/Http/Controllers/IrrigationAdminApprovalController.php:100
* @route '/irrigation/schemes/{scheme}/admin-approvals/{admin_approval}'
*/
destroy.delete = (args: { scheme: string | number, admin_approval: string | number } | [scheme: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
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