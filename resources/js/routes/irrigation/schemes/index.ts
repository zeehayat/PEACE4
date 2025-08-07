import { queryParams, type QueryParams } from './../../../wayfinder'
import adminApprovals from './admin-approvals'
import physicalProgresses from './physical-progresses'
import financialInstallments from './financial-installments'
import contracts from './contracts'
/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:27
* @route '/irrigation/schemes'
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
    url: '/irrigation/schemes',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:27
* @route '/irrigation/schemes'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:27
* @route '/irrigation/schemes'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:27
* @route '/irrigation/schemes'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
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
    url: '/irrigation/schemes/create',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:89
* @route '/irrigation/schemes'
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
    url: '/irrigation/schemes',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:89
* @route '/irrigation/schemes'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:89
* @route '/irrigation/schemes'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:103
* @route '/irrigation/schemes/{scheme}'
*/
export const show = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:103
* @route '/irrigation/schemes/{scheme}'
*/
show.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:103
* @route '/irrigation/schemes/{scheme}'
*/
show.get = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:103
* @route '/irrigation/schemes/{scheme}'
*/
show.head = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
export const edit = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
edit.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
edit.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/schemes/{scheme}/edit'
*/
edit.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:121
* @route '/irrigation/schemes/{scheme}'
*/
export const update = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/schemes/{scheme}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:121
* @route '/irrigation/schemes/{scheme}'
*/
update.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:121
* @route '/irrigation/schemes/{scheme}'
*/
update.put = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:121
* @route '/irrigation/schemes/{scheme}'
*/
update.patch = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:135
* @route '/irrigation/schemes/{scheme}'
*/
export const destroy = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/schemes/{scheme}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:135
* @route '/irrigation/schemes/{scheme}'
*/
destroy.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:135
* @route '/irrigation/schemes/{scheme}'
*/
destroy.delete = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::autoSearch
* @see app/Http/Controllers/IrrigationSchemeController.php:149
* @route '/irrigation/schemes/auto-search'
*/
export const autoSearch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})

autoSearch.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/auto-search',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::autoSearch
* @see app/Http/Controllers/IrrigationSchemeController.php:149
* @route '/irrigation/schemes/auto-search'
*/
autoSearch.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return autoSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::autoSearch
* @see app/Http/Controllers/IrrigationSchemeController.php:149
* @route '/irrigation/schemes/auto-search'
*/
autoSearch.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::autoSearch
* @see app/Http/Controllers/IrrigationSchemeController.php:149
* @route '/irrigation/schemes/auto-search'
*/
autoSearch.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: autoSearch.url(options),
    method: 'head',
})

const schemes = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
    autoSearch,
    adminApprovals,
    physicalProgresses,
    financialInstallments,
    contracts,
}

export default schemes