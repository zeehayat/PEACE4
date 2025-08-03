import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/irrigation/schemes/{scheme}/financial-installments'
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
    url: '/irrigation/schemes/{scheme}/financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/irrigation/schemes/{scheme}/financial-installments'
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
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
index.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
index.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
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
    url: '/irrigation/schemes/{scheme}/financial-installments/create',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
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
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
*/
create.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/irrigation/schemes/{scheme}/financial-installments/create'
*/
create.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
* @route '/irrigation/schemes/{scheme}/financial-installments'
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
    url: '/irrigation/schemes/{scheme}/financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
* @route '/irrigation/schemes/{scheme}/financial-installments'
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
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
* @route '/irrigation/schemes/{scheme}/financial-installments'
*/
store.post = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
export const show = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
show.url = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

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
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
show.get = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
show.head = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
export const edit = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
edit.url = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

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
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
edit.get = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}/edit'
*/
edit.head = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
export const update = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
update.url = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        financial_installment: args.financial_installment,
    }

    return update.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
update.put = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
update.patch = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
export const destroy = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
destroy.url = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            financial_installment: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        financial_installment: args.financial_installment,
    }

    return destroy.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
* @route '/irrigation/schemes/{scheme}/financial-installments/{financial_installment}'
*/
destroy.delete = (args: { scheme: string | number, financial_installment: string | number } | [scheme: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
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