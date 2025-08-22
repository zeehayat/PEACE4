import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::index
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions'
*/
export const index = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/irrigation/admin-approvals/{admin_approval}/cost-revisions',
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::index
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions'
*/
index.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::index
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions'
*/
index.get = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::index
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions'
*/
index.head = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::create
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/create'
*/
export const create = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/irrigation/admin-approvals/{admin_approval}/cost-revisions/create',
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::create
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/create'
*/
create.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return create.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::create
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/create'
*/
create.get = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::create
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/create'
*/
create.head = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::store
* @see app/Http/Controllers/IrrigationCostRevisionController.php:14
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions'
*/
export const store = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/irrigation/admin-approvals/{admin_approval}/cost-revisions',
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::store
* @see app/Http/Controllers/IrrigationCostRevisionController.php:14
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions'
*/
store.url = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return store.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::store
* @see app/Http/Controllers/IrrigationCostRevisionController.php:14
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions'
*/
store.post = (args: { admin_approval: string | number } | [admin_approval: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::show
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
export const show = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}',
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::show
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
show.url = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            admin_approval: args[0],
            cost_revision: args[1],
        }
    }

    const parsedArgs = {
        admin_approval: args.admin_approval,
        cost_revision: args.cost_revision,
    }

    return show.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::show
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
show.get = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::show
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
show.head = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::edit
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}/edit'
*/
export const edit = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::edit
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}/edit'
*/
edit.url = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            admin_approval: args[0],
            cost_revision: args[1],
        }
    }

    const parsedArgs = {
        admin_approval: args.admin_approval,
        cost_revision: args.cost_revision,
    }

    return edit.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::edit
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}/edit'
*/
edit.get = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::edit
* @see app/Http/Controllers/IrrigationCostRevisionController.php:0
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}/edit'
*/
edit.head = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::update
* @see app/Http/Controllers/IrrigationCostRevisionController.php:34
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
export const update = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}',
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::update
* @see app/Http/Controllers/IrrigationCostRevisionController.php:34
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
update.url = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            admin_approval: args[0],
            cost_revision: args[1],
        }
    }

    const parsedArgs = {
        admin_approval: args.admin_approval,
        cost_revision: args.cost_revision,
    }

    return update.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::update
* @see app/Http/Controllers/IrrigationCostRevisionController.php:34
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
update.put = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::update
* @see app/Http/Controllers/IrrigationCostRevisionController.php:34
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
update.patch = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::destroy
* @see app/Http/Controllers/IrrigationCostRevisionController.php:52
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
export const destroy = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}',
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::destroy
* @see app/Http/Controllers/IrrigationCostRevisionController.php:52
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
destroy.url = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            admin_approval: args[0],
            cost_revision: args[1],
        }
    }

    const parsedArgs = {
        admin_approval: args.admin_approval,
        cost_revision: args.cost_revision,
    }

    return destroy.definition.url
            .replace('{admin_approval}', parsedArgs.admin_approval.toString())
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCostRevisionController::destroy
* @see app/Http/Controllers/IrrigationCostRevisionController.php:52
* @route '/irrigation/admin-approvals/{admin_approval}/cost-revisions/{cost_revision}'
*/
destroy.delete = (args: { admin_approval: string | number, cost_revision: string | number } | [admin_approval: string | number, cost_revision: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const costRevisions = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default costRevisions