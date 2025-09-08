import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AttachmentController::store
* @see app/Http/Controllers/AttachmentController.php:23
* @route '/attachments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/attachments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AttachmentController::store
* @see app/Http/Controllers/AttachmentController.php:23
* @route '/attachments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttachmentController::store
* @see app/Http/Controllers/AttachmentController.php:23
* @route '/attachments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AttachmentController::show
* @see app/Http/Controllers/AttachmentController.php:41
* @route '/attachments/{attachment}'
*/
export const show = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/attachments/{attachment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AttachmentController::show
* @see app/Http/Controllers/AttachmentController.php:41
* @route '/attachments/{attachment}'
*/
show.url = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attachment: args }
    }

    if (Array.isArray(args)) {
        args = {
            attachment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attachment: args.attachment,
    }

    return show.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttachmentController::show
* @see app/Http/Controllers/AttachmentController.php:41
* @route '/attachments/{attachment}'
*/
show.get = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AttachmentController::show
* @see app/Http/Controllers/AttachmentController.php:41
* @route '/attachments/{attachment}'
*/
show.head = (args: { attachment: string | number } | [attachment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AttachmentController::destroy
* @see app/Http/Controllers/AttachmentController.php:35
* @route '/attachments/{attachment}'
*/
export const destroy = (args: { attachment: string | number | { id: string | number } } | [attachment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/attachments/{attachment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AttachmentController::destroy
* @see app/Http/Controllers/AttachmentController.php:35
* @route '/attachments/{attachment}'
*/
destroy.url = (args: { attachment: string | number | { id: string | number } } | [attachment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attachment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attachment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            attachment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attachment: typeof args.attachment === 'object'
        ? args.attachment.id
        : args.attachment,
    }

    return destroy.definition.url
            .replace('{attachment}', parsedArgs.attachment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AttachmentController::destroy
* @see app/Http/Controllers/AttachmentController.php:35
* @route '/attachments/{attachment}'
*/
destroy.delete = (args: { attachment: string | number | { id: string | number } } | [attachment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const AttachmentController = { store, show, destroy }

export default AttachmentController