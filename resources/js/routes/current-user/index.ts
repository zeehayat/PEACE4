import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\CurrentUserController::destroy
 * @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/CurrentUserController.php:22
 * @route '/user'
 */
export const destroy = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/user',
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\CurrentUserController::destroy
 * @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/CurrentUserController.php:22
 * @route '/user'
 */
destroy.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\CurrentUserController::destroy
 * @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/CurrentUserController.php:22
 * @route '/user'
 */
destroy.delete = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(options),
    method: 'delete',
})
const currentUser = {
    destroy,
}

export default currentUser