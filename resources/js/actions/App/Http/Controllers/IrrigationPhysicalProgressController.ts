import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
export const index = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/physical-progresses',
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheme: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return index.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index.get = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::index
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index.head = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
export const create = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/physical-progresses/create',
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
create.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
    }

    return create.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
create.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::create
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
create.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::store
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:52
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
export const store = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/irrigation/schemes/{scheme}/physical-progresses',
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::store
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:52
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
store.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheme: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return store.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::store
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:52
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
store.post = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::show
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}'
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
    url: '/irrigation/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::show
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}'
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
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::show
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}'
*/
show.get = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::show
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}'
*/
show.head = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::edit
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}/edit'
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
    url: '/irrigation/physical-progresses/{physical_progress}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::edit
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}/edit'
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
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::edit
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}/edit'
*/
edit.get = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::edit
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:0
* @route '/irrigation/physical-progresses/{physical_progress}/edit'
*/
edit.head = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::update
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:65
* @route '/irrigation/physical-progresses/{physical_progress}'
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
    url: '/irrigation/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::update
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:65
* @route '/irrigation/physical-progresses/{physical_progress}'
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
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::update
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:65
* @route '/irrigation/physical-progresses/{physical_progress}'
*/
update.put = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::update
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:65
* @route '/irrigation/physical-progresses/{physical_progress}'
*/
update.patch = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::destroy
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:76
* @route '/irrigation/physical-progresses/{physical_progress}'
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
    url: '/irrigation/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::destroy
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:76
* @route '/irrigation/physical-progresses/{physical_progress}'
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
* @see \App\Http\Controllers\IrrigationPhysicalProgressController::destroy
* @see app/Http/Controllers/IrrigationPhysicalProgressController.php:76
* @route '/irrigation/physical-progresses/{physical_progress}'
*/
destroy.delete = (args: { physical_progress: string | number } | [physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const IrrigationPhysicalProgressController = { index, create, store, show, edit, update, destroy }

export default IrrigationPhysicalProgressController