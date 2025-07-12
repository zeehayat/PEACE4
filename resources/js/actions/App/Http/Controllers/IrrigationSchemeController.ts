import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/irrigation-schemes'
*/
const index697fc13d2758b74880df4bb0a3de9095 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index697fc13d2758b74880df4bb0a3de9095.url(options),
    method: 'get',
})

index697fc13d2758b74880df4bb0a3de9095.definition = {
    methods: ['get','head'],
    url: '/irrigation/irrigation-schemes',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/irrigation-schemes'
*/
index697fc13d2758b74880df4bb0a3de9095.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index697fc13d2758b74880df4bb0a3de9095.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/irrigation-schemes'
*/
index697fc13d2758b74880df4bb0a3de9095.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index697fc13d2758b74880df4bb0a3de9095.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/irrigation-schemes'
*/
index697fc13d2758b74880df4bb0a3de9095.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index697fc13d2758b74880df4bb0a3de9095.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
*/
const index070b72eaa14ddc7fbb5db62ac104025d = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index070b72eaa14ddc7fbb5db62ac104025d.url(options),
    method: 'get',
})

index070b72eaa14ddc7fbb5db62ac104025d.definition = {
    methods: ['get','head'],
    url: '/irrigation/index',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
*/
index070b72eaa14ddc7fbb5db62ac104025d.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index070b72eaa14ddc7fbb5db62ac104025d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
*/
index070b72eaa14ddc7fbb5db62ac104025d.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index070b72eaa14ddc7fbb5db62ac104025d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::index
* @see app/Http/Controllers/IrrigationSchemeController.php:14
* @route '/irrigation/index'
*/
index070b72eaa14ddc7fbb5db62ac104025d.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index070b72eaa14ddc7fbb5db62ac104025d.url(options),
    method: 'head',
})

export const index = {
    '/irrigation/irrigation-schemes': index697fc13d2758b74880df4bb0a3de9095,
    '/irrigation/index': index070b72eaa14ddc7fbb5db62ac104025d,
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:123
* @route '/irrigation/irrigation-schemes/create'
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
    url: '/irrigation/irrigation-schemes/create',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:123
* @route '/irrigation/irrigation-schemes/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::create
* @see app/Http/Controllers/IrrigationSchemeController.php:123
* @route '/irrigation/irrigation-schemes/create'
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
* @see app/Http/Controllers/IrrigationSchemeController.php:123
* @route '/irrigation/irrigation-schemes/create'
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
* @see app/Http/Controllers/IrrigationSchemeController.php:129
* @route '/irrigation/irrigation-schemes'
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
    url: '/irrigation/irrigation-schemes',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:129
* @route '/irrigation/irrigation-schemes'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::store
* @see app/Http/Controllers/IrrigationSchemeController.php:129
* @route '/irrigation/irrigation-schemes'
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
* @see app/Http/Controllers/IrrigationSchemeController.php:170
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
export const show = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/irrigation-schemes/{irrigation_scheme}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:170
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
show.url = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme: args.irrigation_scheme,
    }

    return show.definition.url
            .replace('{irrigation_scheme}', parsedArgs.irrigation_scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:170
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
show.get = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::show
* @see app/Http/Controllers/IrrigationSchemeController.php:170
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
show.head = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}/edit'
*/
export const edit = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/irrigation-schemes/{irrigation_scheme}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}/edit'
*/
edit.url = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme: args.irrigation_scheme,
    }

    return edit.definition.url
            .replace('{irrigation_scheme}', parsedArgs.irrigation_scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}/edit'
*/
edit.get = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::edit
* @see app/Http/Controllers/IrrigationSchemeController.php:0
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}/edit'
*/
edit.head = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:221
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
export const update = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/irrigation-schemes/{irrigation_scheme}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:221
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
update.url = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme: args.irrigation_scheme,
    }

    return update.definition.url
            .replace('{irrigation_scheme}', parsedArgs.irrigation_scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:221
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
update.put = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::update
* @see app/Http/Controllers/IrrigationSchemeController.php:221
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
update.patch = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:270
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
export const destroy = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/irrigation-schemes/{irrigation_scheme}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:270
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
destroy.url = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme: args.irrigation_scheme,
    }

    return destroy.definition.url
            .replace('{irrigation_scheme}', parsedArgs.irrigation_scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeController::destroy
* @see app/Http/Controllers/IrrigationSchemeController.php:270
* @route '/irrigation/irrigation-schemes/{irrigation_scheme}'
*/
destroy.delete = (args: { irrigation_scheme: string | number } | [irrigation_scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const IrrigationSchemeController = { index, create, store, show, edit, update, destroy }

export default IrrigationSchemeController