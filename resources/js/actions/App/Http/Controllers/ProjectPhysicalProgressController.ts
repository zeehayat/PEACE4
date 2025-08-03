import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
const index8dbddb0825194b8305a2013acd276156 = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index8dbddb0825194b8305a2013acd276156.url(args, options),
    method: 'get',
})

index8dbddb0825194b8305a2013acd276156.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/physical-progresses',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index8dbddb0825194b8305a2013acd276156.url = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index8dbddb0825194b8305a2013acd276156.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index8dbddb0825194b8305a2013acd276156.get = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index8dbddb0825194b8305a2013acd276156.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/mhp/sites/{site}/physical-progresses'
*/
index8dbddb0825194b8305a2013acd276156.head = (args: { site: number | { id: number } } | [site: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index8dbddb0825194b8305a2013acd276156.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
const index293eb05a955a946e811f30054e2b5e2a = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index293eb05a955a946e811f30054e2b5e2a.url(args, options),
    method: 'get',
})

index293eb05a955a946e811f30054e2b5e2a.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/physical-progresses',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index293eb05a955a946e811f30054e2b5e2a.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
    }

    return index293eb05a955a946e811f30054e2b5e2a.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index293eb05a955a946e811f30054e2b5e2a.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index293eb05a955a946e811f30054e2b5e2a.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:27
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
index293eb05a955a946e811f30054e2b5e2a.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index293eb05a955a946e811f30054e2b5e2a.url(args, options),
    method: 'head',
})

export const index = {
    '/mhp/sites/{site}/physical-progresses': index8dbddb0825194b8305a2013acd276156,
    '/irrigation/schemes/{scheme}/physical-progresses': index293eb05a955a946e811f30054e2b5e2a,
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
const create5b858c42a5140dc62a72410695b3f885 = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create5b858c42a5140dc62a72410695b3f885.url(args, options),
    method: 'get',
})

create5b858c42a5140dc62a72410695b3f885.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/physical-progresses/create',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create5b858c42a5140dc62a72410695b3f885.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return create5b858c42a5140dc62a72410695b3f885.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create5b858c42a5140dc62a72410695b3f885.get = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create5b858c42a5140dc62a72410695b3f885.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/mhp/sites/{site}/physical-progresses/create'
*/
create5b858c42a5140dc62a72410695b3f885.head = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create5b858c42a5140dc62a72410695b3f885.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
const createc3c65c10cb9fa2c76685390e41a85314 = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: createc3c65c10cb9fa2c76685390e41a85314.url(args, options),
    method: 'get',
})

createc3c65c10cb9fa2c76685390e41a85314.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/physical-progresses/create',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
createc3c65c10cb9fa2c76685390e41a85314.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
    }

    return createc3c65c10cb9fa2c76685390e41a85314.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
createc3c65c10cb9fa2c76685390e41a85314.get = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: createc3c65c10cb9fa2c76685390e41a85314.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::create
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:78
* @route '/irrigation/schemes/{scheme}/physical-progresses/create'
*/
createc3c65c10cb9fa2c76685390e41a85314.head = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: createc3c65c10cb9fa2c76685390e41a85314.url(args, options),
    method: 'head',
})

export const create = {
    '/mhp/sites/{site}/physical-progresses/create': create5b858c42a5140dc62a72410695b3f885,
    '/irrigation/schemes/{scheme}/physical-progresses/create': createc3c65c10cb9fa2c76685390e41a85314,
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:87
* @route '/mhp/sites/{site}/physical-progresses'
*/
const store8dbddb0825194b8305a2013acd276156 = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store8dbddb0825194b8305a2013acd276156.url(args, options),
    method: 'post',
})

