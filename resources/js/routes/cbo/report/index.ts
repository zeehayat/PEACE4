import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::exportMethod
 * @see app/Http/Controllers/ReportController.php:40
 * @route '/cbo/report/export'
 */
export const exportMethod = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ['get','head'],
    url: '/cbo/report/export',
}

/**
* @see \App\Http\Controllers\ReportController::exportMethod
 * @see app/Http/Controllers/ReportController.php:40
 * @route '/cbo/report/export'
 */
exportMethod.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportMethod
 * @see app/Http/Controllers/ReportController.php:40
 * @route '/cbo/report/export'
 */
exportMethod.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportMethod
 * @see app/Http/Controllers/ReportController.php:40
 * @route '/cbo/report/export'
 */
exportMethod.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: exportMethod.url(options),
    method: 'head',
})
const report = {
    export: exportMethod,
}

export default report