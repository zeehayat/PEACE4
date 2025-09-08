import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/schemes/{scheme}/contracts'
*/
export const index = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/contracts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/schemes/{scheme}/contracts'
*/
index.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

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
index.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::index
* @see app/Http/Controllers/IrrigationSchemeContractController.php:14
* @route '/irrigation/schemes/{scheme}/contracts'
*/
index.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/create'
*/
export const create = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/contracts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/create'
*/
create.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

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
create.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::create
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/create'
*/
create.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:32
* @route '/irrigation/schemes/{scheme}/contracts'
*/
export const store = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/irrigation/schemes/{scheme}/contracts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:32
* @route '/irrigation/schemes/{scheme}/contracts'
*/
store.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
    }

    return store.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::store
* @see app/Http/Controllers/IrrigationSchemeContractController.php:32
* @route '/irrigation/schemes/{scheme}/contracts'
*/
store.post = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:91
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
export const show = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:91
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
show.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    args = applyUrlDefaults(args)

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
* @see app/Http/Controllers/IrrigationSchemeContractController.php:91
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
show.get = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::show
* @see app/Http/Controllers/IrrigationSchemeContractController.php:91
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
show.head = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/{contract}/edit'
*/
export const edit = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/{contract}/edit'
*/
edit.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    args = applyUrlDefaults(args)

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
edit.get = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::edit
* @see app/Http/Controllers/IrrigationSchemeContractController.php:0
* @route '/irrigation/schemes/{scheme}/contracts/{contract}/edit'
*/
edit.head = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:54
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
export const update = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:54
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
update.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    args = applyUrlDefaults(args)

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
* @see app/Http/Controllers/IrrigationSchemeContractController.php:54
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
update.put = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::update
* @see app/Http/Controllers/IrrigationSchemeContractController.php:54
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
update.patch = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:76
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
export const destroy = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/irrigation/schemes/{scheme}/contracts/{contract}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IrrigationSchemeContractController::destroy
* @see app/Http/Controllers/IrrigationSchemeContractController.php:76
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
destroy.url = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            contract: args[1],
        }
    }

    args = applyUrlDefaults(args)

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
* @see app/Http/Controllers/IrrigationSchemeContractController.php:76
* @route '/irrigation/schemes/{scheme}/contracts/{contract}'
*/
destroy.delete = (args: { scheme: string | number, contract: string | number } | [scheme: string | number, contract: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const IrrigationSchemeContractController = { index, create, store, show, edit, update, destroy }

export default IrrigationSchemeContractController