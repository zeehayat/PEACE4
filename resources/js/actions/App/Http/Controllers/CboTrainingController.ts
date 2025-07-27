import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
const indexa33494ba124e6f30b6cf5807a0f17738 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa33494ba124e6f30b6cf5807a0f17738.url(args, options),
    method: 'get',
})

indexa33494ba124e6f30b6cf5807a0f17738.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/trainings',
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
indexa33494ba124e6f30b6cf5807a0f17738.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return indexa33494ba124e6f30b6cf5807a0f17738.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
indexa33494ba124e6f30b6cf5807a0f17738.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa33494ba124e6f30b6cf5807a0f17738.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/cbos/{cbo}/trainings'
*/
indexa33494ba124e6f30b6cf5807a0f17738.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexa33494ba124e6f30b6cf5807a0f17738.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
const indexbbb952a895ef11a82e39a92c38af4b99 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexbbb952a895ef11a82e39a92c38af4b99.url(options),
    method: 'get',
})

indexbbb952a895ef11a82e39a92c38af4b99.definition = {
    methods: ['get','head'],
    url: '/cbo/trainings',
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
indexbbb952a895ef11a82e39a92c38af4b99.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexbbb952a895ef11a82e39a92c38af4b99.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
indexbbb952a895ef11a82e39a92c38af4b99.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexbbb952a895ef11a82e39a92c38af4b99.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::index
* @see app/Http/Controllers/CboTrainingController.php:27
* @route '/cbo/trainings'
*/
indexbbb952a895ef11a82e39a92c38af4b99.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexbbb952a895ef11a82e39a92c38af4b99.url(options),
    method: 'head',
})

export const index = {
    '/cbo/cbos/{cbo}/trainings': indexa33494ba124e6f30b6cf5807a0f17738,
    '/cbo/trainings': indexbbb952a895ef11a82e39a92c38af4b99,
}

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
const storea33494ba124e6f30b6cf5807a0f17738 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storea33494ba124e6f30b6cf5807a0f17738.url(args, options),
    method: 'post',
})

storea33494ba124e6f30b6cf5807a0f17738.definition = {
    methods: ['post'],
    url: '/cbo/cbos/{cbo}/trainings',
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/cbos/{cbo}/trainings'
*/
storea33494ba124e6f30b6cf5807a0f17738.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return storea33494ba124e6f30b6cf5807a0f17738.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/cbos/{cbo}/trainings'
*/
storea33494ba124e6f30b6cf5807a0f17738.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storea33494ba124e6f30b6cf5807a0f17738.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/trainings'
*/
const storebbb952a895ef11a82e39a92c38af4b99 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storebbb952a895ef11a82e39a92c38af4b99.url(options),
    method: 'post',
})

storebbb952a895ef11a82e39a92c38af4b99.definition = {
    methods: ['post'],
    url: '/cbo/trainings',
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/trainings'
*/
storebbb952a895ef11a82e39a92c38af4b99.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storebbb952a895ef11a82e39a92c38af4b99.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::store
* @see app/Http/Controllers/CboTrainingController.php:57
* @route '/cbo/trainings'
*/
storebbb952a895ef11a82e39a92c38af4b99.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storebbb952a895ef11a82e39a92c38af4b99.url(options),
    method: 'post',
})

export const store = {
    '/cbo/cbos/{cbo}/trainings': storea33494ba124e6f30b6cf5807a0f17738,
    '/cbo/trainings': storebbb952a895ef11a82e39a92c38af4b99,
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
const show433e7cf0640ffe28c6aa3a060698b4f0 = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'get',
})

show433e7cf0640ffe28c6aa3a060698b4f0.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show433e7cf0640ffe28c6aa3a060698b4f0.url = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show433e7cf0640ffe28c6aa3a060698b4f0.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show433e7cf0640ffe28c6aa3a060698b4f0.get = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
show433e7cf0640ffe28c6aa3a060698b4f0.head = (args: { cbo: string | number, training: number | { id: number } } | [cbo: string | number, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/trainings/{training}'
*/
const show54d224d2d070b1f3a5122087bc1abcff = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'get',
})

