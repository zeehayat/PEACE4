import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:26
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
export const index = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/physical-progresses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:26
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheme: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return index.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:26
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index.get = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:26
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index.head = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
export const create = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/physical-progresses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
create.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
create.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
create.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::store
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:54
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
export const store = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/irrigation/schemes/{scheme}/physical-progresses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::store
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:54
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
store.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheme: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return store.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::store
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:54
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
store.post = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const physicalProgresses = {
    index,
    create,
    store,
}

export default physicalProgresses