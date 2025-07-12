import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:124
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
* @see app/Http/Controllers/MhpSiteController.php:124
* @route '/cbos/auto-search'
*/
autoSearch.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return autoSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::autoSearch
* @see app/Http/Controllers/MhpSiteController.php:124
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
* @see app/Http/Controllers/MhpSiteController.php:124
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
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
*/
const indexa760c5777d1a386a57344e45478d43b7 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa760c5777d1a386a57344e45478d43b7.url(options),
    method: 'get',
})

indexa760c5777d1a386a57344e45478d43b7.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
*/
indexa760c5777d1a386a57344e45478d43b7.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexa760c5777d1a386a57344e45478d43b7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
*/
indexa760c5777d1a386a57344e45478d43b7.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa760c5777d1a386a57344e45478d43b7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp-sites'
*/
indexa760c5777d1a386a57344e45478d43b7.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexa760c5777d1a386a57344e45478d43b7.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp/sites'
*/
const index5de52dc6119e610cdf43e5524ccb3d28 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index5de52dc6119e610cdf43e5524ccb3d28.url(options),
    method: 'get',
})

index5de52dc6119e610cdf43e5524ccb3d28.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp/sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp/sites'
*/
index5de52dc6119e610cdf43e5524ccb3d28.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index5de52dc6119e610cdf43e5524ccb3d28.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp/sites'
*/
index5de52dc6119e610cdf43e5524ccb3d28.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index5de52dc6119e610cdf43e5524ccb3d28.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/mhp/sites'
*/
index5de52dc6119e610cdf43e5524ccb3d28.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index5de52dc6119e610cdf43e5524ccb3d28.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
*/
const indexa0f93af6d84d9aac5bfb8d6e857632a1 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa0f93af6d84d9aac5bfb8d6e857632a1.url(options),
    method: 'get',
})

indexa0f93af6d84d9aac5bfb8d6e857632a1.definition = {
    methods: ['get','head'],
    url: '/mhp/index',
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
*/
indexa0f93af6d84d9aac5bfb8d6e857632a1.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexa0f93af6d84d9aac5bfb8d6e857632a1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
*/
indexa0f93af6d84d9aac5bfb8d6e857632a1.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa0f93af6d84d9aac5bfb8d6e857632a1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::index
* @see app/Http/Controllers/MhpSiteController.php:13
* @route '/mhp/index'
*/
indexa0f93af6d84d9aac5bfb8d6e857632a1.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexa0f93af6d84d9aac5bfb8d6e857632a1.url(options),
    method: 'head',
})

export const index = {
    '/mhp/mhp-sites': indexa760c5777d1a386a57344e45478d43b7,
    '/mhp/mhp/sites': index5de52dc6119e610cdf43e5524ccb3d28,
    '/mhp/index': indexa0f93af6d84d9aac5bfb8d6e857632a1,
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
*/
const create8b145a70d1077d3b9f6e48fd3fdeee10 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create8b145a70d1077d3b9f6e48fd3fdeee10.url(options),
    method: 'get',
})

create8b145a70d1077d3b9f6e48fd3fdeee10.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-sites/create',
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
*/
create8b145a70d1077d3b9f6e48fd3fdeee10.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create8b145a70d1077d3b9f6e48fd3fdeee10.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
*/
create8b145a70d1077d3b9f6e48fd3fdeee10.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create8b145a70d1077d3b9f6e48fd3fdeee10.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-sites/create'
*/
create8b145a70d1077d3b9f6e48fd3fdeee10.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create8b145a70d1077d3b9f6e48fd3fdeee10.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-site/create'
*/
const create8c60a009d06af90f45d9e111816533a0 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create8c60a009d06af90f45d9e111816533a0.url(options),
    method: 'get',
})

create8c60a009d06af90f45d9e111816533a0.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-site/create',
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-site/create'
*/
create8c60a009d06af90f45d9e111816533a0.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create8c60a009d06af90f45d9e111816533a0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-site/create'
*/
create8c60a009d06af90f45d9e111816533a0.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create8c60a009d06af90f45d9e111816533a0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp-site/create'
*/
create8c60a009d06af90f45d9e111816533a0.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create8c60a009d06af90f45d9e111816533a0.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp/sites/create'
*/
const createad3a8b6012c8aac1cc1d09be0a45941a = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: createad3a8b6012c8aac1cc1d09be0a45941a.url(options),
    method: 'get',
})

