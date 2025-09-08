import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
const index7ed41c59b0760f161fa7e5777a0375f4 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7ed41c59b0760f161fa7e5777a0375f4.url(args, options),
    method: 'get',
})

index7ed41c59b0760f161fa7e5777a0375f4.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/exposure-visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index7ed41c59b0760f161fa7e5777a0375f4.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index7ed41c59b0760f161fa7e5777a0375f4.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index7ed41c59b0760f161fa7e5777a0375f4.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7ed41c59b0760f161fa7e5777a0375f4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index7ed41c59b0760f161fa7e5777a0375f4.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7ed41c59b0760f161fa7e5777a0375f4.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
const index5ae723aafbf85aace84276cadf57193c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5ae723aafbf85aace84276cadf57193c.url(options),
    method: 'get',
})

index5ae723aafbf85aace84276cadf57193c.definition = {
    methods: ["get","head"],
    url: '/cbo/exposure-visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
index5ae723aafbf85aace84276cadf57193c.url = (options?: RouteQueryOptions) => {
    return index5ae723aafbf85aace84276cadf57193c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
index5ae723aafbf85aace84276cadf57193c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5ae723aafbf85aace84276cadf57193c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
index5ae723aafbf85aace84276cadf57193c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index5ae723aafbf85aace84276cadf57193c.url(options),
    method: 'head',
})

export const index = {
    '/cbo/cbos/{cbo}/exposure-visits': index7ed41c59b0760f161fa7e5777a0375f4,
    '/cbo/exposure-visits': index5ae723aafbf85aace84276cadf57193c,
}

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
const store7ed41c59b0760f161fa7e5777a0375f4 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store7ed41c59b0760f161fa7e5777a0375f4.url(args, options),
    method: 'post',
})

store7ed41c59b0760f161fa7e5777a0375f4.definition = {
    methods: ["post"],
    url: '/cbo/cbos/{cbo}/exposure-visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
store7ed41c59b0760f161fa7e5777a0375f4.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store7ed41c59b0760f161fa7e5777a0375f4.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
store7ed41c59b0760f161fa7e5777a0375f4.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store7ed41c59b0760f161fa7e5777a0375f4.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
const store5ae723aafbf85aace84276cadf57193c = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store5ae723aafbf85aace84276cadf57193c.url(options),
    method: 'post',
})

store5ae723aafbf85aace84276cadf57193c.definition = {
    methods: ["post"],
    url: '/cbo/exposure-visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
store5ae723aafbf85aace84276cadf57193c.url = (options?: RouteQueryOptions) => {
    return store5ae723aafbf85aace84276cadf57193c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
store5ae723aafbf85aace84276cadf57193c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store5ae723aafbf85aace84276cadf57193c.url(options),
    method: 'post',
})

export const store = {
    '/cbo/cbos/{cbo}/exposure-visits': store7ed41c59b0760f161fa7e5777a0375f4,
    '/cbo/exposure-visits': store5ae723aafbf85aace84276cadf57193c,
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
const show909dd0d43e0939ff104e4cc5b80a1bc7 = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'get',
})

show909dd0d43e0939ff104e4cc5b80a1bc7.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show909dd0d43e0939ff104e4cc5b80a1bc7.url = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions) => {
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

    return show909dd0d43e0939ff104e4cc5b80a1bc7.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show909dd0d43e0939ff104e4cc5b80a1bc7.get = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show909dd0d43e0939ff104e4cc5b80a1bc7.head = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
const show3c56a156cb23b9da58d847d3bd100247 = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'get',
})

show3c56a156cb23b9da58d847d3bd100247.definition = {
    methods: ["get","head"],
    url: '/cbo/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show3c56a156cb23b9da58d847d3bd100247.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show3c56a156cb23b9da58d847d3bd100247.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show3c56a156cb23b9da58d847d3bd100247.get = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show3c56a156cb23b9da58d847d3bd100247.head = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'head',
})

export const show = {
    '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}': show909dd0d43e0939ff104e4cc5b80a1bc7,
    '/cbo/exposure-visits/{exposure_visit}': show3c56a156cb23b9da58d847d3bd100247,
}

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
const update909dd0d43e0939ff104e4cc5b80a1bc7 = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'put',
})

update909dd0d43e0939ff104e4cc5b80a1bc7.definition = {
    methods: ["put","patch"],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update909dd0d43e0939ff104e4cc5b80a1bc7.url = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions) => {
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

    return update909dd0d43e0939ff104e4cc5b80a1bc7.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update909dd0d43e0939ff104e4cc5b80a1bc7.put = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update909dd0d43e0939ff104e4cc5b80a1bc7.patch = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
const update3c56a156cb23b9da58d847d3bd100247 = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'put',
})

update3c56a156cb23b9da58d847d3bd100247.definition = {
    methods: ["put","patch"],
    url: '/cbo/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update3c56a156cb23b9da58d847d3bd100247.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update3c56a156cb23b9da58d847d3bd100247.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update3c56a156cb23b9da58d847d3bd100247.put = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update3c56a156cb23b9da58d847d3bd100247.patch = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'patch',
})

export const update = {
    '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}': update909dd0d43e0939ff104e4cc5b80a1bc7,
    '/cbo/exposure-visits/{exposure_visit}': update3c56a156cb23b9da58d847d3bd100247,
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
const destroy909dd0d43e0939ff104e4cc5b80a1bc7 = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'delete',
})

destroy909dd0d43e0939ff104e4cc5b80a1bc7.definition = {
    methods: ["delete"],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
destroy909dd0d43e0939ff104e4cc5b80a1bc7.url = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions) => {
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

    return destroy909dd0d43e0939ff104e4cc5b80a1bc7.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
destroy909dd0d43e0939ff104e4cc5b80a1bc7.delete = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy909dd0d43e0939ff104e4cc5b80a1bc7.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
const destroy3c56a156cb23b9da58d847d3bd100247 = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'delete',
})

destroy3c56a156cb23b9da58d847d3bd100247.definition = {
    methods: ["delete"],
    url: '/cbo/exposure-visits/{exposure_visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy3c56a156cb23b9da58d847d3bd100247.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy3c56a156cb23b9da58d847d3bd100247.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy3c56a156cb23b9da58d847d3bd100247.delete = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3c56a156cb23b9da58d847d3bd100247.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}': destroy909dd0d43e0939ff104e4cc5b80a1bc7,
    '/cbo/exposure-visits/{exposure_visit}': destroy3c56a156cb23b9da58d847d3bd100247,
}

const CboExposureVisitController = { index, create, store, show, edit, update, destroy }

export default CboExposureVisitController