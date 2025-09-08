import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
export const cboReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cboReport.url(options),
    method: 'get',
})

cboReport.definition = {
    methods: ["get","head"],
    url: '/cbo/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
cboReport.url = (options?: RouteQueryOptions) => {
    return cboReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
cboReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cboReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
cboReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cboReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
export const exportCboReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCboReport.url(options),
    method: 'get',
})

exportCboReport.definition = {
    methods: ["get","head"],
    url: '/cbo/report/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
exportCboReport.url = (options?: RouteQueryOptions) => {
    return exportCboReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
exportCboReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCboReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
exportCboReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCboReport.url(options),
    method: 'head',
})

const ReportController = { cboReport, exportCboReport }

export default ReportController