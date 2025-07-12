import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
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
    url: '/mhp/mhp-sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
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
    url: '/mhp/mhp-sites/create',
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp-sites'
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
    url: '/mhp/mhp-sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp-sites'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp-sites'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
export const show = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-sites/{mhp_site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
show.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mhp_site: args }
    }

    if (Array.isArray(args)) {
        args = {
            mhp_site: args[0],
        }
    }

    const parsedArgs = {
        mhp_site: args.mhp_site,
    }

    return show.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
show.get = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
show.head = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
export const edit = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-sites/{mhp_site}/edit',
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
edit.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mhp_site: args }
    }

    if (Array.isArray(args)) {
        args = {
            mhp_site: args[0],
        }
    }

    const parsedArgs = {
        mhp_site: args.mhp_site,
    }

    return edit.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
edit.get = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
edit.head = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
export const update = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/mhp-sites/{mhp_site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
update.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mhp_site: args }
    }

    if (Array.isArray(args)) {
        args = {
            mhp_site: args[0],
        }
    }

    const parsedArgs = {
        mhp_site: args.mhp_site,
    }

    return update.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
update.put = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
update.patch = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
export const destroy = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/mhp-sites/{mhp_site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
destroy.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mhp_site: args }
    }

    if (Array.isArray(args)) {
        args = {
            mhp_site: args[0],
        }
    }

    const parsedArgs = {
        mhp_site: args.mhp_site,
    }

    return destroy.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
destroy.delete = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const mhpSites = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
}

export default mhpSites