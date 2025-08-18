import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
const index5798374b3be59e1c441e31da433bdb22 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index5798374b3be59e1c441e31da433bdb22.url(args, options),
    method: 'get',
})

index5798374b3be59e1c441e31da433bdb22.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/exposure-visits',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index5798374b3be59e1c441e31da433bdb22.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index5798374b3be59e1c441e31da433bdb22.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index5798374b3be59e1c441e31da433bdb22.get = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index5798374b3be59e1c441e31da433bdb22.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
index5798374b3be59e1c441e31da433bdb22.head = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index5798374b3be59e1c441e31da433bdb22.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
const indexed304c0f4df50e1922f5ea08f10fad8d = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexed304c0f4df50e1922f5ea08f10fad8d.url(options),
    method: 'get',
})

indexed304c0f4df50e1922f5ea08f10fad8d.definition = {
    methods: ['get','head'],
    url: '/cbo/exposure-visits',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
indexed304c0f4df50e1922f5ea08f10fad8d.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexed304c0f4df50e1922f5ea08f10fad8d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
indexed304c0f4df50e1922f5ea08f10fad8d.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexed304c0f4df50e1922f5ea08f10fad8d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::index
* @see app/Http/Controllers/CboExposureVisitController.php:27
* @route '/cbo/exposure-visits'
*/
indexed304c0f4df50e1922f5ea08f10fad8d.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexed304c0f4df50e1922f5ea08f10fad8d.url(options),
    method: 'head',
})

export const index = {
    '/cbo/cbos/{cbo}/exposure-visits': index5798374b3be59e1c441e31da433bdb22,
    '/cbo/exposure-visits': indexed304c0f4df50e1922f5ea08f10fad8d,
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
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
    url: '/cbo/cbos/{cbo}/exposure-visits/create',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
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
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
*/
create.get = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::create
* @see app/Http/Controllers/CboExposureVisitController.php:67
* @route '/cbo/cbos/{cbo}/exposure-visits/create'
*/
create.head = (args: { cbo: string | number } | [cbo: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
const store5798374b3be59e1c441e31da433bdb22 = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store5798374b3be59e1c441e31da433bdb22.url(args, options),
    method: 'post',
})

store5798374b3be59e1c441e31da433bdb22.definition = {
    methods: ['post'],
    url: '/cbo/cbos/{cbo}/exposure-visits',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
store5798374b3be59e1c441e31da433bdb22.url = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return store5798374b3be59e1c441e31da433bdb22.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/cbos/{cbo}/exposure-visits'
*/
store5798374b3be59e1c441e31da433bdb22.post = (args: { cbo: number | { id: number } } | [cbo: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store5798374b3be59e1c441e31da433bdb22.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
const storeed304c0f4df50e1922f5ea08f10fad8d = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeed304c0f4df50e1922f5ea08f10fad8d.url(options),
    method: 'post',
})

storeed304c0f4df50e1922f5ea08f10fad8d.definition = {
    methods: ['post'],
    url: '/cbo/exposure-visits',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
storeed304c0f4df50e1922f5ea08f10fad8d.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storeed304c0f4df50e1922f5ea08f10fad8d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::store
* @see app/Http/Controllers/CboExposureVisitController.php:75
* @route '/cbo/exposure-visits'
*/
storeed304c0f4df50e1922f5ea08f10fad8d.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeed304c0f4df50e1922f5ea08f10fad8d.url(options),
    method: 'post',
})

export const store = {
    '/cbo/cbos/{cbo}/exposure-visits': store5798374b3be59e1c441e31da433bdb22,
    '/cbo/exposure-visits': storeed304c0f4df50e1922f5ea08f10fad8d,
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
const show6ec9c7f06aad7bed784e05b63fb13570 = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'get',
})

show6ec9c7f06aad7bed784e05b63fb13570.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show6ec9c7f06aad7bed784e05b63fb13570.url = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    const parsedArgs = {
        cbo: args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return show6ec9c7f06aad7bed784e05b63fb13570.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show6ec9c7f06aad7bed784e05b63fb13570.get = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
show6ec9c7f06aad7bed784e05b63fb13570.head = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
const show5b1d27f73d1bd37a151a590bc78dc805 = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'get',
})

