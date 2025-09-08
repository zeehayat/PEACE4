import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cbo/dialogues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cbo/dialogues',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
export const show = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cbo/dialogues/{dialogue}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dialogue: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dialogue: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dialogue: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return show.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show.get = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show.head = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
export const update = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/cbo/dialogues/{dialogue}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dialogue: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dialogue: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dialogue: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return update.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update.put = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update.patch = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
export const destroy = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cbo/dialogues/{dialogue}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
destroy.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dialogue: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dialogue: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dialogue: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return destroy.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
destroy.delete = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const dialogues = {
    index,
    store,
    show,
    update,
    destroy,
}

export default dialogues