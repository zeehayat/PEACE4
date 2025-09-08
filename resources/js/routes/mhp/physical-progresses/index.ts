import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:104
* @route '/mhp/physical-progresses/{physical_progress}'
*/
export const show = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/mhp/physical-progresses/{physical_progress}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:104
* @route '/mhp/physical-progresses/{physical_progress}'
*/
show.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return show.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:104
* @route '/mhp/physical-progresses/{physical_progress}'
*/
show.get = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:104
* @route '/mhp/physical-progresses/{physical_progress}'
*/
show.head = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
export const edit = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/mhp/physical-progresses/{physical_progress}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
edit.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return edit.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
edit.get = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
edit.head = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:118
* @route '/mhp/physical-progresses/{physical_progress}'
*/
export const update = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/mhp/physical-progresses/{physical_progress}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:118
* @route '/mhp/physical-progresses/{physical_progress}'
*/
update.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return update.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:118
* @route '/mhp/physical-progresses/{physical_progress}'
*/
update.put = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:118
* @route '/mhp/physical-progresses/{physical_progress}'
*/
update.patch = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:150
* @route '/mhp/physical-progresses/{physical_progress}'
*/
export const destroy = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mhp/physical-progresses/{physical_progress}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:150
* @route '/mhp/physical-progresses/{physical_progress}'
*/
destroy.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return destroy.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:150
* @route '/mhp/physical-progresses/{physical_progress}'
*/
destroy.delete = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const physicalProgresses = {
    show,
    edit,
    update,
    destroy,
}

export default physicalProgresses