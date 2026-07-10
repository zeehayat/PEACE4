import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LrmCroController::index
* @see app/Http/Controllers/LrmCroController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/cros'
*/
export const index = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-committees/{lrm_committee}/cros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmCroController::index
* @see app/Http/Controllers/LrmCroController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/cros'
*/
index.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCroController::index
* @see app/Http/Controllers/LrmCroController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/cros'
*/
index.get = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmCroController::index
* @see app/Http/Controllers/LrmCroController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/cros'
*/
index.head = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmCroController::store
* @see app/Http/Controllers/LrmCroController.php:28
* @route '/lrm/lrm-committees/{lrm_committee}/cros'
*/
export const store = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/lrm/lrm-committees/{lrm_committee}/cros',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LrmCroController::store
* @see app/Http/Controllers/LrmCroController.php:28
* @route '/lrm/lrm-committees/{lrm_committee}/cros'
*/
store.url = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCroController::store
* @see app/Http/Controllers/LrmCroController.php:28
* @route '/lrm/lrm-committees/{lrm_committee}/cros'
*/
store.post = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LrmCroController::update
* @see app/Http/Controllers/LrmCroController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/cros/{cro}'
*/
export const update = (args: { lrm_committee: string | number, cro: number | { id: number } } | [lrm_committee: string | number, cro: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/lrm/lrm-committees/{lrm_committee}/cros/{cro}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\LrmCroController::update
* @see app/Http/Controllers/LrmCroController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/cros/{cro}'
*/
update.url = (args: { lrm_committee: string | number, cro: number | { id: number } } | [lrm_committee: string | number, cro: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
            cro: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
        cro: typeof args.cro === 'object'
        ? args.cro.id
        : args.cro,
    }

    return update.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace('{cro}', parsedArgs.cro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCroController::update
* @see app/Http/Controllers/LrmCroController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/cros/{cro}'
*/
update.put = (args: { lrm_committee: string | number, cro: number | { id: number } } | [lrm_committee: string | number, cro: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\LrmCroController::update
* @see app/Http/Controllers/LrmCroController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/cros/{cro}'
*/
update.patch = (args: { lrm_committee: string | number, cro: number | { id: number } } | [lrm_committee: string | number, cro: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\LrmCroController::destroy
* @see app/Http/Controllers/LrmCroController.php:40
* @route '/lrm/lrm-committees/{lrm_committee}/cros/{cro}'
*/
export const destroy = (args: { lrm_committee: string | number, cro: number | { id: number } } | [lrm_committee: string | number, cro: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/lrm/lrm-committees/{lrm_committee}/cros/{cro}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\LrmCroController::destroy
* @see app/Http/Controllers/LrmCroController.php:40
* @route '/lrm/lrm-committees/{lrm_committee}/cros/{cro}'
*/
destroy.url = (args: { lrm_committee: string | number, cro: number | { id: number } } | [lrm_committee: string | number, cro: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
            cro: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
        cro: typeof args.cro === 'object'
        ? args.cro.id
        : args.cro,
    }

    return destroy.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace('{cro}', parsedArgs.cro.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmCroController::destroy
* @see app/Http/Controllers/LrmCroController.php:40
* @route '/lrm/lrm-committees/{lrm_committee}/cros/{cro}'
*/
destroy.delete = (args: { lrm_committee: string | number, cro: number | { id: number } } | [lrm_committee: string | number, cro: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const LrmCroController = { index, store, update, destroy }

export default LrmCroController