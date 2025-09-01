import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:20
* @route '/mhp/sites/{site}/eme-progress'
*/
export const index = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/eme-progress',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:20
* @route '/mhp/sites/{site}/eme-progress'
*/
index.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:20
* @route '/mhp/sites/{site}/eme-progress'
*/
index.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:20
* @route '/mhp/sites/{site}/eme-progress'
*/
index.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/create'
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
    url: '/mhp/sites/{site}/eme-progress/create',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/create'
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
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/create'
*/
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::store
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:39
* @route '/mhp/sites/{site}/eme-progress'
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
    url: '/mhp/sites/{site}/eme-progress',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::store
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:39
* @route '/mhp/sites/{site}/eme-progress'
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
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::store
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:39
* @route '/mhp/sites/{site}/eme-progress'
*/
store.post = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
export const show = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/eme-progress/{eme_progress}',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
show.url = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            eme_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        eme_progress: args.eme_progress,
    }

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{eme_progress}', parsedArgs.eme_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
show.get = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
show.head = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}/edit'
*/
export const edit = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/eme-progress/{eme_progress}/edit',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}/edit'
*/
edit.url = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            eme_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        eme_progress: args.eme_progress,
    }

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{eme_progress}', parsedArgs.eme_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}/edit'
*/
edit.get = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}/edit'
*/
edit.head = (args: { site: string | number, eme_progress: string | number } | [site: string | number, eme_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:65
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
export const update = (args: { site: number | { id: number }, eme_progress: string | number | { id: string | number } } | [site: number | { id: number }, eme_progress: string | number | { id: string | number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/eme-progress/{eme_progress}',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:65
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
update.url = (args: { site: number | { id: number }, eme_progress: string | number | { id: string | number } } | [site: number | { id: number }, eme_progress: string | number | { id: string | number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            eme_progress: args[1],
        }
    }

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
        eme_progress: typeof args.eme_progress === 'object'
        ? args.eme_progress.id
        : args.eme_progress,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{eme_progress}', parsedArgs.eme_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:65
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
update.put = (args: { site: number | { id: number }, eme_progress: string | number | { id: string | number } } | [site: number | { id: number }, eme_progress: string | number | { id: string | number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:65
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
update.patch = (args: { site: number | { id: number }, eme_progress: string | number | { id: string | number } } | [site: number | { id: number }, eme_progress: string | number | { id: string | number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::destroy
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:92
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
export const destroy = (args: { site: number | { id: number }, eme_progress: string | number | { id: string | number } } | [site: number | { id: number }, eme_progress: string | number | { id: string | number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/eme-progress/{eme_progress}',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::destroy
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:92
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
destroy.url = (args: { site: number | { id: number }, eme_progress: string | number | { id: string | number } } | [site: number | { id: number }, eme_progress: string | number | { id: string | number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            eme_progress: args[1],
        }
    }

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
        eme_progress: typeof args.eme_progress === 'object'
        ? args.eme_progress.id
        : args.eme_progress,
    }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{eme_progress}', parsedArgs.eme_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::destroy
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:92
* @route '/mhp/sites/{site}/eme-progress/{eme_progress}'
*/
destroy.delete = (args: { site: number | { id: number }, eme_progress: string | number | { id: string | number } } | [site: number | { id: number }, eme_progress: string | number | { id: string | number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const emeProgress = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default emeProgress