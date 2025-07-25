import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TAndDWorkController::index
* @see app/Http/Controllers/TAndDWorkController.php:31
* @route '/mhp/sites/{site}/t-and-d-works'
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
    url: '/mhp/sites/{site}/t-and-d-works',
}

/**
* @see \App\Http\Controllers\TAndDWorkController::index
* @see app/Http/Controllers/TAndDWorkController.php:31
* @route '/mhp/sites/{site}/t-and-d-works'
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
* @see \App\Http\Controllers\TAndDWorkController::index
* @see app/Http/Controllers/TAndDWorkController.php:31
* @route '/mhp/sites/{site}/t-and-d-works'
*/
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::index
* @see app/Http/Controllers/TAndDWorkController.php:31
* @route '/mhp/sites/{site}/t-and-d-works'
*/
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::create
* @see app/Http/Controllers/TAndDWorkController.php:72
* @route '/mhp/sites/{site}/t-and-d-works/create'
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
    url: '/mhp/sites/{site}/t-and-d-works/create',
}

/**
* @see \App\Http\Controllers\TAndDWorkController::create
* @see app/Http/Controllers/TAndDWorkController.php:72
* @route '/mhp/sites/{site}/t-and-d-works/create'
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
* @see \App\Http\Controllers\TAndDWorkController::create
* @see app/Http/Controllers/TAndDWorkController.php:72
* @route '/mhp/sites/{site}/t-and-d-works/create'
*/
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::create
* @see app/Http/Controllers/TAndDWorkController.php:72
* @route '/mhp/sites/{site}/t-and-d-works/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::store
* @see app/Http/Controllers/TAndDWorkController.php:81
* @route '/mhp/sites/{site}/t-and-d-works'
*/
export const store = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/sites/{site}/t-and-d-works',
}

/**
* @see \App\Http\Controllers\TAndDWorkController::store
* @see app/Http/Controllers/TAndDWorkController.php:81
* @route '/mhp/sites/{site}/t-and-d-works'
*/
store.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { site: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
    }

    return store.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TAndDWorkController::store
* @see app/Http/Controllers/TAndDWorkController.php:81
* @route '/mhp/sites/{site}/t-and-d-works'
*/
store.post = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::show
* @see app/Http/Controllers/TAndDWorkController.php:116
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
export const show = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}',
}

/**
* @see \App\Http\Controllers\TAndDWorkController::show
* @see app/Http/Controllers/TAndDWorkController.php:116
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
show.url = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            t_and_d_work: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        t_and_d_work: args.t_and_d_work,
    }

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{t_and_d_work}', parsedArgs.t_and_d_work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TAndDWorkController::show
* @see app/Http/Controllers/TAndDWorkController.php:116
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
show.get = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::show
* @see app/Http/Controllers/TAndDWorkController.php:116
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
show.head = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::edit
* @see app/Http/Controllers/TAndDWorkController.php:126
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}/edit'
*/
export const edit = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}/edit',
}

/**
* @see \App\Http\Controllers\TAndDWorkController::edit
* @see app/Http/Controllers/TAndDWorkController.php:126
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}/edit'
*/
edit.url = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            t_and_d_work: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        t_and_d_work: args.t_and_d_work,
    }

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{t_and_d_work}', parsedArgs.t_and_d_work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TAndDWorkController::edit
* @see app/Http/Controllers/TAndDWorkController.php:126
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}/edit'
*/
edit.get = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::edit
* @see app/Http/Controllers/TAndDWorkController.php:126
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}/edit'
*/
edit.head = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::update
* @see app/Http/Controllers/TAndDWorkController.php:135
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
export const update = (args: { site: number | { id: number }, t_and_d_work: string | number } | [site: number | { id: number }, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}',
}

/**
* @see \App\Http\Controllers\TAndDWorkController::update
* @see app/Http/Controllers/TAndDWorkController.php:135
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
update.url = (args: { site: number | { id: number }, t_and_d_work: string | number } | [site: number | { id: number }, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            t_and_d_work: args[1],
        }
    }

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
        t_and_d_work: args.t_and_d_work,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{t_and_d_work}', parsedArgs.t_and_d_work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TAndDWorkController::update
* @see app/Http/Controllers/TAndDWorkController.php:135
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
update.put = (args: { site: number | { id: number }, t_and_d_work: string | number } | [site: number | { id: number }, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::update
* @see app/Http/Controllers/TAndDWorkController.php:135
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
update.patch = (args: { site: number | { id: number }, t_and_d_work: string | number } | [site: number | { id: number }, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TAndDWorkController::destroy
* @see app/Http/Controllers/TAndDWorkController.php:149
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
export const destroy = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}',
}

/**
* @see \App\Http\Controllers\TAndDWorkController::destroy
* @see app/Http/Controllers/TAndDWorkController.php:149
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
destroy.url = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            t_and_d_work: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        t_and_d_work: args.t_and_d_work,
    }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{t_and_d_work}', parsedArgs.t_and_d_work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TAndDWorkController::destroy
* @see app/Http/Controllers/TAndDWorkController.php:149
* @route '/mhp/sites/{site}/t-and-d-works/{t_and_d_work}'
*/
destroy.delete = (args: { site: string | number, t_and_d_work: string | number } | [site: string | number, t_and_d_work: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const TAndDWorkController = { index, create, store, show, edit, update, destroy }

export default TAndDWorkController