import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LrmCommitteeController::index
 * @see app/Http/Controllers/LrmCommitteeController.php:29
 * @route '/lrm/lrm-committees'
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
    url: '/lrm/lrm-committees',
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::index
 * @see app/Http/Controllers/LrmCommitteeController.php:29
 * @route '/lrm/lrm-committees'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::index
 * @see app/Http/Controllers/LrmCommitteeController.php:29
 * @route '/lrm/lrm-committees'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LrmCommitteeController::index
 * @see app/Http/Controllers/LrmCommitteeController.php:29
 * @route '/lrm/lrm-committees'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::create
 * @see app/Http/Controllers/LrmCommitteeController.php:0
 * @route '/lrm/lrm-committees/create'
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
    url: '/lrm/lrm-committees/create',
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::create
 * @see app/Http/Controllers/LrmCommitteeController.php:0
 * @route '/lrm/lrm-committees/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::create
 * @see app/Http/Controllers/LrmCommitteeController.php:0
 * @route '/lrm/lrm-committees/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LrmCommitteeController::create
 * @see app/Http/Controllers/LrmCommitteeController.php:0
 * @route '/lrm/lrm-committees/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::store
 * @see app/Http/Controllers/LrmCommitteeController.php:74
 * @route '/lrm/lrm-committees'
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
    url: '/lrm/lrm-committees',
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::store
 * @see app/Http/Controllers/LrmCommitteeController.php:74
 * @route '/lrm/lrm-committees'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::store
 * @see app/Http/Controllers/LrmCommitteeController.php:74
 * @route '/lrm/lrm-committees'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::show
 * @see app/Http/Controllers/LrmCommitteeController.php:88
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
export const show = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/lrm/lrm-committees/{lrm_committee}',
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::show
 * @see app/Http/Controllers/LrmCommitteeController.php:88
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
show.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lrm_committee: args[0],
                }
    }

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
show.get = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LrmCommitteeController::show
 * @see app/Http/Controllers/LrmCommitteeController.php:88
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
show.head = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::edit
 * @see app/Http/Controllers/LrmCommitteeController.php:0
 * @route '/lrm/lrm-committees/{lrm_committee}/edit'
 */
export const edit = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/lrm/lrm-committees/{lrm_committee}/edit',
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::edit
 * @see app/Http/Controllers/LrmCommitteeController.php:0
 * @route '/lrm/lrm-committees/{lrm_committee}/edit'
 */
edit.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lrm_committee: args[0],
                }
    }

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
edit.get = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LrmCommitteeController::edit
 * @see app/Http/Controllers/LrmCommitteeController.php:0
 * @route '/lrm/lrm-committees/{lrm_committee}/edit'
 */
edit.head = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::update
 * @see app/Http/Controllers/LrmCommitteeController.php:97
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
export const update = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/lrm/lrm-committees/{lrm_committee}',
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::update
 * @see app/Http/Controllers/LrmCommitteeController.php:97
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
update.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lrm_committee: args[0],
                }
    }

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
update.put = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\LrmCommitteeController::update
 * @see app/Http/Controllers/LrmCommitteeController.php:97
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
update.patch = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\LrmCommitteeController::destroy
 * @see app/Http/Controllers/LrmCommitteeController.php:111
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
export const destroy = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/lrm/lrm-committees/{lrm_committee}',
}

/**
* @see \App\Http\Controllers\LrmCommitteeController::destroy
 * @see app/Http/Controllers/LrmCommitteeController.php:111
 * @route '/lrm/lrm-committees/{lrm_committee}'
 */
destroy.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lrm_committee: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lrm_committee: args[0],
                }
    }

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
destroy.delete = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const LrmCommitteeController = { index, create, store, show, edit, update, destroy }

export default LrmCommitteeController