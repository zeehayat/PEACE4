import { queryParams, type QueryParams } from './../../../../../../wayfinder'
/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\UserProfileController::show
 * @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/UserProfileController.php:23
 * @route '/user/profile'
 */
export const show = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/user/profile',
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\UserProfileController::show
 * @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/UserProfileController.php:23
 * @route '/user/profile'
 */
show.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\UserProfileController::show
 * @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/UserProfileController.php:23
 * @route '/user/profile'
 */
show.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\UserProfileController::show
 * @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/UserProfileController.php:23
 * @route '/user/profile'
 */
show.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(options),
    method: 'head',
})
const UserProfileController = { show }

export default UserProfileController