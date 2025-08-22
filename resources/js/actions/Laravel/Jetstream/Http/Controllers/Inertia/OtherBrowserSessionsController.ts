import { queryParams, type QueryParams } from './../../../../../../wayfinder'
/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\OtherBrowserSessionsController::destroy
* @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/OtherBrowserSessionsController.php:21
* @route '/user/other-browser-sessions'
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
    url: '/user/other-browser-sessions',
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\OtherBrowserSessionsController::destroy
* @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/OtherBrowserSessionsController.php:21
* @route '/user/other-browser-sessions'
*/
destroy.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \Laravel\Jetstream\Http\Controllers\Inertia\OtherBrowserSessionsController::destroy
* @see vendor/laravel/jetstream/src/Http/Controllers/Inertia/OtherBrowserSessionsController.php:21
* @route '/user/other-browser-sessions'
*/
destroy.delete = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(options),
    method: 'delete',
})

const OtherBrowserSessionsController = { destroy }

export default OtherBrowserSessionsController