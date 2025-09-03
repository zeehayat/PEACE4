import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/procurement/installments'
*/
index1aed2288615d1efbbb4b89735fbdc34b.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index1aed2288615d1efbbb4b89735fbdc34b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
const index6bba40a7c50536e3b59dcae230e3c8d8 = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index6bba40a7c50536e3b59dcae230e3c8d8.url(args, options),
    method: 'get',
})

index6bba40a7c50536e3b59dcae230e3c8d8.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
index6bba40a7c50536e3b59dcae230e3c8d8.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index6bba40a7c50536e3b59dcae230e3c8d8.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
index6bba40a7c50536e3b59dcae230e3c8d8.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index6bba40a7c50536e3b59dcae230e3c8d8.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::index
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:27
* @route '/mhp/sites/{site}/financial-installments'
*/
index6bba40a7c50536e3b59dcae230e3c8d8.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index6bba40a7c50536e3b59dcae230e3c8d8.url(args, options),
    method: 'head',
})

export const index = {
    '/procurement/installments': index1aed2288615d1efbbb4b89735fbdc34b,
    '/mhp/sites/{site}/financial-installments': index6bba40a7c50536e3b59dcae230e3c8d8,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/procurement/installments/create'
*/
const create42c02200557b7f167ed49ed8585c59f3 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create42c02200557b7f167ed49ed8585c59f3.url(options),
    method: 'get',
})

create42c02200557b7f167ed49ed8585c59f3.definition = {
    methods: ['get','head'],
    url: '/procurement/installments/create',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/procurement/installments/create'
*/
create42c02200557b7f167ed49ed8585c59f3.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create42c02200557b7f167ed49ed8585c59f3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/procurement/installments/create'
*/
create42c02200557b7f167ed49ed8585c59f3.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create42c02200557b7f167ed49ed8585c59f3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/procurement/installments/create'
*/
create42c02200557b7f167ed49ed8585c59f3.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create42c02200557b7f167ed49ed8585c59f3.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/mhp/sites/{site}/financial-installments/create'
*/
const create137796d9a177d53cea5f5d56cdabef1f = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create137796d9a177d53cea5f5d56cdabef1f.url(args, options),
    method: 'get',
})

create137796d9a177d53cea5f5d56cdabef1f.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments/create',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/mhp/sites/{site}/financial-installments/create'
*/
create137796d9a177d53cea5f5d56cdabef1f.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return create137796d9a177d53cea5f5d56cdabef1f.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/mhp/sites/{site}/financial-installments/create'
*/
create137796d9a177d53cea5f5d56cdabef1f.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create137796d9a177d53cea5f5d56cdabef1f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::create
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:52
* @route '/mhp/sites/{site}/financial-installments/create'
*/
create137796d9a177d53cea5f5d56cdabef1f.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create137796d9a177d53cea5f5d56cdabef1f.url(args, options),
    method: 'head',
})

export const create = {
    '/procurement/installments/create': create42c02200557b7f167ed49ed8585c59f3,
    '/mhp/sites/{site}/financial-installments/create': create137796d9a177d53cea5f5d56cdabef1f,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
* @route '/procurement/installments'
*/
store1aed2288615d1efbbb4b89735fbdc34b.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store1aed2288615d1efbbb4b89735fbdc34b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
* @route '/mhp/sites/{site}/financial-installments'
*/
const store6bba40a7c50536e3b59dcae230e3c8d8 = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store6bba40a7c50536e3b59dcae230e3c8d8.url(args, options),
    method: 'post',
})

store6bba40a7c50536e3b59dcae230e3c8d8.definition = {
    methods: ['post'],
    url: '/mhp/sites/{site}/financial-installments',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
* @route '/mhp/sites/{site}/financial-installments'
*/
store6bba40a7c50536e3b59dcae230e3c8d8.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return store6bba40a7c50536e3b59dcae230e3c8d8.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::store
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:61
* @route '/mhp/sites/{site}/financial-installments'
*/
store6bba40a7c50536e3b59dcae230e3c8d8.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store6bba40a7c50536e3b59dcae230e3c8d8.url(args, options),
    method: 'post',
})

export const store = {
    '/procurement/installments': store1aed2288615d1efbbb4b89735fbdc34b,
    '/mhp/sites/{site}/financial-installments': store6bba40a7c50536e3b59dcae230e3c8d8,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
const showd20e48c044f75a94f8b889ebee9e4342 = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showd20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'get',
})

showd20e48c044f75a94f8b889ebee9e4342.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
showd20e48c044f75a94f8b889ebee9e4342.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showd20e48c044f75a94f8b889ebee9e4342.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
showd20e48c044f75a94f8b889ebee9e4342.get = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showd20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::show
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:75
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
showd20e48c044f75a94f8b889ebee9e4342.head = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showd20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'head',
})

