import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:20
* @route '/mhp/project-physical-progress'
*/
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/mhp/project-physical-progress',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:20
* @route '/mhp/project-physical-progress'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:20
* @route '/mhp/project-physical-progress'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::index
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:20
* @route '/mhp/project-physical-progress'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:30
* @route '/mhp/project-physical-progress'
*/
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/mhp/project-physical-progress',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:30
* @route '/mhp/project-physical-progress'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::store
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:30
* @route '/mhp/project-physical-progress'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:133
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
export const show = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/mhp/project-physical-progress/{project_physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:133
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
show.url = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            project_physical_progress: args[0],
        }
    }

    const parsedArgs = {
        project_physical_progress: args.project_physical_progress,
    }

    return show.definition.url
            .replace('{project_physical_progress}', parsedArgs.project_physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:133
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
show.get = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::show
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:133
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
show.head = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:76
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
export const update = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/mhp/project-physical-progress/{project_physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:76
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
update.url = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            project_physical_progress: args[0],
        }
    }

    const parsedArgs = {
        project_physical_progress: args.project_physical_progress,
    }

    return update.definition.url
            .replace('{project_physical_progress}', parsedArgs.project_physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:76
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
update.put = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::update
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:76
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
update.patch = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:122
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
export const destroy = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/mhp/project-physical-progress/{project_physical_progress}',
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:122
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
destroy.url = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_physical_progress: args }
    }

    if (Array.isArray(args)) {
        args = {
            project_physical_progress: args[0],
        }
    }

    const parsedArgs = {
        project_physical_progress: args.project_physical_progress,
    }

    return destroy.definition.url
            .replace('{project_physical_progress}', parsedArgs.project_physical_progress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPhysicalProgressController::destroy
* @see app/Http/Controllers/ProjectPhysicalProgressController.php:122
* @route '/mhp/project-physical-progress/{project_physical_progress}'
*/
destroy.delete = (args: { project_physical_progress: string | number } | [project_physical_progress: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ProjectPhysicalProgressController = { index, store, show, update, destroy }

export default ProjectPhysicalProgressController