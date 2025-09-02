import { queryParams, type QueryParams } from './../../../wayfinder'
import physicalProgresses from './physical-progresses'
import emeInfo from './eme-info'
/**
* @see \App\Http\Controllers\MhpSiteController::getCbos
* @see app/Http/Controllers/MhpSiteController.php:144
* @route '/mhp/sites/get-cbos'
*/
export const getCbos = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getCbos.url(options),
    method: 'get',
})

getCbos.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/get-cbos',
}

/**
* @see \App\Http\Controllers\MhpSiteController::getCbos
* @see app/Http/Controllers/MhpSiteController.php:144
* @route '/mhp/sites/get-cbos'
*/
getCbos.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return getCbos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::getCbos
* @see app/Http/Controllers/MhpSiteController.php:144
* @route '/mhp/sites/get-cbos'
*/
getCbos.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getCbos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::getCbos
* @see app/Http/Controllers/MhpSiteController.php:144
* @route '/mhp/sites/get-cbos'
*/
getCbos.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getCbos.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:33
* @route '/mhp/sites'
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
    url: '/mhp/sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:33
* @route '/mhp/sites'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:33
* @route '/mhp/sites'
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
* @see app/Http/Controllers/MhpSiteController.php:33
* @route '/mhp/sites'
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
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/create'
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
    url: '/mhp/sites/create',
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/create'
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
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/create'
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
* @see app/Http/Controllers/MhpSiteController.php:76
* @route '/mhp/sites'
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
    url: '/mhp/sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:76
* @route '/mhp/sites'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:76
* @route '/mhp/sites'
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
* @see app/Http/Controllers/MhpSiteController.php:87
* @route '/mhp/sites/{site}'
*/
export const show = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:87
* @route '/mhp/sites/{site}'
*/
show.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:87
* @route '/mhp/sites/{site}'
*/
show.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:87
* @route '/mhp/sites/{site}'
*/
show.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/{site}/edit'
*/
export const edit = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/edit',
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/{site}/edit'
*/
edit.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/{site}/edit'
*/
edit.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/sites/{site}/edit'
*/
edit.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:93
* @route '/mhp/sites/{site}'
*/
export const update = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:93
* @route '/mhp/sites/{site}'
*/
update.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:93
* @route '/mhp/sites/{site}'
*/
update.put = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:93
* @route '/mhp/sites/{site}'
*/
update.patch = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:104
* @route '/mhp/sites/{site}'
*/
export const destroy = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:104
* @route '/mhp/sites/{site}'
*/
destroy.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:104
* @route '/mhp/sites/{site}'
*/
destroy.delete = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:115
* @route '/mhp/sites/auto-search'
*/
export const autoSearch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})

autoSearch.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/auto-search',
}

/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:115
* @route '/mhp/sites/auto-search'
*/
autoSearch.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return autoSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:115
* @route '/mhp/sites/auto-search'
*/
autoSearch.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: autoSearch.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:115
* @route '/mhp/sites/auto-search'
*/
autoSearch.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: autoSearch.url(options),
    method: 'head',
})

const sites = {
    getCbos,
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
    autoSearch,
    physicalProgresses,
    emeInfo,
}

export default sites