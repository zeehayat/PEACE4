import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cbo/exposure-visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cbo/exposure-visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
export const show = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cbo/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return show.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show.get = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show.head = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
export const update = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/cbo/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return update.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update.put = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update.patch = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
export const destroy = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cbo/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return destroy.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy.delete = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const exposureVisits = {
    index,
    store,
    show,
    update,
    destroy,
}

export default exposureVisits