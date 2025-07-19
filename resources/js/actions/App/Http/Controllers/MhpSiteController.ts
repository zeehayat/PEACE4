import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/cbos/auto-search'
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
    url: '/cbos/auto-search',
}

/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/cbos/auto-search'
*/
autoSearch.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return autoSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/cbos/auto-search'
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
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/cbos/auto-search'
*/
autoSearch.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: autoSearch.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::getCbos
* @see app/Http/Controllers/MhpSiteController.php:213
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
* @see app/Http/Controllers/MhpSiteController.php:213
* @route '/mhp/sites/get-cbos'
*/
getCbos.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return getCbos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::getCbos
* @see app/Http/Controllers/MhpSiteController.php:213
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
* @see app/Http/Controllers/MhpSiteController.php:213
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
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp/sites'
*/
const index46df9f494b976fa503fc6252f167ac37 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index46df9f494b976fa503fc6252f167ac37.url(options),
    method: 'get',
})

index46df9f494b976fa503fc6252f167ac37.definition = {
    methods: ['get','head'],
    url: '/mhp/sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp/sites'
*/
index46df9f494b976fa503fc6252f167ac37.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index46df9f494b976fa503fc6252f167ac37.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp/sites'
*/
index46df9f494b976fa503fc6252f167ac37.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index46df9f494b976fa503fc6252f167ac37.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp/sites'
*/
index46df9f494b976fa503fc6252f167ac37.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index46df9f494b976fa503fc6252f167ac37.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp'
*/
const index16b98f0285675184a22450224371160e = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index16b98f0285675184a22450224371160e.url(options),
    method: 'get',
})

index16b98f0285675184a22450224371160e.definition = {
    methods: ['get','head'],
    url: '/mhp',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp'
*/
index16b98f0285675184a22450224371160e.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index16b98f0285675184a22450224371160e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp'
*/
index16b98f0285675184a22450224371160e.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index16b98f0285675184a22450224371160e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:27
* @route '/mhp'
*/
index16b98f0285675184a22450224371160e.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index16b98f0285675184a22450224371160e.url(options),
    method: 'head',
})

export const index = {
    '/mhp/sites': index46df9f494b976fa503fc6252f167ac37,
    '/mhp': index16b98f0285675184a22450224371160e,
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:95
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
* @see app/Http/Controllers/MhpSiteController.php:95
* @route '/mhp/sites/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:95
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
* @see app/Http/Controllers/MhpSiteController.php:95
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
* @see app/Http/Controllers/MhpSiteController.php:104
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
* @see app/Http/Controllers/MhpSiteController.php:104
* @route '/mhp/sites'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:104
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
* @see app/Http/Controllers/MhpSiteController.php:118
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
* @see app/Http/Controllers/MhpSiteController.php:118
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
* @see app/Http/Controllers/MhpSiteController.php:118
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
* @see app/Http/Controllers/MhpSiteController.php:118
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
* @see app/Http/Controllers/MhpSiteController.php:153
* @route '/mhp/sites/{site}/edit'
*/
export const edit = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
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
* @see app/Http/Controllers/MhpSiteController.php:153
* @route '/mhp/sites/{site}/edit'
*/
edit.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:153
* @route '/mhp/sites/{site}/edit'
*/
edit.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:153
* @route '/mhp/sites/{site}/edit'
*/
edit.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:162
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
* @see app/Http/Controllers/MhpSiteController.php:162
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
* @see app/Http/Controllers/MhpSiteController.php:162
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
* @see app/Http/Controllers/MhpSiteController.php:162
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
* @see app/Http/Controllers/MhpSiteController.php:176
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
* @see app/Http/Controllers/MhpSiteController.php:176
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
* @see app/Http/Controllers/MhpSiteController.php:176
* @route '/mhp/sites/{site}'
*/
destroy.delete = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MhpSiteController = { autoSearch, getCbos, index, create, store, show, edit, update, destroy }

export default MhpSiteController