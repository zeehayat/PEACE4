import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
const index031f8caf5d7727210ffcf4f9d65d1082 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index031f8caf5d7727210ffcf4f9d65d1082.url(args, options),
    method: 'get',
})

index031f8caf5d7727210ffcf4f9d65d1082.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/dialogues',
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index031f8caf5d7727210ffcf4f9d65d1082.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
    }

    return index031f8caf5d7727210ffcf4f9d65d1082.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index031f8caf5d7727210ffcf4f9d65d1082.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index031f8caf5d7727210ffcf4f9d65d1082.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/cbos/{cbo}/dialogues'
*/
index031f8caf5d7727210ffcf4f9d65d1082.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index031f8caf5d7727210ffcf4f9d65d1082.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
const indexe565fdccfde12fb729cafeb96b2662f3 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexe565fdccfde12fb729cafeb96b2662f3.url(options),
    method: 'get',
})

indexe565fdccfde12fb729cafeb96b2662f3.definition = {
    methods: ['get','head'],
    url: '/cbo/dialogues',
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
indexe565fdccfde12fb729cafeb96b2662f3.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexe565fdccfde12fb729cafeb96b2662f3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
indexe565fdccfde12fb729cafeb96b2662f3.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexe565fdccfde12fb729cafeb96b2662f3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:27
* @route '/cbo/dialogues'
*/
indexe565fdccfde12fb729cafeb96b2662f3.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexe565fdccfde12fb729cafeb96b2662f3.url(options),
    method: 'head',
})

export const index = {
    '/cbo/cbos/{cbo}/dialogues': index031f8caf5d7727210ffcf4f9d65d1082,
    '/cbo/dialogues': indexe565fdccfde12fb729cafeb96b2662f3,
}

/**
* @see \App\Http\Controllers\CboDialogueController::create
* @see app/Http/Controllers/CboDialogueController.php:64
* @route '/cbo/cbos/{cbo}/dialogues/create'
*/
export const create = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/dialogues/create',
}

/**
* @see \App\Http\Controllers\CboDialogueController::create
* @see app/Http/Controllers/CboDialogueController.php:64
* @route '/cbo/cbos/{cbo}/dialogues/create'
*/
create.url = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cbo: args }
    }

    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
        }
    }

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
create.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::create
* @see app/Http/Controllers/CboDialogueController.php:64
* @route '/cbo/cbos/{cbo}/dialogues/create'
*/
create.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
const store031f8caf5d7727210ffcf4f9d65d1082 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store031f8caf5d7727210ffcf4f9d65d1082.url(args, options),
    method: 'post',
})

store031f8caf5d7727210ffcf4f9d65d1082.definition = {
    methods: ['post'],
    url: '/cbo/cbos/{cbo}/dialogues',
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
store031f8caf5d7727210ffcf4f9d65d1082.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
    }

    return store031f8caf5d7727210ffcf4f9d65d1082.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/cbos/{cbo}/dialogues'
*/
store031f8caf5d7727210ffcf4f9d65d1082.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store031f8caf5d7727210ffcf4f9d65d1082.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
const storee565fdccfde12fb729cafeb96b2662f3 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storee565fdccfde12fb729cafeb96b2662f3.url(options),
    method: 'post',
})

storee565fdccfde12fb729cafeb96b2662f3.definition = {
    methods: ['post'],
    url: '/cbo/dialogues',
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
storee565fdccfde12fb729cafeb96b2662f3.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storee565fdccfde12fb729cafeb96b2662f3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:72
* @route '/cbo/dialogues'
*/
storee565fdccfde12fb729cafeb96b2662f3.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storee565fdccfde12fb729cafeb96b2662f3.url(options),
    method: 'post',
})

export const store = {
    '/cbo/cbos/{cbo}/dialogues': store031f8caf5d7727210ffcf4f9d65d1082,
    '/cbo/dialogues': storee565fdccfde12fb729cafeb96b2662f3,
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
const showa037e525e26537c393c0e02d32798579 = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa037e525e26537c393c0e02d32798579.url(args, options),
    method: 'get',
})

showa037e525e26537c393c0e02d32798579.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
showa037e525e26537c393c0e02d32798579.url = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

    const parsedArgs = {
        cbo: args.cbo,
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return showa037e525e26537c393c0e02d32798579.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
showa037e525e26537c393c0e02d32798579.get = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa037e525e26537c393c0e02d32798579.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
showa037e525e26537c393c0e02d32798579.head = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showa037e525e26537c393c0e02d32798579.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
const show523efafa3ddca46e6b143ff99a59dac8 = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'get',
})

