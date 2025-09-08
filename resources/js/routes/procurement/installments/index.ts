import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/procurement/installments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/procurement/installments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/procurement/installments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/procurement/installments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/procurement/installments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/procurement/installments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
export const show = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/procurement/installments/{installment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
show.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        installment: args.installment,
    }

    return show.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
show.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
show.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
export const edit = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/procurement/installments/{installment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
edit.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        installment: args.installment,
    }

    return edit.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
edit.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
edit.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
export const update = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/procurement/installments/{installment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
update.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        installment: args.installment,
    }

    return update.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
update.put = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
update.patch = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/procurement/installments/{installment}'
*/
export const destroy = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/procurement/installments/{installment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/procurement/installments/{installment}'
*/
destroy.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        installment: args.installment,
    }

    return destroy.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/procurement/installments/{installment}'
*/
destroy.delete = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const installments = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default installments