show54d224d2d070b1f3a5122087bc1abcff.definition = {
    methods: ['get','head'],
    url: '/cbo/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/trainings/{training}'
*/
show54d224d2d070b1f3a5122087bc1abcff.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return show54d224d2d070b1f3a5122087bc1abcff.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/trainings/{training}'
*/
show54d224d2d070b1f3a5122087bc1abcff.get = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboTrainingController::show
* @see app/Http/Controllers/CboTrainingController.php:71
* @route '/cbo/trainings/{training}'
*/
show54d224d2d070b1f3a5122087bc1abcff.head = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'head',
})

export const show = {
    '/cbo/cbos/{cbo}/trainings/{training}': show433e7cf0640ffe28c6aa3a060698b4f0,
    '/cbo/trainings/{training}': show54d224d2d070b1f3a5122087bc1abcff,
}

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
const update433e7cf0640ffe28c6aa3a060698b4f0 = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'put',
})

update433e7cf0640ffe28c6aa3a060698b4f0.definition = {
    methods: ['put','patch'],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update433e7cf0640ffe28c6aa3a060698b4f0.url = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update433e7cf0640ffe28c6aa3a060698b4f0.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update433e7cf0640ffe28c6aa3a060698b4f0.put = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
update433e7cf0640ffe28c6aa3a060698b4f0.patch = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/trainings/{training}'
*/
const update54d224d2d070b1f3a5122087bc1abcff = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'put',
})

update54d224d2d070b1f3a5122087bc1abcff.definition = {
    methods: ['put','patch'],
    url: '/cbo/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/trainings/{training}'
*/
update54d224d2d070b1f3a5122087bc1abcff.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return update54d224d2d070b1f3a5122087bc1abcff.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/trainings/{training}'
*/
update54d224d2d070b1f3a5122087bc1abcff.put = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboTrainingController::update
* @see app/Http/Controllers/CboTrainingController.php:89
* @route '/cbo/trainings/{training}'
*/
update54d224d2d070b1f3a5122087bc1abcff.patch = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'patch',
})

export const update = {
    '/cbo/cbos/{cbo}/trainings/{training}': update433e7cf0640ffe28c6aa3a060698b4f0,
    '/cbo/trainings/{training}': update54d224d2d070b1f3a5122087bc1abcff,
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
const destroy433e7cf0640ffe28c6aa3a060698b4f0 = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'delete',
})

destroy433e7cf0640ffe28c6aa3a060698b4f0.definition = {
    methods: ['delete'],
    url: '/cbo/cbos/{cbo}/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
destroy433e7cf0640ffe28c6aa3a060698b4f0.url = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy433e7cf0640ffe28c6aa3a060698b4f0.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/cbos/{cbo}/trainings/{training}'
*/
destroy433e7cf0640ffe28c6aa3a060698b4f0.delete = (args: { cbo: number | { id: number }, training: number | { id: number } } | [cbo: number | { id: number }, training: number | { id: number } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy433e7cf0640ffe28c6aa3a060698b4f0.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/trainings/{training}'
*/
const destroy54d224d2d070b1f3a5122087bc1abcff = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'delete',
})

destroy54d224d2d070b1f3a5122087bc1abcff.definition = {
    methods: ['delete'],
    url: '/cbo/trainings/{training}',
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/trainings/{training}'
*/
destroy54d224d2d070b1f3a5122087bc1abcff.url = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training: args[0],
        }
    }

    const parsedArgs = {
        training: typeof args.training === 'object'
        ? args.training.id
        : args.training,
    }

    return destroy54d224d2d070b1f3a5122087bc1abcff.definition.url
            .replace('{training}', parsedArgs.training.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboTrainingController::destroy
* @see app/Http/Controllers/CboTrainingController.php:107
* @route '/cbo/trainings/{training}'
*/
destroy54d224d2d070b1f3a5122087bc1abcff.delete = (args: { training: number | { id: number } } | [training: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy54d224d2d070b1f3a5122087bc1abcff.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/cbo/cbos/{cbo}/trainings/{training}': destroy433e7cf0640ffe28c6aa3a060698b4f0,
    '/cbo/trainings/{training}': destroy54d224d2d070b1f3a5122087bc1abcff,
}

const CboTrainingController = { index, create, store, show, edit, update, destroy }

export default CboTrainingController