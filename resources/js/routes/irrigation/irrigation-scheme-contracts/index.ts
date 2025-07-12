import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/irrigation-scheme-contracts'
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
    url: '/irrigation/irrigation-scheme-contracts',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/irrigation-scheme-contracts'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/irrigation-scheme-contracts'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/irrigation-scheme-contracts'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/create'
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
    url: '/irrigation/irrigation-scheme-contracts/create',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:30
* @route '/irrigation/irrigation-scheme-contracts'
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
    url: '/irrigation/irrigation-scheme-contracts',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:30
* @route '/irrigation/irrigation-scheme-contracts'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:30
* @route '/irrigation/irrigation-scheme-contracts'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
export const show = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
show.url = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme_contract: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme_contract: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme_contract: args.irrigation_scheme_contract,
    }

    return show.definition.url
            .replace('{irrigation_scheme_contract}', parsedArgs.irrigation_scheme_contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
show.get = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
show.head = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}/edit'
*/
export const edit = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}/edit'
*/
edit.url = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme_contract: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme_contract: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme_contract: args.irrigation_scheme_contract,
    }

    return edit.definition.url
            .replace('{irrigation_scheme_contract}', parsedArgs.irrigation_scheme_contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}/edit'
*/
edit.get = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}/edit'
*/
edit.head = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
export const update = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
update.url = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme_contract: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme_contract: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme_contract: args.irrigation_scheme_contract,
    }

    return update.definition.url
            .replace('{irrigation_scheme_contract}', parsedArgs.irrigation_scheme_contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
update.put = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
update.patch = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:70
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
export const destroy = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:70
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
destroy.url = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { irrigation_scheme_contract: args }
    }

    if (Array.isArray(args)) {
        args = {
            irrigation_scheme_contract: args[0],
        }
    }

    const parsedArgs = {
        irrigation_scheme_contract: args.irrigation_scheme_contract,
    }

    return destroy.definition.url
            .replace('{irrigation_scheme_contract}', parsedArgs.irrigation_scheme_contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:70
* @route '/irrigation/irrigation-scheme-contracts/{irrigation_scheme_contract}'
*/
destroy.delete = (args: { irrigation_scheme_contract: string | number } | [irrigation_scheme_contract: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const irrigationSchemeContracts = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default irrigationSchemeContracts