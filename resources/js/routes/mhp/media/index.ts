import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see routes/mhp_routes.php:95
* @route '/mhp/media/{media}'
*/
export const destroy = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/media/{media}',
}

/**
* @see routes/mhp_routes.php:95
* @route '/mhp/media/{media}'
*/
destroy.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { media: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            media: args[0],
        }
    }

    const parsedArgs = {
        media: typeof args.media === 'object'
        ? args.media.id
        : args.media,
    }

    return destroy.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/mhp_routes.php:95
* @route '/mhp/media/{media}'
*/
destroy.delete = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const media = {
    destroy,
}

export default media