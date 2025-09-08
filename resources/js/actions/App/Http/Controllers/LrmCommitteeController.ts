import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LrmCommitteeController::index
* @see app/Http/Controllers/LrmCommitteeController.php:29
* @route '/lrm/lrm-committees'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-committees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmCommitteeController::index
* @see app/Http/Controllers/LrmCommitteeController.php:29
* @route '/lrm/lrm-committees'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::index
* @see app/Http/Controllers/LrmCommitteeController.php:29
* @route '/lrm/lrm-committees'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::index
* @see app/Http/Controllers/LrmCommitteeController.php:29
* @route '/lrm/lrm-committees'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::create
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-committees/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmCommitteeController::create
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::create
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::create
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::store
* @see app/Http/Controllers/LrmCommitteeController.php:74
* @route '/lrm/lrm-committees'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/lrm/lrm-committees',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LrmCommitteeController::store
* @see app/Http/Controllers/LrmCommitteeController.php:74
* @route '/lrm/lrm-committees'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::store
* @see app/Http/Controllers/LrmCommitteeController.php:74
* @route '/lrm/lrm-committees'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::show
* @see app/Http/Controllers/LrmCommitteeController.php:88
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
export const show = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-committees/{lrm_committee}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmCommitteeController::show
* @see app/Http/Controllers/LrmCommitteeController.php:88
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
show.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
    }

    return show.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::show
* @see app/Http/Controllers/LrmCommitteeController.php:88
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
show.get = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::show
* @see app/Http/Controllers/LrmCommitteeController.php:88
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
show.head = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::edit
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/{lrm_committee}/edit'
*/
export const edit = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-committees/{lrm_committee}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmCommitteeController::edit
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/{lrm_committee}/edit'
*/
edit.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
    }

    return edit.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::edit
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/{lrm_committee}/edit'
*/
edit.get = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::edit
* @see app/Http/Controllers/LrmCommitteeController.php:0
* @route '/lrm/lrm-committees/{lrm_committee}/edit'
*/
edit.head = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::update
* @see app/Http/Controllers/LrmCommitteeController.php:97
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
export const update = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/lrm/lrm-committees/{lrm_committee}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\LrmCommitteeController::update
* @see app/Http/Controllers/LrmCommitteeController.php:97
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
update.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
    }

    return update.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::update
* @see app/Http/Controllers/LrmCommitteeController.php:97
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
update.put = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::update
* @see app/Http/Controllers/LrmCommitteeController.php:97
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
update.patch = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::destroy
* @see app/Http/Controllers/LrmCommitteeController.php:111
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
export const destroy = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/lrm/lrm-committees/{lrm_committee}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\LrmCommitteeController::destroy
* @see app/Http/Controllers/LrmCommitteeController.php:111
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
destroy.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
    }

    return destroy.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::destroy
* @see app/Http/Controllers/LrmCommitteeController.php:111
* @route '/lrm/lrm-committees/{lrm_committee}'
*/
destroy.delete = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const LrmCommitteeController = { index, create, store, show, edit, update, destroy }

export default LrmCommitteeController