import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
const index2004dc1077984a4a811fc3e96180e3c0 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2004dc1077984a4a811fc3e96180e3c0.url(args, options),
    method: 'get',
})

index2004dc1077984a4a811fc3e96180e3c0.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/dialogues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index2004dc1077984a4a811fc3e96180e3c0.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index2004dc1077984a4a811fc3e96180e3c0.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index2004dc1077984a4a811fc3e96180e3c0.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2004dc1077984a4a811fc3e96180e3c0.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index2004dc1077984a4a811fc3e96180e3c0.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2004dc1077984a4a811fc3e96180e3c0.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
const index961e378b92a90f5e77c5f42233f4e39d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index961e378b92a90f5e77c5f42233f4e39d.url(options),
    method: 'get',
})

index961e378b92a90f5e77c5f42233f4e39d.definition = {
    methods: ["get","head"],
    url: '/cbo/dialogues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
index961e378b92a90f5e77c5f42233f4e39d.url = (options?: RouteQueryOptions) => {
    return index961e378b92a90f5e77c5f42233f4e39d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
index961e378b92a90f5e77c5f42233f4e39d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index961e378b92a90f5e77c5f42233f4e39d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
index961e378b92a90f5e77c5f42233f4e39d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index961e378b92a90f5e77c5f42233f4e39d.url(options),
    method: 'head',
})

export const index = {
    '/cbo/cbos/{cbo}/dialogues': index2004dc1077984a4a811fc3e96180e3c0,
    '/cbo/dialogues': index961e378b92a90f5e77c5f42233f4e39d,
}

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
const store2004dc1077984a4a811fc3e96180e3c0 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2004dc1077984a4a811fc3e96180e3c0.url(args, options),
    method: 'post',
})

store2004dc1077984a4a811fc3e96180e3c0.definition = {
    methods: ["post"],
    url: '/cbo/cbos/{cbo}/dialogues',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
store2004dc1077984a4a811fc3e96180e3c0.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store2004dc1077984a4a811fc3e96180e3c0.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
store2004dc1077984a4a811fc3e96180e3c0.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2004dc1077984a4a811fc3e96180e3c0.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
const store961e378b92a90f5e77c5f42233f4e39d = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store961e378b92a90f5e77c5f42233f4e39d.url(options),
    method: 'post',
})

store961e378b92a90f5e77c5f42233f4e39d.definition = {
    methods: ["post"],
    url: '/cbo/dialogues',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
store961e378b92a90f5e77c5f42233f4e39d.url = (options?: RouteQueryOptions) => {
    return store961e378b92a90f5e77c5f42233f4e39d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
store961e378b92a90f5e77c5f42233f4e39d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store961e378b92a90f5e77c5f42233f4e39d.url(options),
    method: 'post',
})

export const store = {
    '/cbo/cbos/{cbo}/dialogues': store2004dc1077984a4a811fc3e96180e3c0,
    '/cbo/dialogues': store961e378b92a90f5e77c5f42233f4e39d,
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
const showe5baace533350d97a86b2df0efbdd585 = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'get',
})

showe5baace533350d97a86b2df0efbdd585.definition = {
    methods: ["get","head"],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
showe5baace533350d97a86b2df0efbdd585.url = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return showe5baace533350d97a86b2df0efbdd585.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
showe5baace533350d97a86b2df0efbdd585.get = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
showe5baace533350d97a86b2df0efbdd585.head = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showe5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
const show7ab5d07649d31eb87f011c2f5c6b20c5 = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'get',
})

show7ab5d07649d31eb87f011c2f5c6b20c5.definition = {
    methods: ["get","head"],
    url: '/cbo/dialogues/{dialogue}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show7ab5d07649d31eb87f011c2f5c6b20c5.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show7ab5d07649d31eb87f011c2f5c6b20c5.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show7ab5d07649d31eb87f011c2f5c6b20c5.get = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show7ab5d07649d31eb87f011c2f5c6b20c5.head = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'head',
})

export const show = {
    '/cbo/cbos/{cbo}/dialogues/{dialogue}': showe5baace533350d97a86b2df0efbdd585,
    '/cbo/dialogues/{dialogue}': show7ab5d07649d31eb87f011c2f5c6b20c5,
}

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
const updatee5baace533350d97a86b2df0efbdd585 = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'put',
})

updatee5baace533350d97a86b2df0efbdd585.definition = {
    methods: ["put","patch"],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
updatee5baace533350d97a86b2df0efbdd585.url = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return updatee5baace533350d97a86b2df0efbdd585.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
updatee5baace533350d97a86b2df0efbdd585.put = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
updatee5baace533350d97a86b2df0efbdd585.patch = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatee5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
const update7ab5d07649d31eb87f011c2f5c6b20c5 = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'put',
})

update7ab5d07649d31eb87f011c2f5c6b20c5.definition = {
    methods: ["put","patch"],
    url: '/cbo/dialogues/{dialogue}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update7ab5d07649d31eb87f011c2f5c6b20c5.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update7ab5d07649d31eb87f011c2f5c6b20c5.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update7ab5d07649d31eb87f011c2f5c6b20c5.put = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update7ab5d07649d31eb87f011c2f5c6b20c5.patch = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'patch',
})

export const update = {
    '/cbo/cbos/{cbo}/dialogues/{dialogue}': updatee5baace533350d97a86b2df0efbdd585,
    '/cbo/dialogues/{dialogue}': update7ab5d07649d31eb87f011c2f5c6b20c5,
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
const destroye5baace533350d97a86b2df0efbdd585 = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'delete',
})

destroye5baace533350d97a86b2df0efbdd585.definition = {
    methods: ["delete"],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
destroye5baace533350d97a86b2df0efbdd585.url = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return destroye5baace533350d97a86b2df0efbdd585.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
destroye5baace533350d97a86b2df0efbdd585.delete = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye5baace533350d97a86b2df0efbdd585.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
const destroy7ab5d07649d31eb87f011c2f5c6b20c5 = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'delete',
})

destroy7ab5d07649d31eb87f011c2f5c6b20c5.definition = {
    methods: ["delete"],
    url: '/cbo/dialogues/{dialogue}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
destroy7ab5d07649d31eb87f011c2f5c6b20c5.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy7ab5d07649d31eb87f011c2f5c6b20c5.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
destroy7ab5d07649d31eb87f011c2f5c6b20c5.delete = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7ab5d07649d31eb87f011c2f5c6b20c5.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/cbo/cbos/{cbo}/dialogues/{dialogue}': destroye5baace533350d97a86b2df0efbdd585,
    '/cbo/dialogues/{dialogue}': destroy7ab5d07649d31eb87f011c2f5c6b20c5,
}

const CboDialogueController = { index, create, store, show, edit, update, destroy }

export default CboDialogueController