import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectCostRevisionController::index
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions'
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
    url: '/procurement/cost-revisions',
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::index
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::index
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectCostRevisionController::index
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::create
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/create'
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
    url: '/procurement/cost-revisions/create',
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::create
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::create
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectCostRevisionController::create
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::store
 * @see app/Http/Controllers/ProjectCostRevisionController.php:11
 * @route '/procurement/cost-revisions'
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
    url: '/procurement/cost-revisions',
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::store
 * @see app/Http/Controllers/ProjectCostRevisionController.php:11
 * @route '/procurement/cost-revisions'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::store
 * @see app/Http/Controllers/ProjectCostRevisionController.php:11
 * @route '/procurement/cost-revisions'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::show
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
export const show = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/procurement/cost-revisions/{cost_revision}',
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::show
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
show.url = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cost_revision: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cost_revision: args[0],
                }
    }

    const parsedArgs = {
                        cost_revision: args.cost_revision,
                }

    return show.definition.url
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::show
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
show.get = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectCostRevisionController::show
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
show.head = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::edit
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}/edit'
 */
export const edit = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/procurement/cost-revisions/{cost_revision}/edit',
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::edit
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}/edit'
 */
edit.url = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cost_revision: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cost_revision: args[0],
                }
    }

    const parsedArgs = {
                        cost_revision: args.cost_revision,
                }

    return edit.definition.url
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::edit
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}/edit'
 */
edit.get = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectCostRevisionController::edit
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}/edit'
 */
edit.head = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::update
 * @see app/Http/Controllers/ProjectCostRevisionController.php:18
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
export const update = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/procurement/cost-revisions/{cost_revision}',
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::update
 * @see app/Http/Controllers/ProjectCostRevisionController.php:18
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
update.url = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cost_revision: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cost_revision: args[0],
                }
    }

    const parsedArgs = {
                        cost_revision: args.cost_revision,
                }

    return update.definition.url
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::update
 * @see app/Http/Controllers/ProjectCostRevisionController.php:18
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
update.put = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ProjectCostRevisionController::update
 * @see app/Http/Controllers/ProjectCostRevisionController.php:18
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
update.patch = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::destroy
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
export const destroy = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/procurement/cost-revisions/{cost_revision}',
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::destroy
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
destroy.url = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cost_revision: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cost_revision: args[0],
                }
    }

    const parsedArgs = {
                        cost_revision: args.cost_revision,
                }

    return destroy.definition.url
            .replace('{cost_revision}', parsedArgs.cost_revision.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectCostRevisionController::destroy
 * @see app/Http/Controllers/ProjectCostRevisionController.php:0
 * @route '/procurement/cost-revisions/{cost_revision}'
 */
destroy.delete = (args: { cost_revision: string | number } | [cost_revision: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ProjectCostRevisionController = { index, create, store, show, edit, update, destroy }

export default ProjectCostRevisionController