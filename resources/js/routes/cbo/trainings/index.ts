import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cbo/trainings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/trainings'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cbo/trainings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/trainings'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:74
* @route '/cbo/trainings'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
export const show = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cbo/trainings/{training}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
show.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return show.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
show.get = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:88
* @route '/cbo/trainings/{training}'
*/
show.head = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
export const update = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/cbo/trainings/{training}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
update.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return update.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
update.put = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:106
* @route '/cbo/trainings/{training}'
*/
update.patch = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/trainings/{training}'
*/
export const destroy = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cbo/trainings/{training}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/trainings/{training}'
*/
destroy.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return destroy.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:124
* @route '/cbo/trainings/{training}'
*/
destroy.delete = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const trainings = {
    index,
    store,
    show,
    update,
    destroy,
}

export default trainings