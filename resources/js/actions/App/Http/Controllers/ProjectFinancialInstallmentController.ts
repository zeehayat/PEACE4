import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
*/
const index1aed2288615d1efbbb4b89735fbdc34b = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index1aed2288615d1efbbb4b89735fbdc34b.url(options),
    method: 'get',
})

index1aed2288615d1efbbb4b89735fbdc34b.definition = {
    methods: ['get','head'],
    url: '/procurement/installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
*/
index1aed2288615d1efbbb4b89735fbdc34b.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index1aed2288615d1efbbb4b89735fbdc34b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
*/
index1aed2288615d1efbbb4b89735fbdc34b.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index1aed2288615d1efbbb4b89735fbdc34b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/procurement/installments'
*/
index1aed2288615d1efbbb4b89735fbdc34b.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index1aed2288615d1efbbb4b89735fbdc34b.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/mhp/project-financial-installments'
*/
const indexcd7cacef4827701f4c1b75df6eb262d3 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexcd7cacef4827701f4c1b75df6eb262d3.url(options),
    method: 'get',
})

indexcd7cacef4827701f4c1b75df6eb262d3.definition = {
    methods: ['get','head'],
    url: '/mhp/project-financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/mhp/project-financial-installments'
*/
indexcd7cacef4827701f4c1b75df6eb262d3.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexcd7cacef4827701f4c1b75df6eb262d3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/mhp/project-financial-installments'
*/
indexcd7cacef4827701f4c1b75df6eb262d3.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexcd7cacef4827701f4c1b75df6eb262d3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:13
* @route '/mhp/project-financial-installments'
*/
indexcd7cacef4827701f4c1b75df6eb262d3.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexcd7cacef4827701f4c1b75df6eb262d3.url(options),
    method: 'head',
})

export const index = {
    '/procurement/installments': index1aed2288615d1efbbb4b89735fbdc34b,
    '/mhp/project-financial-installments': indexcd7cacef4827701f4c1b75df6eb262d3,
}

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
const store1aed2288615d1efbbb4b89735fbdc34b = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store1aed2288615d1efbbb4b89735fbdc34b.url(options),
    method: 'post',
})

store1aed2288615d1efbbb4b89735fbdc34b.definition = {
    methods: ['post'],
    url: '/procurement/installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/procurement/installments'
*/
store1aed2288615d1efbbb4b89735fbdc34b.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store1aed2288615d1efbbb4b89735fbdc34b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/procurement/installments'
*/
store1aed2288615d1efbbb4b89735fbdc34b.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store1aed2288615d1efbbb4b89735fbdc34b.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/mhp/project-financial-installments'
*/
const storecd7cacef4827701f4c1b75df6eb262d3 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storecd7cacef4827701f4c1b75df6eb262d3.url(options),
    method: 'post',
})

storecd7cacef4827701f4c1b75df6eb262d3.definition = {
    methods: ['post'],
    url: '/mhp/project-financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/mhp/project-financial-installments'
*/
storecd7cacef4827701f4c1b75df6eb262d3.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storecd7cacef4827701f4c1b75df6eb262d3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:20
* @route '/mhp/project-financial-installments'
*/
storecd7cacef4827701f4c1b75df6eb262d3.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storecd7cacef4827701f4c1b75df6eb262d3.url(options),
    method: 'post',
})

export const store = {
    '/procurement/installments': store1aed2288615d1efbbb4b89735fbdc34b,
    '/mhp/project-financial-installments': storecd7cacef4827701f4c1b75df6eb262d3,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
const showa29f368bae2630b6f68ec4eefe40c7d5 = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'get',
})

showa29f368bae2630b6f68ec4eefe40c7d5.definition = {
    methods: ['get','head'],
    url: '/procurement/installments/{installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
showa29f368bae2630b6f68ec4eefe40c7d5.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showa29f368bae2630b6f68ec4eefe40c7d5.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
showa29f368bae2630b6f68ec4eefe40c7d5.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/procurement/installments/{installment}'
*/
showa29f368bae2630b6f68ec4eefe40c7d5.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showa29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
const showae2d97223f5d223dc88ef001befe59c6 = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'get',
})