show5b1d27f73d1bd37a151a590bc78dc805.definition = {
    methods: ['get','head'],
    url: '/cbo/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show5b1d27f73d1bd37a151a590bc78dc805.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return show5b1d27f73d1bd37a151a590bc78dc805.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show5b1d27f73d1bd37a151a590bc78dc805.get = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::show
* @see app/Http/Controllers/CboExposureVisitController.php:89
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
show5b1d27f73d1bd37a151a590bc78dc805.head = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'head',
})

export const show = {
    '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}': show6ec9c7f06aad7bed784e05b63fb13570,
    '/cbo/exposure-visits/{exposure_visit}': show5b1d27f73d1bd37a151a590bc78dc805,
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
export const edit = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
edit.url = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    const parsedArgs = {
        cbo: args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return edit.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
edit.get = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::edit
* @see app/Http/Controllers/CboExposureVisitController.php:99
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}/edit'
*/
edit.head = (args: { cbo: string | number, exposure_visit: string | number } | [cbo: string | number, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
const update6ec9c7f06aad7bed784e05b63fb13570 = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'put',
})

update6ec9c7f06aad7bed784e05b63fb13570.definition = {
    methods: ['put','patch'],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update6ec9c7f06aad7bed784e05b63fb13570.url = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return update6ec9c7f06aad7bed784e05b63fb13570.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update6ec9c7f06aad7bed784e05b63fb13570.put = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
update6ec9c7f06aad7bed784e05b63fb13570.patch = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
const update5b1d27f73d1bd37a151a590bc78dc805 = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'put',
})

update5b1d27f73d1bd37a151a590bc78dc805.definition = {
    methods: ['put','patch'],
    url: '/cbo/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update5b1d27f73d1bd37a151a590bc78dc805.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return update5b1d27f73d1bd37a151a590bc78dc805.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update5b1d27f73d1bd37a151a590bc78dc805.put = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::update
* @see app/Http/Controllers/CboExposureVisitController.php:107
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
update5b1d27f73d1bd37a151a590bc78dc805.patch = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'patch',
})

export const update = {
    '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}': update6ec9c7f06aad7bed784e05b63fb13570,
    '/cbo/exposure-visits/{exposure_visit}': update5b1d27f73d1bd37a151a590bc78dc805,
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
const destroy6ec9c7f06aad7bed784e05b63fb13570 = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'delete',
})

destroy6ec9c7f06aad7bed784e05b63fb13570.definition = {
    methods: ['delete'],
    url: '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
destroy6ec9c7f06aad7bed784e05b63fb13570.url = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            cbo: args[0],
            exposure_visit: args[1],
        }
    }

    const parsedArgs = {
        cbo: typeof args.cbo === 'object'
        ? args.cbo.id
        : args.cbo,
        exposure_visit: args.exposure_visit,
    }

    return destroy6ec9c7f06aad7bed784e05b63fb13570.definition.url
            .replace('{cbo}', parsedArgs.cbo.toString())
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}'
*/
destroy6ec9c7f06aad7bed784e05b63fb13570.delete = (args: { cbo: number | { id: number }, exposure_visit: string | number } | [cbo: number | { id: number }, exposure_visit: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy6ec9c7f06aad7bed784e05b63fb13570.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
const destroy5b1d27f73d1bd37a151a590bc78dc805 = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'delete',
})

destroy5b1d27f73d1bd37a151a590bc78dc805.definition = {
    methods: ['delete'],
    url: '/cbo/exposure-visits/{exposure_visit}',
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy5b1d27f73d1bd37a151a590bc78dc805.url = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exposure_visit: args }
    }

    if (Array.isArray(args)) {
        args = {
            exposure_visit: args[0],
        }
    }

    const parsedArgs = {
        exposure_visit: args.exposure_visit,
    }

    return destroy5b1d27f73d1bd37a151a590bc78dc805.definition.url
            .replace('{exposure_visit}', parsedArgs.exposure_visit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CboExposureVisitController::destroy
* @see app/Http/Controllers/CboExposureVisitController.php:125
* @route '/cbo/exposure-visits/{exposure_visit}'
*/
destroy5b1d27f73d1bd37a151a590bc78dc805.delete = (args: { exposure_visit: string | number } | [exposure_visit: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy5b1d27f73d1bd37a151a590bc78dc805.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/cbo/cbos/{cbo}/exposure-visits/{exposure_visit}': destroy6ec9c7f06aad7bed784e05b63fb13570,
    '/cbo/exposure-visits/{exposure_visit}': destroy5b1d27f73d1bd37a151a590bc78dc805,
}

const CboExposureVisitController = { index, create, store, show, edit, update, destroy }

export default CboExposureVisitController