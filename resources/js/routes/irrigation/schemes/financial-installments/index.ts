import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::index
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:25
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
export const index = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/financial-installments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::index
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:25
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
index.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return index.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::index
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:25
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
index.get = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::index
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:25
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
index.head = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::create
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
*/
export const create = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/financial-installments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::create
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
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
* @see \App\Http\Controllers\IrrigationFinancialProgressController::create
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
*/
create.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::create
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
*/
create.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::store
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:41
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
export const store = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/irrigation/schemes/{scheme}/financial-installments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::store
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:41
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
store.url = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
    }

    return store.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::store
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:41
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
store.post = (args: { scheme: number | { id: number } } | [scheme: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::show
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
export const show = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::show
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
show.url = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
        financial_installment: args.financial_installment,
    }

    return show.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::show
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
show.get = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::show
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
show.head = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::edit
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
export const edit = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::edit
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
edit.url = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: args.scheme,
        financial_installment: args.financial_installment,
    }

    return edit.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::edit
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
edit.get = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::edit
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:0
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
edit.head = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::update
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:65
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
export const update = (args: { scheme: number | { id: number }, financial_installment: string | number } | [scheme: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::update
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:65
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
update.url = (args: { scheme: number | { id: number }, financial_installment: string | number } | [scheme: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
        financial_installment: args.financial_installment,
    }

    return update.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::update
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:65
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
update.put = (args: { scheme: number | { id: number }, financial_installment: string | number } | [scheme: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::update
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:65
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
update.patch = (args: { scheme: number | { id: number }, financial_installment: string | number } | [scheme: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::destroy
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:90
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
export const destroy = (args: { scheme: number | { id: number }, financial_installment: string | number } | [scheme: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::destroy
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:90
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
destroy.url = (args: { scheme: number | { id: number }, financial_installment: string | number } | [scheme: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheme: typeof args.scheme === 'object'
        ? args.scheme.id
        : args.scheme,
        financial_installment: args.financial_installment,
    }

    return destroy.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IrrigationFinancialProgressController::destroy
* @see app/Http/Controllers/IrrigationFinancialProgressController.php:90
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
destroy.delete = (args: { scheme: number | { id: number }, financial_installment: string | number } | [scheme: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const financialInstallments = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default financialInstallments