export const show = {
    '/procurement/installments/{installment}': showa29f368bae2630b6f68ec4eefe40c7d5,
    '/mhp/sites/{site}/financial-installments/{financial_installment}': showd20e48c044f75a94f8b889ebee9e4342,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/procurement/installments/{installment}/edit'
*/
const editdd6c2ab2ee9e7cf8314c04c35dbade35 = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: editdd6c2ab2ee9e7cf8314c04c35dbade35.url(args, options),
    method: 'get',
})

editdd6c2ab2ee9e7cf8314c04c35dbade35.definition = {
    methods: ['get','head'],
    url: '/procurement/installments/{installment}/edit',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/procurement/installments/{installment}/edit'
*/
editdd6c2ab2ee9e7cf8314c04c35dbade35.url = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return editdd6c2ab2ee9e7cf8314c04c35dbade35.definition.url
            .replace('{installment}', parsedArgs.installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/procurement/installments/{installment}/edit'
*/
editdd6c2ab2ee9e7cf8314c04c35dbade35.get = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: editdd6c2ab2ee9e7cf8314c04c35dbade35.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/procurement/installments/{installment}/edit'
*/
editdd6c2ab2ee9e7cf8314c04c35dbade35.head = (args: { installment: string | number } | [installment: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: editdd6c2ab2ee9e7cf8314c04c35dbade35.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
const edit1fd2b4241ecd8a0fffbbc5653d9a0b5b = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.url(args, options),
    method: 'get',
})

edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}/edit',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.get = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::edit
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:90
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}/edit'
*/
edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.head = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit1fd2b4241ecd8a0fffbbc5653d9a0b5b.url(args, options),
    method: 'head',
})

export const edit = {
    '/procurement/installments/{installment}/edit': editdd6c2ab2ee9e7cf8314c04c35dbade35,
    '/mhp/sites/{site}/financial-installments/{financial_installment}/edit': edit1fd2b4241ecd8a0fffbbc5653d9a0b5b,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
const updated20e48c044f75a94f8b889ebee9e4342 = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updated20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'put',
})

updated20e48c044f75a94f8b889ebee9e4342.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
updated20e48c044f75a94f8b889ebee9e4342.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updated20e48c044f75a94f8b889ebee9e4342.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
updated20e48c044f75a94f8b889ebee9e4342.put = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updated20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::update
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:98
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
updated20e48c044f75a94f8b889ebee9e4342.patch = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updated20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'patch',
})

export const update = {
    '/procurement/installments/{installment}': updatea29f368bae2630b6f68ec4eefe40c7d5,
    '/mhp/sites/{site}/financial-installments/{financial_installment}': updated20e48c044f75a94f8b889ebee9e4342,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
const destroyd20e48c044f75a94f8b889ebee9e4342 = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroyd20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'delete',
})

destroyd20e48c044f75a94f8b889ebee9e4342.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/financial-installments/{financial_installment}',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
destroyd20e48c044f75a94f8b889ebee9e4342.url = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroyd20e48c044f75a94f8b889ebee9e4342.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{financial_installment}', parsedArgs.financial_installment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::destroy
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:112
* @route '/mhp/sites/{site}/financial-installments/{financial_installment}'
*/
destroyd20e48c044f75a94f8b889ebee9e4342.delete = (args: { site: string | number, financial_installment: string | number } | [site: string | number, financial_installment: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroyd20e48c044f75a94f8b889ebee9e4342.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/procurement/installments/{installment}': destroya29f368bae2630b6f68ec4eefe40c7d5,
    '/mhp/sites/{site}/financial-installments/{financial_installment}': destroyd20e48c044f75a94f8b889ebee9e4342,
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::getFinancialProgress
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:126
* @route '/mhp/sites/{site}/financial-progress'
*/
export const getFinancialProgress = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getFinancialProgress.url(args, options),
    method: 'get',
})

getFinancialProgress.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/financial-progress',
}

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::getFinancialProgress
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:126
* @route '/mhp/sites/{site}/financial-progress'
*/
getFinancialProgress.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:126
* @route '/mhp/sites/{site}/financial-progress'
*/
getFinancialProgress.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getFinancialProgress.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectFinancialInstallmentController::getFinancialProgress
* @see app/Http/Controllers/ProjectFinancialInstallmentController.php:126
* @route '/mhp/sites/{site}/financial-progress'
*/
getFinancialProgress.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getFinancialProgress.url(args, options),
    method: 'head',
})

const ProjectFinancialInstallmentController = { index, create, store, show, edit, update, destroy, getFinancialProgress }

export default ProjectFinancialInstallmentController