import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\MhpReportController::districtReport
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
export const districtReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districtReport.url(options),
    method: 'get',
})

districtReport.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::districtReport
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
districtReport.url = (options?: RouteQueryOptions) => {
    return districtReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::districtReport
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
districtReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: districtReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::districtReport
* @see app/Http/Controllers/MhpReportController.php:96
* @route '/mhp/reports/district'
*/
districtReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: districtReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportDistrictReport
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
export const exportDistrictReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportDistrictReport.url(options),
    method: 'get',
})

exportDistrictReport.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportDistrictReport
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
exportDistrictReport.url = (options?: RouteQueryOptions) => {
    return exportDistrictReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportDistrictReport
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
exportDistrictReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportDistrictReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportDistrictReport
* @see app/Http/Controllers/MhpReportController.php:115
* @route '/mhp/reports/district/export'
*/
exportDistrictReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportDistrictReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::instructionReport
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
export const instructionReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: instructionReport.url(options),
    method: 'get',
})

instructionReport.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district/instructions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::instructionReport
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
instructionReport.url = (options?: RouteQueryOptions) => {
    return instructionReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::instructionReport
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
instructionReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: instructionReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::instructionReport
* @see app/Http/Controllers/MhpReportController.php:169
* @route '/mhp/reports/district/instructions'
*/
instructionReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: instructionReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportInstructionReport
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
export const exportInstructionReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportInstructionReport.url(options),
    method: 'get',
})

exportInstructionReport.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/district/instructions/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportInstructionReport
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
exportInstructionReport.url = (options?: RouteQueryOptions) => {
    return exportInstructionReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportInstructionReport
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
exportInstructionReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportInstructionReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportInstructionReport
* @see app/Http/Controllers/MhpReportController.php:187
* @route '/mhp/reports/district/instructions/export'
*/
exportInstructionReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportInstructionReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::detailedReport
* @see app/Http/Controllers/MhpReportController.php:556
* @route '/mhp/reports/detailed'
*/
export const detailedReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailedReport.url(options),
    method: 'get',
})

detailedReport.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/detailed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::detailedReport
* @see app/Http/Controllers/MhpReportController.php:556
* @route '/mhp/reports/detailed'
*/
detailedReport.url = (options?: RouteQueryOptions) => {
    return detailedReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::detailedReport
* @see app/Http/Controllers/MhpReportController.php:556
* @route '/mhp/reports/detailed'
*/
detailedReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailedReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::detailedReport
* @see app/Http/Controllers/MhpReportController.php:556
* @route '/mhp/reports/detailed'
*/
detailedReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detailedReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportDetailedReport
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
export const exportDetailedReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportDetailedReport.url(options),
    method: 'get',
})

exportDetailedReport.definition = {
    methods: ["get","head"],
    url: '/mhp/reports/detailed/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MhpReportController::exportDetailedReport
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
exportDetailedReport.url = (options?: RouteQueryOptions) => {
    return exportDetailedReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MhpReportController::exportDetailedReport
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
exportDetailedReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportDetailedReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MhpReportController::exportDetailedReport
* @see app/Http/Controllers/MhpReportController.php:579
* @route '/mhp/reports/detailed/export'
*/
exportDetailedReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportDetailedReport.url(options),
    method: 'head',
})

const MhpReportController = { index, exportMethod, districtReport, exportDistrictReport, instructionReport, exportInstructionReport, detailedReport, exportDetailedReport, export: exportMethod }

export default MhpReportController