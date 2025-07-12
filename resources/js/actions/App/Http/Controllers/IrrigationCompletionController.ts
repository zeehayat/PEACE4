import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationCompletionController::index
* @see app/Http/Controllers/IrrigationCompletionController.php:17
* @route '/irrigation/completions'
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
    url: '/irrigation/completions',
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::index
* @see app/Http/Controllers/IrrigationCompletionController.php:17
* @route '/irrigation/completions'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::index
* @see app/Http/Controllers/IrrigationCompletionController.php:17
* @route '/irrigation/completions'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::index
* @see app/Http/Controllers/IrrigationCompletionController.php:17
* @route '/irrigation/completions'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::create
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/create'
*/
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/irrigation/completions/create',
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::create
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::create
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::create
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::store
* @see app/Http/Controllers/IrrigationCompletionController.php:23
* @route '/irrigation/completions'
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
    url: '/irrigation/completions',
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::store
* @see app/Http/Controllers/IrrigationCompletionController.php:23
* @route '/irrigation/completions'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::store
* @see app/Http/Controllers/IrrigationCompletionController.php:23
* @route '/irrigation/completions'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::show
* @see app/Http/Controllers/IrrigationCompletionController.php:111
* @route '/irrigation/completions/{completion}'
*/
export const show = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/completions/{completion}',
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::show
* @see app/Http/Controllers/IrrigationCompletionController.php:111
* @route '/irrigation/completions/{completion}'
*/
show.url = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { completion: args }
    }

    if (Array.isArray(args)) {
        args = {
            completion: args[0],
        }
    }

    const parsedArgs = {
        completion: args.completion,
    }

    return show.definition.url
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::show
* @see app/Http/Controllers/IrrigationCompletionController.php:111
* @route '/irrigation/completions/{completion}'
*/
show.get = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::show
* @see app/Http/Controllers/IrrigationCompletionController.php:111
* @route '/irrigation/completions/{completion}'
*/
show.head = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::edit
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/{completion}/edit'
*/
export const edit = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/completions/{completion}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::edit
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/{completion}/edit'
*/
edit.url = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { completion: args }
    }

    if (Array.isArray(args)) {
        args = {
            completion: args[0],
        }
    }

    const parsedArgs = {
        completion: args.completion,
    }

    return edit.definition.url
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::edit
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/{completion}/edit'
*/
edit.get = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::edit
* @see app/Http/Controllers/IrrigationCompletionController.php:0
* @route '/irrigation/completions/{completion}/edit'
*/
edit.head = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::update
* @see app/Http/Controllers/IrrigationCompletionController.php:58
* @route '/irrigation/completions/{completion}'
*/
export const update = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/completions/{completion}',
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::update
* @see app/Http/Controllers/IrrigationCompletionController.php:58
* @route '/irrigation/completions/{completion}'
*/
update.url = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { completion: args }
    }

    if (Array.isArray(args)) {
        args = {
            completion: args[0],
        }
    }

    const parsedArgs = {
        completion: args.completion,
    }

    return update.definition.url
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::update
* @see app/Http/Controllers/IrrigationCompletionController.php:58
* @route '/irrigation/completions/{completion}'
*/
update.put = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::update
* @see app/Http/Controllers/IrrigationCompletionController.php:58
* @route '/irrigation/completions/{completion}'
*/
update.patch = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationCompletionController::destroy
* @see app/Http/Controllers/IrrigationCompletionController.php:100
* @route '/irrigation/completions/{completion}'
*/
export const destroy = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/completions/{completion}',
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::destroy
* @see app/Http/Controllers/IrrigationCompletionController.php:100
* @route '/irrigation/completions/{completion}'
*/
destroy.url = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { completion: args }
    }

    if (Array.isArray(args)) {
        args = {
            completion: args[0],
        }
    }

    const parsedArgs = {
        completion: args.completion,
    }

    return destroy.definition.url
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationCompletionController::destroy
* @see app/Http/Controllers/IrrigationCompletionController.php:100
* @route '/irrigation/completions/{completion}'
*/
destroy.delete = (args: { completion: string | number } | [completion: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const IrrigationCompletionController = { index, create, store, show, edit, update, destroy }

export default IrrigationCompletionController