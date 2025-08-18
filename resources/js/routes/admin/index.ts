import { queryParams, type QueryParams } from './../../wayfinder'
import users from './users'
import roles from './roles'
/**
 * @see routes/admin_routes.php:19
 * @route '/admin'
 */
export const dashboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ['get','head'],
    url: '/admin',
}

/**
 * @see routes/admin_routes.php:19
 * @route '/admin'
 */
dashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/admin_routes.php:19
 * @route '/admin'
 */
dashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/admin_routes.php:19
 * @route '/admin'
 */
dashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: dashboard.url(options),
    method: 'head',
})
const admin = {
    users,
dashboard,
roles,
}

export default admin