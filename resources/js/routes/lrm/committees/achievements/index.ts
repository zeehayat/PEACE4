import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LrmNrmAchievementController::index
* @see app/Http/Controllers/LrmNrmAchievementController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/achievements'
*/
export const index = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/lrm/lrm-committees/{lrm_committee}/achievements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::index
* @see app/Http/Controllers/LrmNrmAchievementController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/achievements'
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
* @see \App\Http\Controllers\LrmNrmAchievementController::index
* @see app/Http/Controllers/LrmNrmAchievementController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/achievements'
*/
index.get = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::index
* @see app/Http/Controllers/LrmNrmAchievementController.php:21
* @route '/lrm/lrm-committees/{lrm_committee}/achievements'
*/
index.head = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::store
* @see app/Http/Controllers/LrmNrmAchievementController.php:28
* @route '/lrm/lrm-committees/{lrm_committee}/achievements'
*/
export const store = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/lrm/lrm-committees/{lrm_committee}/achievements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::store
* @see app/Http/Controllers/LrmNrmAchievementController.php:28
* @route '/lrm/lrm-committees/{lrm_committee}/achievements'
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
* @see \App\Http\Controllers\LrmNrmAchievementController::store
* @see app/Http/Controllers/LrmNrmAchievementController.php:28
* @route '/lrm/lrm-committees/{lrm_committee}/achievements'
*/
store.post = (args: { lrm_committee: string | number } | [lrm_committee: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::update
* @see app/Http/Controllers/LrmNrmAchievementController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}'
*/
export const update = (args: { lrm_committee: string | number, achievement: number | { id: number } } | [lrm_committee: string | number, achievement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::update
* @see app/Http/Controllers/LrmNrmAchievementController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}'
*/
update.url = (args: { lrm_committee: string | number, achievement: number | { id: number } } | [lrm_committee: string | number, achievement: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
            achievement: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
        achievement: typeof args.achievement === 'object'
        ? args.achievement.id
        : args.achievement,
    }

    return update.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace('{achievement}', parsedArgs.achievement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::update
* @see app/Http/Controllers/LrmNrmAchievementController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}'
*/
update.put = (args: { lrm_committee: string | number, achievement: number | { id: number } } | [lrm_committee: string | number, achievement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::update
* @see app/Http/Controllers/LrmNrmAchievementController.php:34
* @route '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}'
*/
update.patch = (args: { lrm_committee: string | number, achievement: number | { id: number } } | [lrm_committee: string | number, achievement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::destroy
* @see app/Http/Controllers/LrmNrmAchievementController.php:40
* @route '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}'
*/
export const destroy = (args: { lrm_committee: string | number, achievement: number | { id: number } } | [lrm_committee: string | number, achievement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::destroy
* @see app/Http/Controllers/LrmNrmAchievementController.php:40
* @route '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}'
*/
destroy.url = (args: { lrm_committee: string | number, achievement: number | { id: number } } | [lrm_committee: string | number, achievement: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lrm_committee: args[0],
            achievement: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lrm_committee: args.lrm_committee,
        achievement: typeof args.achievement === 'object'
        ? args.achievement.id
        : args.achievement,
    }

    return destroy.definition.url
            .replace('{lrm_committee}', parsedArgs.lrm_committee.toString())
            .replace('{achievement}', parsedArgs.achievement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LrmNrmAchievementController::destroy
* @see app/Http/Controllers/LrmNrmAchievementController.php:40
* @route '/lrm/lrm-committees/{lrm_committee}/achievements/{achievement}'
*/
destroy.delete = (args: { lrm_committee: string | number, achievement: number | { id: number } } | [lrm_committee: string | number, achievement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const achievements = {
    index,
    store,
    update,
    destroy,
}

export default achievements