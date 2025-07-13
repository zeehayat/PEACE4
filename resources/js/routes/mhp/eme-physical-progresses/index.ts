import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:10
* @route '/mhp/eme-physical-progresses'
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
    url: '/mhp/eme-physical-progresses',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:10
* @route '/mhp/eme-physical-progresses'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:10
* @route '/mhp/eme-physical-progresses'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::index
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:10
* @route '/mhp/eme-physical-progresses'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/create'
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
    url: '/mhp/eme-physical-progresses/create',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::create
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::store
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:22
* @route '/mhp/eme-physical-progresses'
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
    url: '/mhp/eme-physical-progresses',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::store
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:22
* @route '/mhp/eme-physical-progresses'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::store
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:22
* @route '/mhp/eme-physical-progresses'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
export const show = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/eme-physical-progresses/{eme_physical_progress}',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
show.url = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eme_physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            eme_physical_progress: args[0],
        }
    }

    const parsedArgs = {
        eme_physical_progress: args.eme_physical_progress,
    }

    return show.definition.url
            .replace('{eme_physical_progress}', parsedArgs.eme_physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
show.get = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::show
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
show.head = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}/edit'
*/
export const edit = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/eme-physical-progresses/{eme_physical_progress}/edit',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}/edit'
*/
edit.url = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eme_physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            eme_physical_progress: args[0],
        }
    }

    const parsedArgs = {
        eme_physical_progress: args.eme_physical_progress,
    }

    return edit.definition.url
            .replace('{eme_physical_progress}', parsedArgs.eme_physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}/edit'
*/
edit.get = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::edit
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:0
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}/edit'
*/
edit.head = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:44
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
export const update = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/eme-physical-progresses/{eme_physical_progress}',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:44
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
update.url = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eme_physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            eme_physical_progress: args[0],
        }
    }

    const parsedArgs = {
        eme_physical_progress: args.eme_physical_progress,
    }

    return update.definition.url
            .replace('{eme_physical_progress}', parsedArgs.eme_physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:44
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
update.put = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::update
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:44
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
update.patch = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::destroy
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:64
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
export const destroy = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/eme-physical-progresses/{eme_physical_progress}',
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::destroy
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:64
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
destroy.url = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eme_physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            eme_physical_progress: args[0],
        }
    }

    const parsedArgs = {
        eme_physical_progress: args.eme_physical_progress,
    }

    return destroy.definition.url
            .replace('{eme_physical_progress}', parsedArgs.eme_physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpEmePhysicalProgressController::destroy
* @see app/Http/Controllers/MhpEmePhysicalProgressController.php:64
* @route '/mhp/eme-physical-progresses/{eme_physical_progress}'
*/
destroy.delete = (args: { eme_physical_progress: string | number } | [eme_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const emePhysicalProgresses = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default emePhysicalProgresses