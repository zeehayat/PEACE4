import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::monthlyProgress
* @see app/Http/Controllers/ReportController.php:18
* @route '/report/monthly-progress/{year}/{month}'
*/
export const monthlyProgress = (args: { year: string | number, month: string | number } | [year: string | number, month: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monthlyProgress.url(args, options),
    method: 'get',
})

monthlyProgress.definition = {
    methods: ["get","head"],
    url: '/report/monthly-progress/{year}/{month}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::monthlyProgress
* @see app/Http/Controllers/ReportController.php:18
* @route '/report/monthly-progress/{year}/{month}'
*/
monthlyProgress.url = (args: { year: string | number, month: string | number } | [year: string | number, month: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            year: args[0],
            month: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        year: args.year,
        month: args.month,
    }

    return monthlyProgress.definition.url
            .replace('{year}', parsedArgs.year.toString())
            .replace('{month}', parsedArgs.month.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::monthlyProgress
* @see app/Http/Controllers/ReportController.php:18
* @route '/report/monthly-progress/{year}/{month}'
*/
monthlyProgress.get = (args: { year: string | number, month: string | number } | [year: string | number, month: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monthlyProgress.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::monthlyProgress
* @see app/Http/Controllers/ReportController.php:18
* @route '/report/monthly-progress/{year}/{month}'
*/
monthlyProgress.head = (args: { year: string | number, month: string | number } | [year: string | number, month: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monthlyProgress.url(args, options),
    method: 'head',
})

const ReportController = { monthlyProgress }

export default ReportController