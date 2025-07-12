import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals'
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
    url: '/mhp/mhp/admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::index
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals'
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
* @route '/mhp/mhp/admin-approvals'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/create'
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
    url: '/mhp/mhp/admin-approvals/create',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::create
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp/admin-approvals'
*/
const store96274e4f2ef7a0a66ee7f8cec4d6d39a = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store96274e4f2ef7a0a66ee7f8cec4d6d39a.url(options),
    method: 'post',
})

store96274e4f2ef7a0a66ee7f8cec4d6d39a.definition = {
    methods: ['post'],
    url: '/mhp/mhp/admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp/admin-approvals'
*/
store96274e4f2ef7a0a66ee7f8cec4d6d39a.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store96274e4f2ef7a0a66ee7f8cec4d6d39a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp/admin-approvals'
*/
store96274e4f2ef7a0a66ee7f8cec4d6d39a.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store96274e4f2ef7a0a66ee7f8cec4d6d39a.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp-admin-approvals'
*/
const storea91a6230fbd25e82fdf7c49261eb6f0b = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storea91a6230fbd25e82fdf7c49261eb6f0b.url(options),
    method: 'post',
})

storea91a6230fbd25e82fdf7c49261eb6f0b.definition = {
    methods: ['post'],
    url: '/mhp/mhp-admin-approvals',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp-admin-approvals'
*/
storea91a6230fbd25e82fdf7c49261eb6f0b.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storea91a6230fbd25e82fdf7c49261eb6f0b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::store
* @see app/Http/Controllers/MhpAdminApprovalController.php:12
* @route '/mhp/mhp-admin-approvals'
*/
storea91a6230fbd25e82fdf7c49261eb6f0b.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storea91a6230fbd25e82fdf7c49261eb6f0b.url(options),
    method: 'post',
})

export const store = {
    '/mhp/mhp/admin-approvals': store96274e4f2ef7a0a66ee7f8cec4d6d39a,
    '/mhp/mhp-admin-approvals': storea91a6230fbd25e82fdf7c49261eb6f0b,
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
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
    url: '/mhp/mhp/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::show
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
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
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
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
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
*/
show.head = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}/edit'
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
    url: '/mhp/mhp/admin-approvals/{admin_approval}/edit',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}/edit'
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
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}/edit'
*/
edit.get = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::edit
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}/edit'
*/
edit.head = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
*/
const update62a98c3697d8a1b3554fa24d4d12d36d = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update62a98c3697d8a1b3554fa24d4d12d36d.url(args, options),
    method: 'put',
})

update62a98c3697d8a1b3554fa24d4d12d36d.definition = {
    methods: ['put','patch'],
    url: '/mhp/mhp/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
*/
update62a98c3697d8a1b3554fa24d4d12d36d.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update62a98c3697d8a1b3554fa24d4d12d36d.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
*/
update62a98c3697d8a1b3554fa24d4d12d36d.put = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update62a98c3697d8a1b3554fa24d4d12d36d.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
*/
update62a98c3697d8a1b3554fa24d4d12d36d.patch = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update62a98c3697d8a1b3554fa24d4d12d36d.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp-admin-approvals/{id}'
*/
const update73bf34c70c16d8bb2eeeb5df544d0de0 = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update73bf34c70c16d8bb2eeeb5df544d0de0.url(args, options),
    method: 'put',
})

update73bf34c70c16d8bb2eeeb5df544d0de0.definition = {
    methods: ['put'],
    url: '/mhp/mhp-admin-approvals/{id}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp-admin-approvals/{id}'
*/
update73bf34c70c16d8bb2eeeb5df544d0de0.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update73bf34c70c16d8bb2eeeb5df544d0de0.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::update
* @see app/Http/Controllers/MhpAdminApprovalController.php:27
* @route '/mhp/mhp-admin-approvals/{id}'
*/
update73bf34c70c16d8bb2eeeb5df544d0de0.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update73bf34c70c16d8bb2eeeb5df544d0de0.url(args, options),
    method: 'put',
})

export const update = {
    '/mhp/mhp/admin-approvals/{admin_approval}': update62a98c3697d8a1b3554fa24d4d12d36d,
    '/mhp/mhp-admin-approvals/{id}': update73bf34c70c16d8bb2eeeb5df544d0de0,
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
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
    url: '/mhp/mhp/admin-approvals/{admin_approval}',
}

/**
* @see \App\Http\Controllers\MhpAdminApprovalController::destroy
* @see app/Http/Controllers/MhpAdminApprovalController.php:0
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
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
* @route '/mhp/mhp/admin-approvals/{admin_approval}'
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
* @see app/Http/Controllers/MhpAdminApprovalController.php:39
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
* @see app/Http/Controllers/MhpAdminApprovalController.php:39
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
* @see app/Http/Controllers/MhpAdminApprovalController.php:39
* @route '/mhp/revise-cost/{mhpSite}/{field}'
*/
updateRevisedCost.put = (args: { mhpSite: string | number, field: string | number } | [mhpSite: string | number, field: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updateRevisedCost.url(args, options),
    method: 'put',
})

const MhpAdminApprovalController = { index, create, store, show, edit, update, destroy, updateRevisedCost }

export default MhpAdminApprovalController