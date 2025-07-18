import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
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
    url: '/mhp/sites/{site}/physical-progresses',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
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
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:52
* @route '/mhp/sites/{site}/physical-progresses/create'
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
    url: '/mhp/sites/{site}/physical-progresses/create',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:52
* @route '/mhp/sites/{site}/physical-progresses/create'
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
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:52
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:52
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:61
* @route '/mhp/sites/{site}/physical-progresses'
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
    url: '/mhp/sites/{site}/physical-progresses',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:61
* @route '/mhp/sites/{site}/physical-progresses'
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
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:61
* @route '/mhp/sites/{site}/physical-progresses'
*/
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:75
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
export const show = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:75
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
show.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:75
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
show.get = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:75
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
show.head = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:90
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
export const edit = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:90
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
edit.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:90
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
edit.get = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:90
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
edit.head = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:98
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
export const update = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:98
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
update.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:98
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
update.put = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:98
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
update.patch = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:112
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
export const destroy = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:112
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
destroy.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:112
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
destroy.delete = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ProjectPhysicalProgressController = { index, create, store, show, edit, update, destroy }

export default ProjectPhysicalProgressController