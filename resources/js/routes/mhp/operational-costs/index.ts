import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
export const expenseTypes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expenseTypes.url(options),
    method: 'get',
})

expenseTypes.definition = {
    methods: ["get","head"],
    url: '/mhp/operational-costs/expense-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
expenseTypes.url = (options?: RouteQueryOptions) => {
    return expenseTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
expenseTypes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expenseTypes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
expenseTypes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: expenseTypes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mhp/operational-costs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/mhp/operational-costs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:40
* @route '/mhp/operational-costs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mhp/operational-costs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:40
* @route '/mhp/operational-costs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:40
* @route '/mhp/operational-costs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OperationalCostController::show
* @see app/Http/Controllers/OperationalCostController.php:97
* @route '/mhp/operational-costs/{operational_cost}'
*/
export const show = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/mhp/operational-costs/{operational_cost}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OperationalCostController::show
* @see app/Http/Controllers/OperationalCostController.php:97
* @route '/mhp/operational-costs/{operational_cost}'
*/
show.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        operational_cost: args.operational_cost,
    }

    return show.definition.url
            .replace('{operational_cost}', parsedArgs.operational_cost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::show
* @see app/Http/Controllers/OperationalCostController.php:97
* @route '/mhp/operational-costs/{operational_cost}'
*/
show.get = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::show
* @see app/Http/Controllers/OperationalCostController.php:97
* @route '/mhp/operational-costs/{operational_cost}'
*/
show.head = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::edit
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/{operational_cost}/edit'
*/
export const edit = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/mhp/operational-costs/{operational_cost}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OperationalCostController::edit
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/{operational_cost}/edit'
*/
edit.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        operational_cost: args.operational_cost,
    }

    return edit.definition.url
            .replace('{operational_cost}', parsedArgs.operational_cost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::edit
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/{operational_cost}/edit'
*/
edit.get = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::edit
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/{operational_cost}/edit'
*/
edit.head = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:63
* @route '/mhp/operational-costs/{operational_cost}'
*/
export const update = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/mhp/operational-costs/{operational_cost}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:63
* @route '/mhp/operational-costs/{operational_cost}'
*/
update.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        operational_cost: args.operational_cost,
    }

    return update.definition.url
            .replace('{operational_cost}', parsedArgs.operational_cost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:63
* @route '/mhp/operational-costs/{operational_cost}'
*/
update.put = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:63
* @route '/mhp/operational-costs/{operational_cost}'
*/
update.patch = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:86
* @route '/mhp/operational-costs/{operational_cost}'
*/
export const destroy = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mhp/operational-costs/{operational_cost}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:86
* @route '/mhp/operational-costs/{operational_cost}'
*/
destroy.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        operational_cost: args.operational_cost,
    }

    return destroy.definition.url
            .replace('{operational_cost}', parsedArgs.operational_cost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:86
* @route '/mhp/operational-costs/{operational_cost}'
*/
destroy.delete = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const operationalCosts = {
    expenseTypes,
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default operationalCosts