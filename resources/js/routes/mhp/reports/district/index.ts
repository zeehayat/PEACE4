import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
import instructions from './instructions'
/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportMethod
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::instructions
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
export const instructions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: instructions.url(options),
    method: 'get',
})

instructions.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district/instructions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::instructions
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
instructions.url = (options?: RouteQueryOptions) => {
    return instructions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::instructions
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
instructions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: instructions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::instructions
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
instructions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: instructions.url(options),
    method: 'head',
})

const district = {
    export: exportMethod,
    instructions,
}

export default district