showae2d97223f5d223dc88ef001befe59c6.definition = {
    methods: ['get','head'],
    url: '/mhp/project-financial-installments/{project_financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
showae2d97223f5d223dc88ef001befe59c6.url = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showae2d97223f5d223dc88ef001befe59c6.definition.url
            .replace('{project_financial_installment}', parsedArgs.project_financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
showae2d97223f5d223dc88ef001befe59c6.get = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:120
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
showae2d97223f5d223dc88ef001befe59c6.head = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'head',
})

export const show = {
    '/procurement/installments/{installment}': showa29f368bae2630b6f68ec4eefe40c7d5,
    '/mhp/project-financial-installments/{project_financial_installment}': showae2d97223f5d223dc88ef001befe59c6,
}

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
const updatea29f368bae2630b6f68ec4eefe40c7d5 = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatea29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'put',
})

updatea29f368bae2630b6f68ec4eefe40c7d5.definition = {
    methods: ['put','patch'],
    url: '/procurement/installments/{installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/procurement/installments/{installment}'
*/
updatea29f368bae2630b6f68ec4eefe40c7d5.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updatea29f368bae2630b6f68ec4eefe40c7d5.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/procurement/installments/{installment}'
*/
updatea29f368bae2630b6f68ec4eefe40c7d5.put = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatea29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/procurement/installments/{installment}'
*/
updatea29f368bae2630b6f68ec4eefe40c7d5.patch = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updatea29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
const updateae2d97223f5d223dc88ef001befe59c6 = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updateae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'put',
})

updateae2d97223f5d223dc88ef001befe59c6.definition = {
    methods: ['put','patch'],
    url: '/mhp/project-financial-installments/{project_financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
updateae2d97223f5d223dc88ef001befe59c6.url = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updateae2d97223f5d223dc88ef001befe59c6.definition.url
            .replace('{project_financial_installment}', parsedArgs.project_financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
updateae2d97223f5d223dc88ef001befe59c6.put = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updateae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:63
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
updateae2d97223f5d223dc88ef001befe59c6.patch = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updateae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'patch',
})

export const update = {
    '/procurement/installments/{installment}': updatea29f368bae2630b6f68ec4eefe40c7d5,
    '/mhp/project-financial-installments/{project_financial_installment}': updateae2d97223f5d223dc88ef001befe59c6,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/procurement/installments/{installment}'
*/
const destroya29f368bae2630b6f68ec4eefe40c7d5 = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroya29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'delete',
})

destroya29f368bae2630b6f68ec4eefe40c7d5.definition = {
    methods: ['delete'],
    url: '/procurement/installments/{installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/procurement/installments/{installment}'
*/
destroya29f368bae2630b6f68ec4eefe40c7d5.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroya29f368bae2630b6f68ec4eefe40c7d5.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/procurement/installments/{installment}'
*/
destroya29f368bae2630b6f68ec4eefe40c7d5.delete = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroya29f368bae2630b6f68ec4eefe40c7d5.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
const destroyae2d97223f5d223dc88ef001befe59c6 = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroyae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'delete',
})

destroyae2d97223f5d223dc88ef001befe59c6.definition = {
    methods: ['delete'],
    url: '/mhp/project-financial-installments/{project_financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
destroyae2d97223f5d223dc88ef001befe59c6.url = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroyae2d97223f5d223dc88ef001befe59c6.definition.url
            .replace('{project_financial_installment}', parsedArgs.project_financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:109
* @route '/mhp/project-financial-installments/{project_financial_installment}'
*/
destroyae2d97223f5d223dc88ef001befe59c6.delete = (args: { project_financial_installment: string | number } | [project_financial_installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroyae2d97223f5d223dc88ef001befe59c6.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/procurement/installments/{installment}': destroya29f368bae2630b6f68ec4eefe40c7d5,
    '/mhp/project-financial-installments/{project_financial_installment}': destroyae2d97223f5d223dc88ef001befe59c6,
}

const ProjectFinancialInstallmentController = { index, create, store, show, edit, update, destroy }

export default ProjectFinancialInstallmentController