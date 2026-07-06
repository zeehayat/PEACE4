import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
const index1b6b380f711c25940aa07f51facf6def = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1b6b380f711c25940aa07f51facf6def.url(args, options),
    method: 'get',
})

index1b6b380f711c25940aa07f51facf6def.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
index1b6b380f711c25940aa07f51facf6def.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return index1b6b380f711c25940aa07f51facf6def.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
index1b6b380f711c25940aa07f51facf6def.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1b6b380f711c25940aa07f51facf6def.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/mhp/sites/{site}/visits'
*/
index1b6b380f711c25940aa07f51facf6def.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index1b6b380f711c25940aa07f51facf6def.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
const index8c21a3babcf24b4922f795537830c076 = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8c21a3babcf24b4922f795537830c076.url(args, options),
    method: 'get',
})

index8c21a3babcf24b4922f795537830c076.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/visits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
index8c21a3babcf24b4922f795537830c076.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
    }

    return index8c21a3babcf24b4922f795537830c076.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
index8c21a3babcf24b4922f795537830c076.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8c21a3babcf24b4922f795537830c076.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::index
* @see app/Http/Controllers/ProjectVisitController.php:55
* @route '/irrigation/schemes/{scheme}/visits'
*/
index8c21a3babcf24b4922f795537830c076.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8c21a3babcf24b4922f795537830c076.url(args, options),
    method: 'head',
})

export const index = {
    '/mhp/sites/{site}/visits': index1b6b380f711c25940aa07f51facf6def,
    '/irrigation/schemes/{scheme}/visits': index8c21a3babcf24b4922f795537830c076,
}

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/mhp/sites/{site}/visits'
*/
const store1b6b380f711c25940aa07f51facf6def = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1b6b380f711c25940aa07f51facf6def.url(args, options),
    method: 'post',
})

store1b6b380f711c25940aa07f51facf6def.definition = {
    methods: ["post"],
    url: '/mhp/sites/{site}/visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/mhp/sites/{site}/visits'
*/
store1b6b380f711c25940aa07f51facf6def.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return store1b6b380f711c25940aa07f51facf6def.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/mhp/sites/{site}/visits'
*/
store1b6b380f711c25940aa07f51facf6def.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1b6b380f711c25940aa07f51facf6def.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/irrigation/schemes/{scheme}/visits'
*/
const store8c21a3babcf24b4922f795537830c076 = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8c21a3babcf24b4922f795537830c076.url(args, options),
    method: 'post',
})

store8c21a3babcf24b4922f795537830c076.definition = {
    methods: ["post"],
    url: '/irrigation/schemes/{scheme}/visits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/irrigation/schemes/{scheme}/visits'
*/
store8c21a3babcf24b4922f795537830c076.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
    }

    return store8c21a3babcf24b4922f795537830c076.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::store
* @see app/Http/Controllers/ProjectVisitController.php:70
* @route '/irrigation/schemes/{scheme}/visits'
*/
store8c21a3babcf24b4922f795537830c076.post = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8c21a3babcf24b4922f795537830c076.url(args, options),
    method: 'post',
})

export const store = {
    '/mhp/sites/{site}/visits': store1b6b380f711c25940aa07f51facf6def,
    '/irrigation/schemes/{scheme}/visits': store8c21a3babcf24b4922f795537830c076,
}

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
const update4f177ae52e9e132fbc08958be3a100a5 = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4f177ae52e9e132fbc08958be3a100a5.url(args, options),
    method: 'put',
})

update4f177ae52e9e132fbc08958be3a100a5.definition = {
    methods: ["put","patch"],
    url: '/mhp/sites/{site}/visits/{visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
update4f177ae52e9e132fbc08958be3a100a5.url = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return update4f177ae52e9e132fbc08958be3a100a5.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
update4f177ae52e9e132fbc08958be3a100a5.put = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4f177ae52e9e132fbc08958be3a100a5.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/mhp/sites/{site}/visits/{visit}'
*/
update4f177ae52e9e132fbc08958be3a100a5.patch = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update4f177ae52e9e132fbc08958be3a100a5.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
const update4eae85446368142b915cda28a8e30247 = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4eae85446368142b915cda28a8e30247.url(args, options),
    method: 'put',
})

update4eae85446368142b915cda28a8e30247.definition = {
    methods: ["put","patch"],
    url: '/irrigation/schemes/{scheme}/visits/{visit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
update4eae85446368142b915cda28a8e30247.url = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return update4eae85446368142b915cda28a8e30247.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
update4eae85446368142b915cda28a8e30247.put = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4eae85446368142b915cda28a8e30247.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::update
* @see app/Http/Controllers/ProjectVisitController.php:97
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
update4eae85446368142b915cda28a8e30247.patch = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update4eae85446368142b915cda28a8e30247.url(args, options),
    method: 'patch',
})

export const update = {
    '/mhp/sites/{site}/visits/{visit}': update4f177ae52e9e132fbc08958be3a100a5,
    '/irrigation/schemes/{scheme}/visits/{visit}': update4eae85446368142b915cda28a8e30247,
}

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/mhp/sites/{site}/visits/{visit}'
*/
const destroy4f177ae52e9e132fbc08958be3a100a5 = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4f177ae52e9e132fbc08958be3a100a5.url(args, options),
    method: 'delete',
})

destroy4f177ae52e9e132fbc08958be3a100a5.definition = {
    methods: ["delete"],
    url: '/mhp/sites/{site}/visits/{visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/mhp/sites/{site}/visits/{visit}'
*/
destroy4f177ae52e9e132fbc08958be3a100a5.url = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return destroy4f177ae52e9e132fbc08958be3a100a5.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/mhp/sites/{site}/visits/{visit}'
*/
destroy4f177ae52e9e132fbc08958be3a100a5.delete = (args: { site: string | number, visit: number | { id: number } } | [site: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4f177ae52e9e132fbc08958be3a100a5.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
const destroy4eae85446368142b915cda28a8e30247 = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4eae85446368142b915cda28a8e30247.url(args, options),
    method: 'delete',
})

destroy4eae85446368142b915cda28a8e30247.definition = {
    methods: ["delete"],
    url: '/irrigation/schemes/{scheme}/visits/{visit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
destroy4eae85446368142b915cda28a8e30247.url = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            visit: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
        visit: typeof args.visit === 'object'
        ? args.visit.id
        : args.visit,
    }

    return destroy4eae85446368142b915cda28a8e30247.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{visit}', parsedArgs.visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectVisitController::destroy
* @see app/Http/Controllers/ProjectVisitController.php:130
* @route '/irrigation/schemes/{scheme}/visits/{visit}'
*/
destroy4eae85446368142b915cda28a8e30247.delete = (args: { scheme: string | number, visit: number | { id: number } } | [scheme: string | number, visit: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4eae85446368142b915cda28a8e30247.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/mhp/sites/{site}/visits/{visit}': destroy4f177ae52e9e132fbc08958be3a100a5,
    '/irrigation/schemes/{scheme}/visits/{visit}': destroy4eae85446368142b915cda28a8e30247,
}

const ProjectVisitController = { index, store, update, destroy }

export default ProjectVisitController