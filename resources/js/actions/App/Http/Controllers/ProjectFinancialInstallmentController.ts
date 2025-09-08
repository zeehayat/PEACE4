import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
const indexadbc2ba5be4f0c9474df9e971a1cc6fa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexadbc2ba5be4f0c9474df9e971a1cc6fa.url(options),
    method: 'get',
})

indexadbc2ba5be4f0c9474df9e971a1cc6fa.definition = {
    methods: ["get","head"],
    url: '/procurement/installments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
indexadbc2ba5be4f0c9474df9e971a1cc6fa.url = (options?: RouteQueryOptions) => {
    return indexadbc2ba5be4f0c9474df9e971a1cc6fa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
indexadbc2ba5be4f0c9474df9e971a1cc6fa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexadbc2ba5be4f0c9474df9e971a1cc6fa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
indexadbc2ba5be4f0c9474df9e971a1cc6fa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexadbc2ba5be4f0c9474df9e971a1cc6fa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
const index1ffbdbd7856c672a2e01acf9027bb738 = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1ffbdbd7856c672a2e01acf9027bb738.url(args, options),
    method: 'get',
})

index1ffbdbd7856c672a2e01acf9027bb738.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/financial-installments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
index1ffbdbd7856c672a2e01acf9027bb738.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return index1ffbdbd7856c672a2e01acf9027bb738.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
index1ffbdbd7856c672a2e01acf9027bb738.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1ffbdbd7856c672a2e01acf9027bb738.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
index1ffbdbd7856c672a2e01acf9027bb738.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index1ffbdbd7856c672a2e01acf9027bb738.url(args, options),
    method: 'head',
})

export const index = {
    '/procurement/installments': indexadbc2ba5be4f0c9474df9e971a1cc6fa,
    '/mhp/sites/{site}/financial-installments': index1ffbdbd7856c672a2e01acf9027bb738,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
const create54368a98da1979d58206c206f21116c8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create54368a98da1979d58206c206f21116c8.url(options),
    method: 'get',
})

create54368a98da1979d58206c206f21116c8.definition = {
    methods: ["get","head"],
    url: '/procurement/installments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
create54368a98da1979d58206c206f21116c8.url = (options?: RouteQueryOptions) => {
    return create54368a98da1979d58206c206f21116c8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
create54368a98da1979d58206c206f21116c8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create54368a98da1979d58206c206f21116c8.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/procurement/installments/create'
*/
create54368a98da1979d58206c206f21116c8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create54368a98da1979d58206c206f21116c8.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/mhp/sites/{site}/financial-installments/create'
*/
const create3f0d277cde2af89c0924083b69b3fb5b = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create3f0d277cde2af89c0924083b69b3fb5b.url(args, options),
    method: 'get',
})

create3f0d277cde2af89c0924083b69b3fb5b.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/financial-installments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/mhp/sites/{site}/financial-installments/create'
*/
create3f0d277cde2af89c0924083b69b3fb5b.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
    }

    return create3f0d277cde2af89c0924083b69b3fb5b.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/mhp/sites/{site}/financial-installments/create'
*/
create3f0d277cde2af89c0924083b69b3fb5b.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create3f0d277cde2af89c0924083b69b3fb5b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:83
* @route '/mhp/sites/{site}/financial-installments/create'
*/
create3f0d277cde2af89c0924083b69b3fb5b.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create3f0d277cde2af89c0924083b69b3fb5b.url(args, options),
    method: 'head',
})

export const create = {
    '/procurement/installments/create': create54368a98da1979d58206c206f21116c8,
    '/mhp/sites/{site}/financial-installments/create': create3f0d277cde2af89c0924083b69b3fb5b,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/procurement/installments'
*/
const storeadbc2ba5be4f0c9474df9e971a1cc6fa = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeadbc2ba5be4f0c9474df9e971a1cc6fa.url(options),
    method: 'post',
})

