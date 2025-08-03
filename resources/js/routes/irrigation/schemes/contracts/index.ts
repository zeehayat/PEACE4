import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/schemes/{scheme}/contracts'
*/
export const index = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/contracts',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/schemes/{scheme}/contracts'
*/
index.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/schemes/{scheme}/contracts'
*/
index.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/schemes/{scheme}/contracts'
*/
index.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/create'
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
    url: '/irrigation/schemes/{scheme}/contracts/create',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/create'
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
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/create'
*/
create.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/create'
*/
create.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:30
* @route '/irrigation/schemes/{scheme}/contracts'
*/
export const store = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/irrigation/schemes/{scheme}/contracts',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:30
* @route '/irrigation/schemes/{scheme}/contracts'
*/
store.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return store.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:30
* @route '/irrigation/schemes/{scheme}/contracts'
*/
store.post = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
export const show = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
show.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        contract: args.contract,
    }

    return show.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
show.get = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:83
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
show.head = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/{contract}/edit'
*/
export const edit = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}/edit',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/{contract}/edit'
*/
edit.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        contract: args.contract,
    }

    return edit.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/{contract}/edit'
*/
edit.get = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/{contract}/edit'
*/
edit.head = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
export const update = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
update.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        contract: args.contract,
    }

    return update.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
update.put = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:50
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
update.patch = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:70
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
export const destroy = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}',
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:70
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
destroy.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        contract: args.contract,
    }

    return destroy.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:70
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
destroy.delete = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const contracts = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default contracts