store8dbddb0825194b8305a2013acd276156.definition = {
    methods: ['post'],
    url: '/mhp/sites/{site}/physical-progresses',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:87
* @route '/mhp/sites/{site}/physical-progresses'
*/
store8dbddb0825194b8305a2013acd276156.url = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return store8dbddb0825194b8305a2013acd276156.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:87
* @route '/mhp/sites/{site}/physical-progresses'
*/
store8dbddb0825194b8305a2013acd276156.post = (args: { site: string | number } | [site: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store8dbddb0825194b8305a2013acd276156.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:87
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
const store293eb05a955a946e811f30054e2b5e2a = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store293eb05a955a946e811f30054e2b5e2a.url(args, options),
    method: 'post',
})

store293eb05a955a946e811f30054e2b5e2a.definition = {
    methods: ['post'],
    url: '/irrigation/schemes/{scheme}/physical-progresses',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:87
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
store293eb05a955a946e811f30054e2b5e2a.url = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheme: args }
    }

    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
    }

    return store293eb05a955a946e811f30054e2b5e2a.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:87
* @route '/irrigation/schemes/{scheme}/physical-progresses'
*/
store293eb05a955a946e811f30054e2b5e2a.post = (args: { scheme: string | number } | [scheme: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store293eb05a955a946e811f30054e2b5e2a.url(args, options),
    method: 'post',
})

export const store = {
    '/mhp/sites/{site}/physical-progresses': store8dbddb0825194b8305a2013acd276156,
    '/irrigation/schemes/{scheme}/physical-progresses': store293eb05a955a946e811f30054e2b5e2a,
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
const show29f13d6de247dddaa8ff2794fc1abb8e = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'get',
})

show29f13d6de247dddaa8ff2794fc1abb8e.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
show29f13d6de247dddaa8ff2794fc1abb8e.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return show29f13d6de247dddaa8ff2794fc1abb8e.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
show29f13d6de247dddaa8ff2794fc1abb8e.get = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
show29f13d6de247dddaa8ff2794fc1abb8e.head = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
const showd781ab1e442107df22ca9cbc2079cd0b = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showd781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'get',
})

showd781ab1e442107df22ca9cbc2079cd0b.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
showd781ab1e442107df22ca9cbc2079cd0b.url = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        physical_progress: args.physical_progress,
    }

    return showd781ab1e442107df22ca9cbc2079cd0b.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
showd781ab1e442107df22ca9cbc2079cd0b.get = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showd781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:101
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
showd781ab1e442107df22ca9cbc2079cd0b.head = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showd781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'head',
})

export const show = {
    '/mhp/sites/{site}/physical-progresses/{physical_progress}': show29f13d6de247dddaa8ff2794fc1abb8e,
    '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}': showd781ab1e442107df22ca9cbc2079cd0b,
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
const edit7ed70a8973292c070001536355391437 = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit7ed70a8973292c070001536355391437.url(args, options),
    method: 'get',
})

edit7ed70a8973292c070001536355391437.definition = {
    methods: ['get','head'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
edit7ed70a8973292c070001536355391437.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return edit7ed70a8973292c070001536355391437.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
edit7ed70a8973292c070001536355391437.get = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit7ed70a8973292c070001536355391437.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit'
*/
edit7ed70a8973292c070001536355391437.head = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit7ed70a8973292c070001536355391437.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}/edit'
*/
const edit77cc3065b51325d05bcc4d531e99d1c4 = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit77cc3065b51325d05bcc4d531e99d1c4.url(args, options),
    method: 'get',
})

edit77cc3065b51325d05bcc4d531e99d1c4.definition = {
    methods: ['get','head'],
    url: '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}/edit',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}/edit'
*/
edit77cc3065b51325d05bcc4d531e99d1c4.url = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        physical_progress: args.physical_progress,
    }

    return edit77cc3065b51325d05bcc4d531e99d1c4.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}/edit'
*/
edit77cc3065b51325d05bcc4d531e99d1c4.get = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit77cc3065b51325d05bcc4d531e99d1c4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::edit
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:116
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}/edit'
*/
edit77cc3065b51325d05bcc4d531e99d1c4.head = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit77cc3065b51325d05bcc4d531e99d1c4.url(args, options),
    method: 'head',
})

