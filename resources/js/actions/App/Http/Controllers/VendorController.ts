import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
const getVendors9644c18b1ac37a68170a3e1b642b65e8 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getVendors9644c18b1ac37a68170a3e1b642b65e8.url(options),
    method: 'get',
})

getVendors9644c18b1ac37a68170a3e1b642b65e8.definition = {
    methods: ['get','head'],
    url: '/vendors/auto-search',
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
getVendors9644c18b1ac37a68170a3e1b642b65e8.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return getVendors9644c18b1ac37a68170a3e1b642b65e8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
getVendors9644c18b1ac37a68170a3e1b642b65e8.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getVendors9644c18b1ac37a68170a3e1b642b65e8.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/vendors/auto-search'
*/
getVendors9644c18b1ac37a68170a3e1b642b65e8.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getVendors9644c18b1ac37a68170a3e1b642b65e8.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
const getVendorsf9ee5a1e010cd2fed4db63e497821604 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getVendorsf9ee5a1e010cd2fed4db63e497821604.url(options),
    method: 'get',
})

getVendorsf9ee5a1e010cd2fed4db63e497821604.definition = {
    methods: ['get','head'],
    url: '/mhp/vendors/auto-search',
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
getVendorsf9ee5a1e010cd2fed4db63e497821604.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return getVendorsf9ee5a1e010cd2fed4db63e497821604.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
getVendorsf9ee5a1e010cd2fed4db63e497821604.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getVendorsf9ee5a1e010cd2fed4db63e497821604.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::getVendors
* @see app/Http/Controllers/VendorController.php:123
* @route '/mhp/vendors/auto-search'
*/
getVendorsf9ee5a1e010cd2fed4db63e497821604.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getVendorsf9ee5a1e010cd2fed4db63e497821604.url(options),
    method: 'head',
})

export const getVendors = {
    '/vendors/auto-search': getVendors9644c18b1ac37a68170a3e1b642b65e8,
    '/mhp/vendors/auto-search': getVendorsf9ee5a1e010cd2fed4db63e497821604,
}

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
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
    url: '/vendors',
}

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::index
* @see app/Http/Controllers/VendorController.php:27
* @route '/vendors'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
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
    url: '/vendors/create',
}

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::create
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::store
* @see app/Http/Controllers/VendorController.php:67
* @route '/vendors'
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
    url: '/vendors',
}

/**
* @see \App\Http\Controllers\VendorController::store
* @see app/Http/Controllers/VendorController.php:67
* @route '/vendors'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VendorController::store
* @see app/Http/Controllers/VendorController.php:67
* @route '/vendors'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VendorController::show
* @see app/Http/Controllers/VendorController.php:81
* @route '/vendors/{vendor}'
*/
export const show = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/vendors/{vendor}',
}

/**
* @see \App\Http\Controllers\VendorController::show
* @see app/Http/Controllers/VendorController.php:81
* @route '/vendors/{vendor}'
*/
show.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
show.get = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::show
* @see app/Http/Controllers/VendorController.php:81
* @route '/vendors/{vendor}'
*/
show.head = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::edit
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/{vendor}/edit'
*/
export const edit = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/vendors/{vendor}/edit',
}

/**
* @see \App\Http\Controllers\VendorController::edit
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/{vendor}/edit'
*/
edit.url = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

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
edit.get = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VendorController::edit
* @see app/Http/Controllers/VendorController.php:0
* @route '/vendors/{vendor}/edit'
*/
edit.head = (args: { vendor: string | number } | [vendor: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VendorController::update
* @see app/Http/Controllers/VendorController.php:90
* @route '/vendors/{vendor}'
*/
export const update = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/vendors/{vendor}',
}

/**
* @see \App\Http\Controllers\VendorController::update
* @see app/Http/Controllers/VendorController.php:90
* @route '/vendors/{vendor}'
*/
update.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
update.put = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\VendorController::update
* @see app/Http/Controllers/VendorController.php:90
* @route '/vendors/{vendor}'
*/
update.patch = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VendorController::destroy
* @see app/Http/Controllers/VendorController.php:104
* @route '/vendors/{vendor}'
*/
export const destroy = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/vendors/{vendor}',
}

/**
* @see \App\Http\Controllers\VendorController::destroy
* @see app/Http/Controllers/VendorController.php:104
* @route '/vendors/{vendor}'
*/
destroy.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
destroy.delete = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const VendorController = { getVendors, index, create, store, show, edit, update, destroy }

export default VendorController