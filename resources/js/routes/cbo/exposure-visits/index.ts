import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:19
* @route '/cbo/exposure-visits'
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
    url: '/cbo/exposure-visits',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:19
* @route '/cbo/exposure-visits'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:19
* @route '/cbo/exposure-visits'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:19
* @route '/cbo/exposure-visits'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:39
* @route '/cbo/exposure-visits'
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
    url: '/cbo/exposure-visits',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:39
* @route '/cbo/exposure-visits'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:39
* @route '/cbo/exposure-visits'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:30
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
export const show = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/cbo/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:30
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return show.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:30
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show.get = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:30
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show.head = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:74
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
export const update = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/cbo/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:74
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return update.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:74
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update.put = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:74
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update.patch = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:116
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
export const destroy = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/cbo/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:116
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return destroy.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:116
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy.delete = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
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