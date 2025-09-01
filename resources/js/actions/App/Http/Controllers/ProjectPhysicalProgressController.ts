import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:26
* @route '/mhp/sites/{site}/physical-progresses'
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
    url: '/mhp/sites/{site}/physical-progresses',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:26
* @route '/mhp/sites/{site}/physical-progresses'
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
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:26
* @route '/mhp/sites/{site}/physical-progresses'
*/
index.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:26
* @route '/mhp/sites/{site}/physical-progresses'
*/
index.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
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
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
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
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
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
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
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
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
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
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
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
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
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
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:99
* @route '/mhp/physical-progresses/{physical_progress}'
*/
export const show = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:99
* @route '/mhp/physical-progresses/{physical_progress}'
*/
show.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return show.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:99
* @route '/mhp/physical-progresses/{physical_progress}'
*/
show.get = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:99
* @route '/mhp/physical-progresses/{physical_progress}'
*/
show.head = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
export const edit = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/physical-progresses/{physical_progress}/edit',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
edit.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return edit.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
edit.get = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:0
* @route '/mhp/physical-progresses/{physical_progress}/edit'
*/
edit.head = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:113
* @route '/mhp/physical-progresses/{physical_progress}'
*/
export const update = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:113
* @route '/mhp/physical-progresses/{physical_progress}'
*/
update.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return update.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:113
* @route '/mhp/physical-progresses/{physical_progress}'
*/
update.put = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:113
* @route '/mhp/physical-progresses/{physical_progress}'
*/
update.patch = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:127
* @route '/mhp/physical-progresses/{physical_progress}'
*/
export const destroy = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:127
* @route '/mhp/physical-progresses/{physical_progress}'
*/
destroy.url = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            physical_progress: args[0],
        }
    }

    const parsedArgs = {
        physical_progress: args.physical_progress,
    }

    return destroy.definition.url
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:127
* @route '/mhp/physical-progresses/{physical_progress}'
*/
destroy.delete = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ProjectPhysicalProgressController = { index, create, store, show, edit, update, destroy }

export default ProjectPhysicalProgressController