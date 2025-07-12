import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-site/create'
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
    url: '/mhp/mhp-site/create',
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-site/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-site/create'
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
* @route '/mhp/mhp-site/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-site/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/mhp/mhp-site/{id}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-site/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-site/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

const mhpSite = {
    create,
    update,
}

export default mhpSite