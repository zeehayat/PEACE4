import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import cbos from './cbos'
import dialogues from './dialogues'
import trainings from './trainings'
import exposureVisits from './exposure-visits'
import report from './report'
import reports from './reports'
import sites from './sites'
/**
* @see \App\Http\Controllers\ReportController::report
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
export const report = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

report.definition = {
    methods: ["get","head"],
    url: '/cbo/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::report
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
report.url = (options?: RouteQueryOptions) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::report
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
report.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::report
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
report.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report.url(options),
    method: 'head',
})

const cbo = {
    cbos,
    dialogues,
    trainings,
    exposureVisits,
    report,
    reports,
    sites,
}

export default cbo