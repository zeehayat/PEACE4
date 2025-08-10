import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpSchemeContractController::index
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts'
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
    url: '/mhp/sites/{site}/contracts',
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::index
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts'
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
* @see \App\Http\Controllers\MhpSchemeContractController::index
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts'
*/
index.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::index
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts'
*/
index.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::create
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/create'
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
    url: '/mhp/sites/{site}/contracts/create',
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::create
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/create'
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
* @see \App\Http\Controllers\MhpSchemeContractController::create
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/create'
*/
create.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::create
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/create'
*/
create.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::store
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts'
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
    url: '/mhp/sites/{site}/contracts',
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::store
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts'
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
* @see \App\Http\Controllers\MhpSchemeContractController::store
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts'
*/
store.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::show
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
export const show = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/contracts/{contract}',
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::show
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
show.url = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        contract: args.contract,
    }

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::show
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
show.get = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::show
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
show.head = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::edit
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}/edit'
*/
export const edit = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/contracts/{contract}/edit',
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::edit
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}/edit'
*/
edit.url = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        contract: args.contract,
    }

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::edit
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}/edit'
*/
edit.get = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::edit
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}/edit'
*/
edit.head = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::update
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
export const update = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/contracts/{contract}',
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::update
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
update.url = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        contract: args.contract,
    }

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::update
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
update.put = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::update
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
update.patch = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpSchemeContractController::destroy
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
export const destroy = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/contracts/{contract}',
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::destroy
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
destroy.url = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            contract: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        contract: args.contract,
    }

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSchemeContractController::destroy
* @see [unknown]:0
* @route '/mhp/sites/{site}/contracts/{contract}'
*/
destroy.delete = (args: { site: string | number, contract: string | number } | [site: string | number, contract: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MhpSchemeContractController = { index, create, store, show, edit, update, destroy }

export default MhpSchemeContractController