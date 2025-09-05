import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
export const expenseTypes = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: expenseTypes.url(options),
    method: 'get',
})

expenseTypes.definition = {
    methods: ['get','head'],
    url: '/mhp/operational-costs/expense-types',
}

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
expenseTypes.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return expenseTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
expenseTypes.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: expenseTypes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:35
* @route '/mhp/operational-costs/expense-types'
*/
expenseTypes.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: expenseTypes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
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
    url: '/mhp/operational-costs',
}

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:23
* @route '/mhp/operational-costs'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
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
    url: '/mhp/operational-costs/create',
}

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::create
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:40
* @route '/mhp/operational-costs'
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
    url: '/mhp/operational-costs',
}

/**
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:40
* @route '/mhp/operational-costs'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:40
* @route '/mhp/operational-costs'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OperationalCostController::show
* @see app/Http/Controllers/OperationalCostController.php:97
* @route '/mhp/operational-costs/{operational_cost}'
*/
export const show = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/operational-costs/{operational_cost}',
}

/**
* @see \App\Http\Controllers\OperationalCostController::show
* @see app/Http/Controllers/OperationalCostController.php:97
* @route '/mhp/operational-costs/{operational_cost}'
*/
show.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

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
show.get = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::show
* @see app/Http/Controllers/OperationalCostController.php:97
* @route '/mhp/operational-costs/{operational_cost}'
*/
show.head = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::edit
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/{operational_cost}/edit'
*/
export const edit = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/operational-costs/{operational_cost}/edit',
}

/**
* @see \App\Http\Controllers\OperationalCostController::edit
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/{operational_cost}/edit'
*/
edit.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

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
edit.get = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OperationalCostController::edit
* @see app/Http/Controllers/OperationalCostController.php:0
* @route '/mhp/operational-costs/{operational_cost}/edit'
*/
edit.head = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:63
* @route '/mhp/operational-costs/{operational_cost}'
*/
export const update = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/operational-costs/{operational_cost}',
}

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:63
* @route '/mhp/operational-costs/{operational_cost}'
*/
update.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

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
update.put = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:63
* @route '/mhp/operational-costs/{operational_cost}'
*/
update.patch = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:86
* @route '/mhp/operational-costs/{operational_cost}'
*/
export const destroy = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/operational-costs/{operational_cost}',
}

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:86
* @route '/mhp/operational-costs/{operational_cost}'
*/
destroy.url = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operational_cost: args }
    }

    if (Array.isArray(args)) {
        args = {
            operational_cost: args[0],
        }
    }

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
destroy.delete = (args: { operational_cost: string | number } | [operational_cost: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
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