storeadbc2ba5be4f0c9474df9e971a1cc6fa.definition = {
    methods: ["post"],
    url: '/procurement/installments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/procurement/installments'
*/
storeadbc2ba5be4f0c9474df9e971a1cc6fa.url = (options?: RouteQueryOptions) => {
    return storeadbc2ba5be4f0c9474df9e971a1cc6fa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/procurement/installments'
*/
storeadbc2ba5be4f0c9474df9e971a1cc6fa.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeadbc2ba5be4f0c9474df9e971a1cc6fa.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/mhp/sites/{site}/financial-installments'
*/
const store1ffbdbd7856c672a2e01acf9027bb738 = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1ffbdbd7856c672a2e01acf9027bb738.url(args, options),
    method: 'post',
})

store1ffbdbd7856c672a2e01acf9027bb738.definition = {
    methods: ["post"],
    url: '/mhp/sites/{site}/financial-installments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/mhp/sites/{site}/financial-installments'
*/
store1ffbdbd7856c672a2e01acf9027bb738.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { site: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
    }

    return store1ffbdbd7856c672a2e01acf9027bb738.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:92
* @route '/mhp/sites/{site}/financial-installments'
*/
store1ffbdbd7856c672a2e01acf9027bb738.post = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1ffbdbd7856c672a2e01acf9027bb738.url(args, options),
    method: 'post',
})

export const store = {
    '/procurement/installments': storeadbc2ba5be4f0c9474df9e971a1cc6fa,
    '/mhp/sites/{site}/financial-installments': store1ffbdbd7856c672a2e01acf9027bb738,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
const showe2170ef397635faa0e9ad94994609def = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'get',
})

showe2170ef397635faa0e9ad94994609def.definition = {
    methods: ["get","head"],
    url: '/procurement/installments/{installment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
showe2170ef397635faa0e9ad94994609def.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showe2170ef397635faa0e9ad94994609def.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
showe2170ef397635faa0e9ad94994609def.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/procurement/installments/{installment}'
*/
showe2170ef397635faa0e9ad94994609def.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showe2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
const show1b505440b9e3fb03b75ac0c61a97a121 = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'get',
})

show1b505440b9e3fb03b75ac0c61a97a121.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
show1b505440b9e3fb03b75ac0c61a97a121.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        financial_installment: args.financial_installment,
    }

    return show1b505440b9e3fb03b75ac0c61a97a121.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
show1b505440b9e3fb03b75ac0c61a97a121.get = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:106
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
show1b505440b9e3fb03b75ac0c61a97a121.head = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'head',
})

export const show = {
    '/procurement/installments/{installment}': showe2170ef397635faa0e9ad94994609def,
    '/mhp/sites/{site}/financial-installments/{financial_installment}': show1b505440b9e3fb03b75ac0c61a97a121,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
const edit34274db65f39ce3c6bd51a8c0ccb064f = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit34274db65f39ce3c6bd51a8c0ccb064f.url(args, options),
    method: 'get',
})

edit34274db65f39ce3c6bd51a8c0ccb064f.definition = {
    methods: ["get","head"],
    url: '/procurement/installments/{installment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
edit34274db65f39ce3c6bd51a8c0ccb064f.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit34274db65f39ce3c6bd51a8c0ccb064f.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
edit34274db65f39ce3c6bd51a8c0ccb064f.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit34274db65f39ce3c6bd51a8c0ccb064f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/procurement/installments/{installment}/edit'
*/
edit34274db65f39ce3c6bd51a8c0ccb064f.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit34274db65f39ce3c6bd51a8c0ccb064f.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
const edit44a2d0d677d33367a7230f2a7babd1b9 = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit44a2d0d677d33367a7230f2a7babd1b9.url(args, options),
    method: 'get',
})

edit44a2d0d677d33367a7230f2a7babd1b9.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
edit44a2d0d677d33367a7230f2a7babd1b9.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        financial_installment: args.financial_installment,
    }

    return edit44a2d0d677d33367a7230f2a7babd1b9.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
edit44a2d0d677d33367a7230f2a7babd1b9.get = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit44a2d0d677d33367a7230f2a7babd1b9.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:121
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
edit44a2d0d677d33367a7230f2a7babd1b9.head = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit44a2d0d677d33367a7230f2a7babd1b9.url(args, options),
    method: 'head',
})

