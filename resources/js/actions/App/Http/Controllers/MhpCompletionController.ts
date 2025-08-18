import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpCompletionController::index
* @see app/Http/Controllers/MhpCompletionController.php:26
* @route '/mhp/sites/{site}/completion'
*/
export const index = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/completion',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::index
* @see app/Http/Controllers/MhpCompletionController.php:26
* @route '/mhp/sites/{site}/completion'
*/
index.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    const parsedArgs = {
        site: args.site,
    }

    return index.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::index
* @see app/Http/Controllers/MhpCompletionController.php:26
* @route '/mhp/sites/{site}/completion'
*/
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::index
* @see app/Http/Controllers/MhpCompletionController.php:26
* @route '/mhp/sites/{site}/completion'
*/
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::create
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/create'
*/
export const create = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/completion/create',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::create
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/create'
*/
create.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    const parsedArgs = {
        site: args.site,
    }

    return create.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::create
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/create'
*/
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::create
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:37
* @route '/mhp/sites/{site}/completion'
*/
export const store = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/sites/{site}/completion',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:37
* @route '/mhp/sites/{site}/completion'
*/
store.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    const parsedArgs = {
        site: args.site,
    }

    return store.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::store
* @see app/Http/Controllers/MhpCompletionController.php:37
* @route '/mhp/sites/{site}/completion'
*/
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:55
* @route '/mhp/sites/{site}/completion/{completion}'
*/
export const show = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/completion/{completion}',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:55
* @route '/mhp/sites/{site}/completion/{completion}'
*/
show.url = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            completion: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        completion: typeof args.completion === 'object'
        ? args.completion.id
        : args.completion,
    }

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:55
* @route '/mhp/sites/{site}/completion/{completion}'
*/
show.get = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::show
* @see app/Http/Controllers/MhpCompletionController.php:55
* @route '/mhp/sites/{site}/completion/{completion}'
*/
show.head = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::edit
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/{completion}/edit'
*/
export const edit = (args: { site: string | number, completion: string | number } | [site: string | number, completion: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/completion/{completion}/edit',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::edit
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/{completion}/edit'
*/
edit.url = (args: { site: string | number, completion: string | number } | [site: string | number, completion: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            completion: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        completion: args.completion,
    }

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::edit
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/{completion}/edit'
*/
edit.get = (args: { site: string | number, completion: string | number } | [site: string | number, completion: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::edit
* @see app/Http/Controllers/MhpCompletionController.php:0
* @route '/mhp/sites/{site}/completion/{completion}/edit'
*/
edit.head = (args: { site: string | number, completion: string | number } | [site: string | number, completion: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::update
* @see app/Http/Controllers/MhpCompletionController.php:67
* @route '/mhp/sites/{site}/completion/{completion}'
*/
export const update = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/completion/{completion}',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::update
* @see app/Http/Controllers/MhpCompletionController.php:67
* @route '/mhp/sites/{site}/completion/{completion}'
*/
update.url = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            completion: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        completion: typeof args.completion === 'object'
        ? args.completion.id
        : args.completion,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::update
* @see app/Http/Controllers/MhpCompletionController.php:67
* @route '/mhp/sites/{site}/completion/{completion}'
*/
update.put = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::update
* @see app/Http/Controllers/MhpCompletionController.php:67
* @route '/mhp/sites/{site}/completion/{completion}'
*/
update.patch = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpCompletionController::destroy
* @see app/Http/Controllers/MhpCompletionController.php:85
* @route '/mhp/sites/{site}/completion/{completion}'
*/
export const destroy = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/completion/{completion}',
}

/**
* @see \App\Http\Controllers\MhpCompletionController::destroy
* @see app/Http/Controllers/MhpCompletionController.php:85
* @route '/mhp/sites/{site}/completion/{completion}'
*/
destroy.url = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            completion: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        completion: typeof args.completion === 'object'
        ? args.completion.id
        : args.completion,
    }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{completion}', parsedArgs.completion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpCompletionController::destroy
* @see app/Http/Controllers/MhpCompletionController.php:85
* @route '/mhp/sites/{site}/completion/{completion}'
*/
destroy.delete = (args: { site: string | number, completion: number | { id: number } } | [site: string | number, completion: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MhpCompletionController = { index, create, store, show, edit, update, destroy }

export default MhpCompletionController