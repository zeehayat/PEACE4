import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
export const index = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/trainings',
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
index.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
index.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
index.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:49
* @route '/cbo/cbos/{cbo}/trainings/create'
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
    url: '/cbo/cbos/{cbo}/trainings/create',
}

/**
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:49
* @route '/cbo/cbos/{cbo}/trainings/create'
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
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:49
* @route '/cbo/cbos/{cbo}/trainings/create'
*/
create.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::create
* @see app/Http/Controllers/CboTrainingController.php:49
* @route '/cbo/cbos/{cbo}/trainings/create'
*/
create.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/cbos/{cbo}/trainings'
*/
export const store = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/cbo/cbos/{cbo}/trainings',
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/cbos/{cbo}/trainings'
*/
store.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return store.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/cbos/{cbo}/trainings'
*/
store.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
export const show = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show.url = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    const parsedArgs = {
        cbo: args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return show.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show.get = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show.head = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:81
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
export const edit = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/trainings/{training}/edit',
}

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:81
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
edit.url = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    const parsedArgs = {
        cbo: args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return edit.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:81
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
edit.get = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::edit
* @see app/Http/Controllers/CboTrainingController.php:81
* @route '/cbo/cbos/{cbo}/trainings/{training}/edit'
*/
edit.head = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
export const update = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update.url = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return update.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update.put = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update.patch = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
export const destroy = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
destroy.url = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            training: args[1],
        }
    }

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return destroy.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
destroy.delete = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const trainings = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default trainings