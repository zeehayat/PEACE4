import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\ProfilePhotoController::destroy
* @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/ProfilePhotoController.php:16
* @route '/user/profile-photo'
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
    url: '/user/profile-photo',
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\ProfilePhotoController::destroy
* @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/ProfilePhotoController.php:16
* @route '/user/profile-photo'
*/
destroy.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\ProfilePhotoController::destroy
* @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/ProfilePhotoController.php:16
* @route '/user/profile-photo'
*/
destroy.delete = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(options),
    method: 'delete',
})

const currentUserPhoto = {
    destroy,
}

export default currentUserPhoto