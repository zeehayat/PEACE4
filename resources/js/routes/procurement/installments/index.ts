import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
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
    url: '/procurement/installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/create'
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
    url: '/procurement/installments/create',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/procurement/installments'
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
    url: '/procurement/installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/procurement/installments'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/procurement/installments'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
export const show = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/procurement/installments/{installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
show.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    const parsedArgs = {
        installment: args.installment,
    }

    return show.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
show.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
show.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/{installment}/edit'
*/
export const edit = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/procurement/installments/{installment}/edit',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/{installment}/edit'
*/
edit.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    const parsedArgs = {
        installment: args.installment,
    }

    return edit.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/{installment}/edit'
*/
edit.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:0
* @route '/procurement/installments/{installment}/edit'
*/
edit.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/procurement/installments/{installment}'
*/
export const update = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/procurement/installments/{installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/procurement/installments/{installment}'
*/
update.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    const parsedArgs = {
        installment: args.installment,
    }

    return update.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/procurement/installments/{installment}'
*/
update.put = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/procurement/installments/{installment}'
*/
update.patch = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/procurement/installments/{installment}'
*/
export const destroy = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/procurement/installments/{installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/procurement/installments/{installment}'
*/
destroy.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            installment: args[0],
        }
    }

    const parsedArgs = {
        installment: args.installment,
    }

    return destroy.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/procurement/installments/{installment}'
*/
destroy.delete = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
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