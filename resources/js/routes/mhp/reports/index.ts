import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import district from './district'
/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:18
* @route '/mhp/reports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mhp/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:18
* @route '/mhp/reports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:18
* @route '/mhp/reports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::index
* @see app/Http/Controllers/MhpReportController.php:18
* @route '/mhp/reports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:85
* @route '/mhp/reports/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:85
* @route '/mhp/reports/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:85
* @route '/mhp/reports/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:85
* @route '/mhp/reports/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::district
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
export const district = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: district.url(options),
    method: 'get',
})

district.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::district
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
district.url = (options?: RouteQueryOptions) => {
    return district.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::district
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
district.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: district.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::district
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
district.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: district.url(options),
    method: 'head',
})

const reports = {
    index,
    export: exportMethod,
    district,
}

export default reports