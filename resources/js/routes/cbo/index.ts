import { queryParams, type QueryParams } from './../../wayfinder'
import cbos from './cbos'
import dialogues from './dialogues'
import trainings from './trainings'
import exposureVisits from './exposure-visits'
import report from './report'
/**
* @see \App\Http\Controllers\ReportController::report
 * @see app/Http/Controllers/ReportController.php:12
 * @route '/cbo/report'
 */
export const report = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: report.url(options),
    method: 'get',
})

report.definition = {
    methods: ['get','head'],
    url: '/cbo/report',
}

/**
* @see \App\Http\Controllers\ReportController::report
 * @see app/Http/Controllers/ReportController.php:12
 * @route '/cbo/report'
 */
report.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::report
 * @see app/Http/Controllers/ReportController.php:12
 * @route '/cbo/report'
 */
report.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: report.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::report
 * @see app/Http/Controllers/ReportController.php:12
 * @route '/cbo/report'
 */
report.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: report.url(options),
    method: 'head',
})
const cbo = {
    cbos,
dialogues,
trainings,
exposureVisits,
report,
}

export default cbo