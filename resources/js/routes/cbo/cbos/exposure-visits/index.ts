import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
export const index = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/exposure-visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
    }

    return index.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
*/
export const create = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/exposure-visits/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
*/
create.url = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
    }

    return create.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
*/
create.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
*/
create.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
export const store = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cbo/cbos/{cbo}/exposure-visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
store.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
    }

    return store.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
store.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
export const show = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show.url = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return show.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show.get = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show.head = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
export const edit = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
edit.url = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return edit.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
edit.get = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
edit.head = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
export const update = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update.url = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return update.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update.put = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update.patch = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
export const destroy = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
destroy.url = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return destroy.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
destroy.delete = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const exposureVisits = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default exposureVisits