export const edit = {
    '/mhp/sites/{site}/physical-progresses/{physical_progress}/edit': edit7ed70a8973292c070001536355391437,
    '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}/edit': edit77cc3065b51325d05bcc4d531e99d1c4,
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
const update29f13d6de247dddaa8ff2794fc1abb8e = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'put',
})

update29f13d6de247dddaa8ff2794fc1abb8e.definition = {
    methods: ['put','patch'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
update29f13d6de247dddaa8ff2794fc1abb8e.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return update29f13d6de247dddaa8ff2794fc1abb8e.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
update29f13d6de247dddaa8ff2794fc1abb8e.put = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
update29f13d6de247dddaa8ff2794fc1abb8e.patch = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
const updated781ab1e442107df22ca9cbc2079cd0b = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updated781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'put',
})

updated781ab1e442107df22ca9cbc2079cd0b.definition = {
    methods: ['put','patch'],
    url: '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
updated781ab1e442107df22ca9cbc2079cd0b.url = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        physical_progress: args.physical_progress,
    }

    return updated781ab1e442107df22ca9cbc2079cd0b.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
updated781ab1e442107df22ca9cbc2079cd0b.put = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updated781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:124
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
updated781ab1e442107df22ca9cbc2079cd0b.patch = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updated781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'patch',
})

export const update = {
    '/mhp/sites/{site}/physical-progresses/{physical_progress}': update29f13d6de247dddaa8ff2794fc1abb8e,
    '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}': updated781ab1e442107df22ca9cbc2079cd0b,
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:138
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
const destroy29f13d6de247dddaa8ff2794fc1abb8e = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'delete',
})

destroy29f13d6de247dddaa8ff2794fc1abb8e.definition = {
    methods: ['delete'],
    url: '/mhp/sites/{site}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:138
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
destroy29f13d6de247dddaa8ff2794fc1abb8e.url = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            site: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        site: args.site,
        physical_progress: args.physical_progress,
    }

    return destroy29f13d6de247dddaa8ff2794fc1abb8e.definition.url
            .replace('{site}', parsedArgs.site.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:138
* @route '/mhp/sites/{site}/physical-progresses/{physical_progress}'
*/
destroy29f13d6de247dddaa8ff2794fc1abb8e.delete = (args: { site: string | number, physical_progress: string | number } | [site: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy29f13d6de247dddaa8ff2794fc1abb8e.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:138
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
const destroyd781ab1e442107df22ca9cbc2079cd0b = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroyd781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'delete',
})

destroyd781ab1e442107df22ca9cbc2079cd0b.definition = {
    methods: ['delete'],
    url: '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:138
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
destroyd781ab1e442107df22ca9cbc2079cd0b.url = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            scheme: args[0],
            physical_progress: args[1],
        }
    }

    const parsedArgs = {
        scheme: args.scheme,
        physical_progress: args.physical_progress,
    }

    return destroyd781ab1e442107df22ca9cbc2079cd0b.definition.url
            .replace('{scheme}', parsedArgs.scheme.toString())
            .replace('{physical_progress}', parsedArgs.physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:138
* @route '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}'
*/
destroyd781ab1e442107df22ca9cbc2079cd0b.delete = (args: { scheme: string | number, physical_progress: string | number } | [scheme: string | number, physical_progress: string | number ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroyd781ab1e442107df22ca9cbc2079cd0b.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/mhp/sites/{site}/physical-progresses/{physical_progress}': destroy29f13d6de247dddaa8ff2794fc1abb8e,
    '/irrigation/schemes/{scheme}/physical-progresses/{physical_progress}': destroyd781ab1e442107df22ca9cbc2079cd0b,
}

const ProjectPhysicalProgressController = { index, create, store, show, edit, update, destroy }

export default ProjectPhysicalProgressController