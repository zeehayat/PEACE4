import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:18
* @route '/cbo/dialogues'
*/
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/cbo/dialogues',
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:18
* @route '/cbo/dialogues'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:18
* @route '/cbo/dialogues'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::index
* @see app/Http/Controllers/CboDialogueController.php:18
* @route '/cbo/dialogues'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:47
* @route '/cbo/dialogues'
*/
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/cbo/dialogues',
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:47
* @route '/cbo/dialogues'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::store
* @see app/Http/Controllers/CboDialogueController.php:47
* @route '/cbo/dialogues'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:0
* @route '/cbo/dialogues/{dialogue}'
*/
export const show = (args: { dialogue: string | number } | [dialogue: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/cbo/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:0
* @route '/cbo/dialogues/{dialogue}'
*/
show.url = (args: { dialogue: string | number } | [dialogue: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dialogue: args }
    }

    if (Array.isArray(args)) {
        args = {
            dialogue: args[0],
        }
    }

    const parsedArgs = {
        dialogue: args.dialogue,
    }

    return show.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:0
* @route '/cbo/dialogues/{dialogue}'
*/
show.get = (args: { dialogue: string | number } | [dialogue: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboDialogueController::show
* @see app/Http/Controllers/CboDialogueController.php:0
* @route '/cbo/dialogues/{dialogue}'
*/
show.head = (args: { dialogue: string | number } | [dialogue: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:90
* @route '/cbo/dialogues/{dialogue}'
*/
export const update = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/cbo/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:90
* @route '/cbo/dialogues/{dialogue}'
*/
update.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:90
* @route '/cbo/dialogues/{dialogue}'
*/
update.put = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboDialogueController::update
* @see app/Http/Controllers/CboDialogueController.php:90
* @route '/cbo/dialogues/{dialogue}'
*/
update.patch = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:129
* @route '/cbo/dialogues/{dialogue}'
*/
export const destroy = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/cbo/dialogues/{dialogue}',
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:129
* @route '/cbo/dialogues/{dialogue}'
*/
destroy.url = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{dialogue}', parsedArgs.dialogue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboDialogueController::destroy
* @see app/Http/Controllers/CboDialogueController.php:129
* @route '/cbo/dialogues/{dialogue}'
*/
destroy.delete = (args: { dialogue: number | { id: number } } | [dialogue: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const CboDialogueController = { index, store, show, update, destroy }

export default CboDialogueController