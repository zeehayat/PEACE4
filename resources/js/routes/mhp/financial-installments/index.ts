import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
 * @route '/mhp/sites/{site}/financial-installments'
 */
export const index = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
 * @route '/mhp/sites/{site}/financial-installments'
 */
index.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                }
    }

    const parsedArgs = {
                        site: args.site,
                }

    return index.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
 * @route '/mhp/sites/{site}/financial-installments'
 */
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
 * @route '/mhp/sites/{site}/financial-installments'
 */
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
 * @route '/mhp/sites/{site}/financial-installments/create'
 */
export const create = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments/create',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
 * @route '/mhp/sites/{site}/financial-installments/create'
 */
create.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                }
    }

    const parsedArgs = {
                        site: args.site,
                }

    return create.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
 * @route '/mhp/sites/{site}/financial-installments/create'
 */
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
 * @route '/mhp/sites/{site}/financial-installments/create'
 */
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
 * @route '/mhp/sites/{site}/financial-installments'
 */
export const store = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/sites/{site}/financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
 * @route '/mhp/sites/{site}/financial-installments'
 */
store.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                }
    }

    const parsedArgs = {
                        site: args.site,
                }

    return store.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
 * @route '/mhp/sites/{site}/financial-installments'
 */
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
export const show = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
show.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                    financial_installment: args[1],
                }
    }

    const parsedArgs = {
                        site: args.site,
                                financial_installment: args.financial_installment,
                }

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
show.get = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
show.head = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
 */
export const edit = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}/edit',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
 */
edit.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                    financial_installment: args[1],
                }
    }

    const parsedArgs = {
                        site: args.site,
                                financial_installment: args.financial_installment,
                }

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
 */
edit.get = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
 */
edit.head = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
export const update = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
update.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                    financial_installment: args[1],
                }
    }

    const parsedArgs = {
                        site: args.site,
                                financial_installment: args.financial_installment,
                }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
update.put = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
update.patch = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
export const destroy = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
destroy.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
                    site: args[0],
                    financial_installment: args[1],
                }
    }

    const parsedArgs = {
                        site: args.site,
                                financial_installment: args.financial_installment,
                }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
 * @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
 * @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
 */
destroy.delete = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
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