show523efafa3ddca46e6b143ff99a59dac8.definition = {
    methods: ['get','head'],
    url: '/cbo/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show523efafa3ddca46e6b143ff99a59dac8.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    const parsedArgs = {
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return show523efafa3ddca46e6b143ff99a59dac8.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show523efafa3ddca46e6b143ff99a59dac8.get = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:92
* @route '/cbo/dialogues/{dialogue}'
*/
show523efafa3ddca46e6b143ff99a59dac8.head = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'head',
})

export const show = {
    '/cbo/cbos/{cbo}/dialogues/{dialogue}': showa037e525e26537c393c0e02d32798579,
    '/cbo/dialogues/{dialogue}': show523efafa3ddca46e6b143ff99a59dac8,
}

/**
* @see \App\Http\Controllers\CboDialogueController::edit
* @see app/Http/Controllers/CboDialogueController.php:102
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit'
*/
export const edit = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit',
}

/**
* @see \App\Http\Controllers\CboDialogueController::edit
* @see app/Http/Controllers/CboDialogueController.php:102
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit'
*/
edit.url = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

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
edit.get = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::edit
* @see app/Http/Controllers/CboDialogueController.php:102
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}/edit'
*/
edit.head = (args: { cbo: string | number, dialogue: number | { id: number } } | [cbo: string | number, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
const updatea037e525e26537c393c0e02d32798579 = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatea037e525e26537c393c0e02d32798579.url(args, options),
    method: 'put',
})

updatea037e525e26537c393c0e02d32798579.definition = {
    methods: ['put','patch'],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
updatea037e525e26537c393c0e02d32798579.url = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return updatea037e525e26537c393c0e02d32798579.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
updatea037e525e26537c393c0e02d32798579.put = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatea037e525e26537c393c0e02d32798579.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
updatea037e525e26537c393c0e02d32798579.patch = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updatea037e525e26537c393c0e02d32798579.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
const update523efafa3ddca46e6b143ff99a59dac8 = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'put',
})

update523efafa3ddca46e6b143ff99a59dac8.definition = {
    methods: ['put','patch'],
    url: '/cbo/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update523efafa3ddca46e6b143ff99a59dac8.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    const parsedArgs = {
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return update523efafa3ddca46e6b143ff99a59dac8.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update523efafa3ddca46e6b143ff99a59dac8.put = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:110
* @route '/cbo/dialogues/{dialogue}'
*/
update523efafa3ddca46e6b143ff99a59dac8.patch = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'patch',
})

export const update = {
    '/cbo/cbos/{cbo}/dialogues/{dialogue}': updatea037e525e26537c393c0e02d32798579,
    '/cbo/dialogues/{dialogue}': update523efafa3ddca46e6b143ff99a59dac8,
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
const destroya037e525e26537c393c0e02d32798579 = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroya037e525e26537c393c0e02d32798579.url(args, options),
    method: 'delete',
})

destroya037e525e26537c393c0e02d32798579.definition = {
    methods: ['delete'],
    url: '/cbo/cbos/{cbo}/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
destroya037e525e26537c393c0e02d32798579.url = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            dialogue: args[1],
        }
    }

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return destroya037e525e26537c393c0e02d32798579.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/cbos/{cbo}/dialogues/{dialogue}'
*/
destroya037e525e26537c393c0e02d32798579.delete = (args: { cbo: number | { id: number }, dialogue: number | { id: number } } | [cbo: number | { id: number }, dialogue: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroya037e525e26537c393c0e02d32798579.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
const destroy523efafa3ddca46e6b143ff99a59dac8 = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'delete',
})

destroy523efafa3ddca46e6b143ff99a59dac8.definition = {
    methods: ['delete'],
    url: '/cbo/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
destroy523efafa3ddca46e6b143ff99a59dac8.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    const parsedArgs = {
        dialogue: typeof args.dialogue === 'object'
        ? args.dialogue.id
        : args.dialogue,
    }

    return destroy523efafa3ddca46e6b143ff99a59dac8.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:126
* @route '/cbo/dialogues/{dialogue}'
*/
destroy523efafa3ddca46e6b143ff99a59dac8.delete = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy523efafa3ddca46e6b143ff99a59dac8.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/cbo/cbos/{cbo}/dialogues/{dialogue}': destroya037e525e26537c393c0e02d32798579,
    '/cbo/dialogues/{dialogue}': destroy523efafa3ddca46e6b143ff99a59dac8,
}

const CboDialogueController = { index, create, store, show, edit, update, destroy }

export default CboDialogueController