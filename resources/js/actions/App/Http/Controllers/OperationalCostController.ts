import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:14
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
* @see app/Http/Controllers/OperationalCostController.php:14
* @route '/mhp/operational-costs'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::index
* @see app/Http/Controllers/OperationalCostController.php:14
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
* @see app/Http/Controllers/OperationalCostController.php:14
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
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:54
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
* @see app/Http/Controllers/OperationalCostController.php:54
* @route '/mhp/operational-costs'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::store
* @see app/Http/Controllers/OperationalCostController.php:54
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
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:77
* @route '/mhp/operational-costs/{operationalCost}'
*/
export const update = (args: { operationalCost: number | { id: number } } | [operationalCost: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/mhp/operational-costs/{operationalCost}',
}

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:77
* @route '/mhp/operational-costs/{operationalCost}'
*/
update.url = (args: { operationalCost: number | { id: number } } | [operationalCost: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operationalCost: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { operationalCost: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            operationalCost: args[0],
        }
    }

    const parsedArgs = {
        operationalCost: typeof args.operationalCost === 'object'
        ? args.operationalCost.id
        : args.operationalCost,
    }

    return update.definition.url
            .replace('{operationalCost}', parsedArgs.operationalCost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::update
* @see app/Http/Controllers/OperationalCostController.php:77
* @route '/mhp/operational-costs/{operationalCost}'
*/
update.post = (args: { operationalCost: number | { id: number } } | [operationalCost: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:100
* @route '/mhp/operational-costs/{operationalCost}'
*/
export const destroy = (args: { operationalCost: number | { id: number } } | [operationalCost: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/operational-costs/{operationalCost}',
}

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:100
* @route '/mhp/operational-costs/{operationalCost}'
*/
destroy.url = (args: { operationalCost: number | { id: number } } | [operationalCost: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { operationalCost: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { operationalCost: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            operationalCost: args[0],
        }
    }

    const parsedArgs = {
        operationalCost: typeof args.operationalCost === 'object'
        ? args.operationalCost.id
        : args.operationalCost,
    }

    return destroy.definition.url
            .replace('{operationalCost}', parsedArgs.operationalCost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::destroy
* @see app/Http/Controllers/OperationalCostController.php:100
* @route '/mhp/operational-costs/{operationalCost}'
*/
destroy.delete = (args: { operationalCost: number | { id: number } } | [operationalCost: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:49
* @route '/mhp/expense-types'
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
    url: '/mhp/expense-types',
}

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:49
* @route '/mhp/expense-types'
*/
expenseTypes.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return expenseTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::expenseTypes
* @see app/Http/Controllers/OperationalCostController.php:49
* @route '/mhp/expense-types'
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
* @see app/Http/Controllers/OperationalCostController.php:49
* @route '/mhp/expense-types'
*/
expenseTypes.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: expenseTypes.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OperationalCostController::deleteMedia
* @see app/Http/Controllers/OperationalCostController.php:112
* @route '/mhp/media/{media}'
*/
export const deleteMedia = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deleteMedia.url(args, options),
    method: 'delete',
})

deleteMedia.definition = {
    methods: ['delete'],
    url: '/mhp/media/{media}',
}

/**
* @see \App\Http\Controllers\OperationalCostController::deleteMedia
* @see app/Http/Controllers/OperationalCostController.php:112
* @route '/mhp/media/{media}'
*/
deleteMedia.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { media: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            media: args[0],
        }
    }

    const parsedArgs = {
        media: typeof args.media === 'object'
        ? args.media.id
        : args.media,
    }

    return deleteMedia.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OperationalCostController::deleteMedia
* @see app/Http/Controllers/OperationalCostController.php:112
* @route '/mhp/media/{media}'
*/
deleteMedia.delete = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deleteMedia.url(args, options),
    method: 'delete',
})

const OperationalCostController = { index, store, update, destroy, expenseTypes, deleteMedia }

export default OperationalCostController