createad3a8b6012c8aac1cc1d09be0a45941a.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp/sites/create',
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp/sites/create'
*/
createad3a8b6012c8aac1cc1d09be0a45941a.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return createad3a8b6012c8aac1cc1d09be0a45941a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp/sites/create'
*/
createad3a8b6012c8aac1cc1d09be0a45941a.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: createad3a8b6012c8aac1cc1d09be0a45941a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::create
* @see app/Http/Controllers/MhpSiteController.php:139
* @route '/mhp/mhp/sites/create'
*/
createad3a8b6012c8aac1cc1d09be0a45941a.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: createad3a8b6012c8aac1cc1d09be0a45941a.url(options),
    method: 'head',
})

export const create = {
    '/mhp/mhp-sites/create': create8b145a70d1077d3b9f6e48fd3fdeee10,
    '/mhp/mhp-site/create': create8c60a009d06af90f45d9e111816533a0,
    '/mhp/mhp/sites/create': createad3a8b6012c8aac1cc1d09be0a45941a,
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp-sites'
*/
const storea760c5777d1a386a57344e45478d43b7 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storea760c5777d1a386a57344e45478d43b7.url(options),
    method: 'post',
})

storea760c5777d1a386a57344e45478d43b7.definition = {
    methods: ['post'],
    url: '/mhp/mhp-sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp-sites'
*/
storea760c5777d1a386a57344e45478d43b7.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storea760c5777d1a386a57344e45478d43b7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp-sites'
*/
storea760c5777d1a386a57344e45478d43b7.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storea760c5777d1a386a57344e45478d43b7.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp/sites'
*/
const store5de52dc6119e610cdf43e5524ccb3d28 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store5de52dc6119e610cdf43e5524ccb3d28.url(options),
    method: 'post',
})

store5de52dc6119e610cdf43e5524ccb3d28.definition = {
    methods: ['post'],
    url: '/mhp/mhp/sites',
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp/sites'
*/
store5de52dc6119e610cdf43e5524ccb3d28.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store5de52dc6119e610cdf43e5524ccb3d28.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::store
* @see app/Http/Controllers/MhpSiteController.php:143
* @route '/mhp/mhp/sites'
*/
store5de52dc6119e610cdf43e5524ccb3d28.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store5de52dc6119e610cdf43e5524ccb3d28.url(options),
    method: 'post',
})

export const store = {
    '/mhp/mhp-sites': storea760c5777d1a386a57344e45478d43b7,
    '/mhp/mhp/sites': store5de52dc6119e610cdf43e5524ccb3d28,
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
const showcce31b3ed26df628d7a1b810776a0aeb = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showcce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'get',
})

showcce31b3ed26df628d7a1b810776a0aeb.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-sites/{mhp_site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
showcce31b3ed26df628d7a1b810776a0aeb.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showcce31b3ed26df628d7a1b810776a0aeb.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
showcce31b3ed26df628d7a1b810776a0aeb.get = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showcce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
showcce31b3ed26df628d7a1b810776a0aeb.head = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showcce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}'
*/
const show32453ba91a33bc8e8893cf6154c8f2f1 = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'get',
})

show32453ba91a33bc8e8893cf6154c8f2f1.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp/sites/{site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}'
*/
show32453ba91a33bc8e8893cf6154c8f2f1.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show32453ba91a33bc8e8893cf6154c8f2f1.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}'
*/
show32453ba91a33bc8e8893cf6154c8f2f1.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::show
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}'
*/
show32453ba91a33bc8e8893cf6154c8f2f1.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'head',
})

export const show = {
    '/mhp/mhp-sites/{mhp_site}': showcce31b3ed26df628d7a1b810776a0aeb,
    '/mhp/mhp/sites/{site}': show32453ba91a33bc8e8893cf6154c8f2f1,
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
const edit9618f72e01ac2e37ffdd57dec9911ad1 = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit9618f72e01ac2e37ffdd57dec9911ad1.url(args, options),
    method: 'get',
})

edit9618f72e01ac2e37ffdd57dec9911ad1.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp-sites/{mhp_site}/edit',
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
edit9618f72e01ac2e37ffdd57dec9911ad1.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit9618f72e01ac2e37ffdd57dec9911ad1.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
edit9618f72e01ac2e37ffdd57dec9911ad1.get = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit9618f72e01ac2e37ffdd57dec9911ad1.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}/edit'
*/
edit9618f72e01ac2e37ffdd57dec9911ad1.head = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit9618f72e01ac2e37ffdd57dec9911ad1.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}/edit'
*/
const edit07b471ca2ddf056b85e64ce2db00508f = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit07b471ca2ddf056b85e64ce2db00508f.url(args, options),
    method: 'get',
})

edit07b471ca2ddf056b85e64ce2db00508f.definition = {
    methods: ['get','head'],
    url: '/mhp/mhp/sites/{site}/edit',
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}/edit'
*/
edit07b471ca2ddf056b85e64ce2db00508f.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit07b471ca2ddf056b85e64ce2db00508f.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}/edit'
*/
edit07b471ca2ddf056b85e64ce2db00508f.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit07b471ca2ddf056b85e64ce2db00508f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpSiteController::edit
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}/edit'
*/
edit07b471ca2ddf056b85e64ce2db00508f.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit07b471ca2ddf056b85e64ce2db00508f.url(args, options),
    method: 'head',
})

