import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
const getVendorsffce5c874ae248b19591dfb39de0bfe5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVendorsffce5c874ae248b19591dfb39de0bfe5.url(options),
    method: 'get',
})

getVendorsffce5c874ae248b19591dfb39de0bfe5.definition = {
    methods: ["get","head"],
    url: '/vendors/auto-search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
getVendorsffce5c874ae248b19591dfb39de0bfe5.url = (options?: RouteQueryOptions) => {
    return getVendorsffce5c874ae248b19591dfb39de0bfe5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
getVendorsffce5c874ae248b19591dfb39de0bfe5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVendorsffce5c874ae248b19591dfb39de0bfe5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
getVendorsffce5c874ae248b19591dfb39de0bfe5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVendorsffce5c874ae248b19591dfb39de0bfe5.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
const getVendorsa2fb956402b037f0f8d51120e33b1f72 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVendorsa2fb956402b037f0f8d51120e33b1f72.url(options),
    method: 'get',
})

getVendorsa2fb956402b037f0f8d51120e33b1f72.definition = {
    methods: ["get","head"],
    url: '/mhp/vendors/auto-search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
getVendorsa2fb956402b037f0f8d51120e33b1f72.url = (options?: RouteQueryOptions) => {
    return getVendorsa2fb956402b037f0f8d51120e33b1f72.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
getVendorsa2fb956402b037f0f8d51120e33b1f72.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVendorsa2fb956402b037f0f8d51120e33b1f72.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
getVendorsa2fb956402b037f0f8d51120e33b1f72.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVendorsa2fb956402b037f0f8d51120e33b1f72.url(options),
    method: 'head',
})

export const getVendors = {
    '/vendors/auto-search': getVendorsffce5c874ae248b19591dfb39de0bfe5,
    '/mhp/vendors/auto-search': getVendorsa2fb956402b037f0f8d51120e33b1f72,
}

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/vendors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/vendors/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::store
* @see app/Http/Controllers/VendorController.php:67
* @route '/vendors'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vendors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VendorController::store
* @see app/Http/Controllers/VendorController.php:67
* @route '/vendors'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::store
* @see app/Http/Controllers/VendorController.php:67
* @route '/vendors'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VendorController::show
* @see app/Http/Controllers/VendorController.php:81
* @route '/vendors/{vendor}'
*/
export const show = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/vendors/{vendor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VendorController::show
* @see app/Http/Controllers/VendorController.php:81
* @route '/vendors/{vendor}'
*/
show.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return show.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::show
* @see app/Http/Controllers/VendorController.php:81
* @route '/vendors/{vendor}'
*/
show.get = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::show
* @see app/Http/Controllers/VendorController.php:81
* @route '/vendors/{vendor}'
*/
show.head = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::edit
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/{vendor}/edit'
*/
export const edit = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/vendors/{vendor}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VendorController::edit
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/{vendor}/edit'
*/
edit.url = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: args.vendor,
    }

    return edit.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::edit
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/{vendor}/edit'
*/
edit.get = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::edit
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/{vendor}/edit'
*/
edit.head = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::update
* @see app/Http/Controllers/VendorController.php:90
* @route '/vendors/{vendor}'
*/
export const update = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/vendors/{vendor}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\VendorController::update
* @see app/Http/Controllers/VendorController.php:90
* @route '/vendors/{vendor}'
*/
update.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return update.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::update
* @see app/Http/Controllers/VendorController.php:90
* @route '/vendors/{vendor}'
*/
update.put = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\VendorController::update
* @see app/Http/Controllers/VendorController.php:90
* @route '/vendors/{vendor}'
*/
update.patch = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VendorController::destroy
* @see app/Http/Controllers/VendorController.php:104
* @route '/vendors/{vendor}'
*/
export const destroy = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/vendors/{vendor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VendorController::destroy
* @see app/Http/Controllers/VendorController.php:104
* @route '/vendors/{vendor}'
*/
destroy.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return destroy.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::destroy
* @see app/Http/Controllers/VendorController.php:104
* @route '/vendors/{vendor}'
*/
destroy.delete = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const VendorController = { getVendors, index, create, store, show, edit, update, destroy }

export default VendorController