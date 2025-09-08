import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:26
* @route '/mhp/sites/{site}/admin-approvals'
*/
export const index = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/admin-approvals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:26
* @route '/mhp/sites/{site}/admin-approvals'
*/
index.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return index.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:26
* @route '/mhp/sites/{site}/admin-approvals'
*/
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:26
* @route '/mhp/sites/{site}/admin-approvals'
*/
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/create'
*/
export const create = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/admin-approvals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/create'
*/
create.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return create.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/create'
*/
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:38
* @route '/mhp/sites/{site}/admin-approvals'
*/
export const store = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mhp/sites/{site}/admin-approvals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:38
* @route '/mhp/sites/{site}/admin-approvals'
*/
store.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return store.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:38
* @route '/mhp/sites/{site}/admin-approvals'
*/
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:54
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
export const show = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:54
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
show.url = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        admin_approval: args.admin_approval,
    }

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:54
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
show.get = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:54
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
show.head = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit'
*/
export const edit = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit'
*/
edit.url = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        admin_approval: args.admin_approval,
    }

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit'
*/
edit.get = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit'
*/
edit.head = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:65
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
export const update = (args: { site: number | { id: number }, admin_approval: string | number } | [site: number | { id: number }, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:65
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
update.url = (args: { site: number | { id: number }, admin_approval: string | number } | [site: number | { id: number }, admin_approval: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
        admin_approval: args.admin_approval,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:65
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
update.put = (args: { site: number | { id: number }, admin_approval: string | number } | [site: number | { id: number }, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:65
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
update.patch = (args: { site: number | { id: number }, admin_approval: string | number } | [site: number | { id: number }, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:82
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
export const destroy = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:82
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
destroy.url = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        admin_approval: args.admin_approval,
    }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:82
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
destroy.delete = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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