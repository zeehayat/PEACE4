import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
export const index = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/dialogues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::create
* @see app/Http/Controllers/CboDialogueController.php:64
* @route '/cbo/cbos/{cbo}/dialogues/create'
*/
export const create = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/dialogues/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::create
* @see app/Http/Controllers/CboDialogueController.php:64
* @route '/cbo/cbos/{cbo}/dialogues/create'
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
* @see \App\Http\Controllers\CboDialogueController::create
* @see app/Http/Controllers/CboDialogueController.php:64
* @route '/cbo/cbos/{cbo}/dialogues/create'
*/
create.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::create
* @see app/Http/Controllers/CboDialogueController.php:64
* @route '/cbo/cbos/{cbo}/dialogues/create'
*/
create.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
export const store = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cbo/cbos/{cbo}/dialogues',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
store.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
store.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
export const show = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
show.url = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return show.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
show.get = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
show.head = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::edit
* @see app/Http/Controllers/CboDialogueController.php:102
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit'
*/
export const edit = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::edit
* @see app/Http/Controllers/CboDialogueController.php:102
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit'
*/
edit.url = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: args.cbo,
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return edit.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::edit
* @see app/Http/Controllers/CboDialogueController.php:102
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit'
*/
edit.get = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::edit
* @see app/Http/Controllers/CboDialogueController.php:102
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit'
*/
edit.head = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
export const update = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
update.url = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return update.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
update.put = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
update.patch = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
export const destroy = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
destroy.url = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return destroy.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
destroy.delete = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const dialogues = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default dialogues