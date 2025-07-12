import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
export const cboReport = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: cboReport.url(options),
    method: 'get',
})

cboReport.definition = {
    methods: ['get','head'],
    url: '/cbo/report',
}

/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
cboReport.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return cboReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
cboReport.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: cboReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::cboReport
* @see app/Http/Controllers/ReportController.php:12
* @route '/cbo/report'
*/
cboReport.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: cboReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
export const exportCboReport = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: exportCboReport.url(options),
    method: 'get',
})

exportCboReport.definition = {
    methods: ['get','head'],
    url: '/cbo/report/export',
}

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
exportCboReport.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return exportCboReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
exportCboReport.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: exportCboReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportCboReport
* @see app/Http/Controllers/ReportController.php:40
* @route '/cbo/report/export'
*/
exportCboReport.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: exportCboReport.url(options),
    method: 'head',
})

const ReportController = { cboReport, exportCboReport }

export default ReportController