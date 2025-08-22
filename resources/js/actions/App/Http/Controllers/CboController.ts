import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboController::index
 * @see app/Http/Controllers/CboController.php:29
 * @route '/cbo/cbos'
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
    url: '/cbo/cbos',
}

/**
* @see \App\Http\Controllers\CboController::index
 * @see app/Http/Controllers/CboController.php:29
 * @route '/cbo/cbos'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::index
 * @see app/Http/Controllers/CboController.php:29
 * @route '/cbo/cbos'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CboController::index
 * @see app/Http/Controllers/CboController.php:29
 * @route '/cbo/cbos'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboController::create
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/create'
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
    url: '/cbo/cbos/create',
}

/**
* @see \App\Http\Controllers\CboController::create
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::create
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CboController::create
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboController::store
 * @see app/Http/Controllers/CboController.php:71
 * @route '/cbo/cbos'
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
    url: '/cbo/cbos',
}

/**
* @see \App\Http\Controllers\CboController::store
 * @see app/Http/Controllers/CboController.php:71
 * @route '/cbo/cbos'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::store
 * @see app/Http/Controllers/CboController.php:71
 * @route '/cbo/cbos'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboController::show
 * @see app/Http/Controllers/CboController.php:86
 * @route '/cbo/cbos/{cbo}'
 */
export const show = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}',
}

/**
* @see \App\Http\Controllers\CboController::show
 * @see app/Http/Controllers/CboController.php:86
 * @route '/cbo/cbos/{cbo}'
 */
show.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cbo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cbo: args[0],
                }
    }

    const parsedArgs = {
                        cbo: typeof args.cbo === 'object'
                ? args.cbo.id
                : args.cbo,
                }

    return show.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::show
 * @see app/Http/Controllers/CboController.php:86
 * @route '/cbo/cbos/{cbo}'
 */
show.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CboController::show
 * @see app/Http/Controllers/CboController.php:86
 * @route '/cbo/cbos/{cbo}'
 */
show.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboController::edit
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/edit'
 */
export const edit = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/edit',
}

/**
* @see \App\Http\Controllers\CboController::edit
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/edit'
 */
edit.url = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cbo: args[0],
                }
    }

    const parsedArgs = {
                        cbo: args.cbo,
                }

    return edit.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::edit
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/edit'
 */
edit.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CboController::edit
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/edit'
 */
edit.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboController::update
 * @see app/Http/Controllers/CboController.php:96
 * @route '/cbo/cbos/{cbo}'
 */
export const update = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/cbo/cbos/{cbo}',
}

/**
* @see \App\Http\Controllers\CboController::update
 * @see app/Http/Controllers/CboController.php:96
 * @route '/cbo/cbos/{cbo}'
 */
update.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cbo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cbo: args[0],
                }
    }

    const parsedArgs = {
                        cbo: typeof args.cbo === 'object'
                ? args.cbo.id
                : args.cbo,
                }

    return update.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::update
 * @see app/Http/Controllers/CboController.php:96
 * @route '/cbo/cbos/{cbo}'
 */
update.put = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CboController::update
 * @see app/Http/Controllers/CboController.php:96
 * @route '/cbo/cbos/{cbo}'
 */
update.patch = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboController::destroy
 * @see app/Http/Controllers/CboController.php:111
 * @route '/cbo/cbos/{cbo}'
 */
export const destroy = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/cbo/cbos/{cbo}',
}

/**
* @see \App\Http\Controllers\CboController::destroy
 * @see app/Http/Controllers/CboController.php:111
 * @route '/cbo/cbos/{cbo}'
 */
destroy.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cbo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cbo: args[0],
                }
    }

    const parsedArgs = {
                        cbo: typeof args.cbo === 'object'
                ? args.cbo.id
                : args.cbo,
                }

    return destroy.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::destroy
 * @see app/Http/Controllers/CboController.php:111
 * @route '/cbo/cbos/{cbo}'
 */
destroy.delete = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CboController::autoSearch
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/auto-search'
 */
export const autoSearch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})

autoSearch.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/auto-search',
}

/**
* @see \App\Http\Controllers\CboController::autoSearch
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/auto-search'
 */
autoSearch.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return autoSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::autoSearch
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/auto-search'
 */
autoSearch.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CboController::autoSearch
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/auto-search'
 */
autoSearch.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: autoSearch.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboController::details
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/details'
 */
export const details = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: details.url(args, options),
    method: 'get',
})

details.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/details',
}

/**
* @see \App\Http\Controllers\CboController::details
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/details'
 */
details.url = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cbo: args[0],
                }
    }

    const parsedArgs = {
                        cbo: args.cbo,
                }

    return details.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboController::details
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/details'
 */
details.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: details.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CboController::details
 * @see app/Http/Controllers/CboController.php:0
 * @route '/cbo/cbos/{cbo}/details'
 */
details.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: details.url(args, options),
    method: 'head',
})
const CboController = { index, create, store, show, edit, update, destroy, autoSearch, details }

export default CboController