export const edit = {
    '/procurement/installments/{installment}/edit': edit34274db65f39ce3c6bd51a8c0ccb064f,
    '/mhp/sites/{site}/financial-installments/{financial_installment}/edit': edit44a2d0d677d33367a7230f2a7babd1b9,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
const updatee2170ef397635faa0e9ad94994609def = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'put',
})

updatee2170ef397635faa0e9ad94994609def.definition = {
    methods: ["put","patch"],
    url: '/procurement/installments/{installment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
updatee2170ef397635faa0e9ad94994609def.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatee2170ef397635faa0e9ad94994609def.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
updatee2170ef397635faa0e9ad94994609def.put = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/procurement/installments/{installment}'
*/
updatee2170ef397635faa0e9ad94994609def.patch = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatee2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
const update1b505440b9e3fb03b75ac0c61a97a121 = (args: { site: number | { id: number }, financial_installment: string | number } | [site: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'put',
})

update1b505440b9e3fb03b75ac0c61a97a121.definition = {
    methods: ["put","patch"],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
update1b505440b9e3fb03b75ac0c61a97a121.url = (args: { site: number | { id: number }, financial_installment: string | number } | [site: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
        financial_installment: args.financial_installment,
    }

    return update1b505440b9e3fb03b75ac0c61a97a121.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
update1b505440b9e3fb03b75ac0c61a97a121.put = (args: { site: number | { id: number }, financial_installment: string | number } | [site: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:129
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
update1b505440b9e3fb03b75ac0c61a97a121.patch = (args: { site: number | { id: number }, financial_installment: string | number } | [site: number | { id: number }, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'patch',
})

export const update = {
    '/procurement/installments/{installment}': updatee2170ef397635faa0e9ad94994609def,
    '/mhp/sites/{site}/financial-installments/{financial_installment}': update1b505440b9e3fb03b75ac0c61a97a121,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/procurement/installments/{installment}'
*/
const destroye2170ef397635faa0e9ad94994609def = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'delete',
})

destroye2170ef397635faa0e9ad94994609def.definition = {
    methods: ["delete"],
    url: '/procurement/installments/{installment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/procurement/installments/{installment}'
*/
destroye2170ef397635faa0e9ad94994609def.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroye2170ef397635faa0e9ad94994609def.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/procurement/installments/{installment}'
*/
destroye2170ef397635faa0e9ad94994609def.delete = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye2170ef397635faa0e9ad94994609def.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
const destroy1b505440b9e3fb03b75ac0c61a97a121 = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'delete',
})

destroy1b505440b9e3fb03b75ac0c61a97a121.definition = {
    methods: ["delete"],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
destroy1b505440b9e3fb03b75ac0c61a97a121.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            financial_installment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: args.site,
        financial_installment: args.financial_installment,
    }

    return destroy1b505440b9e3fb03b75ac0c61a97a121.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:144
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
destroy1b505440b9e3fb03b75ac0c61a97a121.delete = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1b505440b9e3fb03b75ac0c61a97a121.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/procurement/installments/{installment}': destroye2170ef397635faa0e9ad94994609def,
    '/mhp/sites/{site}/financial-installments/{financial_installment}': destroy1b505440b9e3fb03b75ac0c61a97a121,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::getFinancialProgress
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:53
* @route '/mhp/sites/{site}/financial-progress'
*/
export const getFinancialProgress = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFinancialProgress.url(args, options),
    method: 'get',
})

getFinancialProgress.definition = {
    methods: ["get","head"],
    url: '/mhp/sites/{site}/financial-progress',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::getFinancialProgress
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:53
* @route '/mhp/sites/{site}/financial-progress'
*/
getFinancialProgress.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { site: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { site: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            site: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        site: typeof args.site === 'object'
        ? args.site.id
        : args.site,
    }

    return getFinancialProgress.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::getFinancialProgress
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:53
* @route '/mhp/sites/{site}/financial-progress'
*/
getFinancialProgress.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFinancialProgress.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::getFinancialProgress
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:53
* @route '/mhp/sites/{site}/financial-progress'
*/
getFinancialProgress.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFinancialProgress.url(args, options),
    method: 'head',
})

const ProjectFinancialInstallmentController = { index, create, store, show, edit, update, destroy, getFinancialProgress }

export default ProjectFinancialInstallmentController