export const edit = {
    '/mhp/mhp-sites/{mhp_site}/edit': edit9618f72e01ac2e37ffdd57dec9911ad1,
    '/mhp/mhp/sites/{site}/edit': edit07b471ca2ddf056b85e64ce2db00508f,
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
const updatecce31b3ed26df628d7a1b810776a0aeb = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatecce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'put',
})

updatecce31b3ed26df628d7a1b810776a0aeb.definition = {
    methods: ['put','patch'],
    url: '/mhp/mhp-sites/{mhp_site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
updatecce31b3ed26df628d7a1b810776a0aeb.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updatecce31b3ed26df628d7a1b810776a0aeb.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
updatecce31b3ed26df628d7a1b810776a0aeb.put = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatecce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-sites/{mhp_site}'
*/
updatecce31b3ed26df628d7a1b810776a0aeb.patch = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updatecce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-site/{id}'
*/
const update6efc7eeac76b710aecc2232f9df425a9 = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update6efc7eeac76b710aecc2232f9df425a9.url(args, options),
    method: 'put',
})

update6efc7eeac76b710aecc2232f9df425a9.definition = {
    methods: ['put'],
    url: '/mhp/mhp-site/{id}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-site/{id}'
*/
update6efc7eeac76b710aecc2232f9df425a9.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update6efc7eeac76b710aecc2232f9df425a9.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp-site/{id}'
*/
update6efc7eeac76b710aecc2232f9df425a9.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update6efc7eeac76b710aecc2232f9df425a9.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp/sites/{site}'
*/
const update32453ba91a33bc8e8893cf6154c8f2f1 = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'put',
})

update32453ba91a33bc8e8893cf6154c8f2f1.definition = {
    methods: ['put','patch'],
    url: '/mhp/mhp/sites/{site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp/sites/{site}'
*/
update32453ba91a33bc8e8893cf6154c8f2f1.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update32453ba91a33bc8e8893cf6154c8f2f1.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp/sites/{site}'
*/
update32453ba91a33bc8e8893cf6154c8f2f1.put = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MhpSiteController::update
* @see app/Http/Controllers/MhpSiteController.php:188
* @route '/mhp/mhp/sites/{site}'
*/
update32453ba91a33bc8e8893cf6154c8f2f1.patch = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'patch',
})

export const update = {
    '/mhp/mhp-sites/{mhp_site}': updatecce31b3ed26df628d7a1b810776a0aeb,
    '/mhp/mhp-site/{id}': update6efc7eeac76b710aecc2232f9df425a9,
    '/mhp/mhp/sites/{site}': update32453ba91a33bc8e8893cf6154c8f2f1,
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
const destroycce31b3ed26df628d7a1b810776a0aeb = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroycce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'delete',
})

destroycce31b3ed26df628d7a1b810776a0aeb.definition = {
    methods: ['delete'],
    url: '/mhp/mhp-sites/{mhp_site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
destroycce31b3ed26df628d7a1b810776a0aeb.url = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroycce31b3ed26df628d7a1b810776a0aeb.definition.url
            .replace('{mhp_site}', parsedArgs.mhp_site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp-sites/{mhp_site}'
*/
destroycce31b3ed26df628d7a1b810776a0aeb.delete = (args: { mhp_site: string | number } | [mhp_site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroycce31b3ed26df628d7a1b810776a0aeb.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}'
*/
const destroy32453ba91a33bc8e8893cf6154c8f2f1 = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'delete',
})

destroy32453ba91a33bc8e8893cf6154c8f2f1.definition = {
    methods: ['delete'],
    url: '/mhp/mhp/sites/{site}',
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}'
*/
destroy32453ba91a33bc8e8893cf6154c8f2f1.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy32453ba91a33bc8e8893cf6154c8f2f1.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpSiteController::destroy
* @see app/Http/Controllers/MhpSiteController.php:0
* @route '/mhp/mhp/sites/{site}'
*/
destroy32453ba91a33bc8e8893cf6154c8f2f1.delete = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy32453ba91a33bc8e8893cf6154c8f2f1.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/mhp/mhp-sites/{mhp_site}': destroycce31b3ed26df628d7a1b810776a0aeb,
    '/mhp/mhp/sites/{site}': destroy32453ba91a33bc8e8893cf6154c8f2f1,
}

const MhpSiteController = { autoSearch, index, create, store, show, edit, update, destroy }

export default MhpSiteController