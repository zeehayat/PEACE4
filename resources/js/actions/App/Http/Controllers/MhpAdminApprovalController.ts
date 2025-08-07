import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:26
* @route '/mhp/sites/{site}/admin-approvals'
*/
export const index = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:26
* @route '/mhp/sites/{site}/admin-approvals'
*/
index.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

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
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:26
* @route '/mhp/sites/{site}/admin-approvals'
*/
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/create'
*/
export const create = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/admin-approvals/create',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/create'
*/
create.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

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
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:38
* @route '/mhp/sites/{site}/admin-approvals'
*/
export const store = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/sites/{site}/admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:38
* @route '/mhp/sites/{site}/admin-approvals'
*/
store.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

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
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:53
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
export const show = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:53
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
show.url = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

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
* @see app/Http/Controllers/MhpAdminApprovalController.php:53
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
show.get = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:53
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
show.head = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit'
*/
export const edit = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit'
*/
edit.url = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

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
edit.get = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}/edit'
*/
edit.head = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:63
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
export const update = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:63
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
update.url = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        admin_approval: args.admin_approval,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:63
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
update.put = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:63
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
update.patch = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:80
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
export const destroy = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:80
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
destroy.url = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            admin_approval: args[1],
        }
    }

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
* @see app/Http/Controllers/MhpAdminApprovalController.php:80
* @route '/mhp/sites/{site}/admin-approvals/{admin_approval}'
*/
destroy.delete = (args: { site: string | number, admin_approval: string | number } | [site: string | number, admin_approval: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MhpAdminApprovalController = { index, create, store, show, edit, update, destroy }

export default MhpAdminApprovalController