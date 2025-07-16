import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:15
* @route '/mhp/project-financial-installments'
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
    url: '/mhp/project-financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:15
* @route '/mhp/project-financial-installments'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:15
* @route '/mhp/project-financial-installments'
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:15
* @route '/mhp/project-financial-installments'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:22
* @route '/mhp/project-financial-installments'
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
    url: '/mhp/project-financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:22
* @route '/mhp/project-financial-installments'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:22
* @route '/mhp/project-financial-installments'
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:256
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
export const show = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/project-financial-installments/{project_financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:256
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
show.url = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_financial_installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            project_financial_installment: args[0],
        }
    }

    const parsedArgs = {
        project_financial_installment: args.project_financial_installment,
    }

    return show.definition.url
            .replace('{project_financial_installment}', parsedArgs.project_financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:256
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
show.get = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:256
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
show.head = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:127
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
export const update = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/project-financial-installments/{project_financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:127
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
update.url = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_financial_installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            project_financial_installment: args[0],
        }
    }

    const parsedArgs = {
        project_financial_installment: args.project_financial_installment,
    }

    return update.definition.url
            .replace('{project_financial_installment}', parsedArgs.project_financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:127
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
update.put = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:127
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
update.patch = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:243
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
export const destroy = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/project-financial-installments/{project_financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:243
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
destroy.url = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_financial_installment: args }
    }

    if (Array.isArray(args)) {
        args = {
            project_financial_installment: args[0],
        }
    }

    const parsedArgs = {
        project_financial_installment: args.project_financial_installment,
    }

    return destroy.definition.url
            .replace('{project_financial_installment}', parsedArgs.project_financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:243
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
destroy.delete = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const projectFinancialInstallments = {
    index,
    store,
    show,
    update,
    destroy,
}

export default projectFinancialInstallments