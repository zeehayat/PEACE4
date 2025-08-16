import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RoleController::index
* @see [unknown]:0
* @route '/admin/roles'
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
    url: '/admin/roles',
}

/**
* @see \App\Http\Controllers\RoleController::index
* @see [unknown]:0
* @route '/admin/roles'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::index
* @see [unknown]:0
* @route '/admin/roles'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::index
* @see [unknown]:0
* @route '/admin/roles'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RoleController::create
* @see [unknown]:0
* @route '/admin/roles/create'
*/
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/admin/roles/create',
}

/**
* @see \App\Http\Controllers\RoleController::create
* @see [unknown]:0
* @route '/admin/roles/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::create
* @see [unknown]:0
* @route '/admin/roles/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::create
* @see [unknown]:0
* @route '/admin/roles/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RoleController::store
* @see [unknown]:0
* @route '/admin/roles'
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
    url: '/admin/roles',
}

/**
* @see \App\Http\Controllers\RoleController::store
* @see [unknown]:0
* @route '/admin/roles'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::store
* @see [unknown]:0
* @route '/admin/roles'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RoleController::edit
* @see [unknown]:0
* @route '/admin/roles/{role}/edit'
*/
export const edit = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/admin/roles/{role}/edit',
}

/**
* @see \App\Http\Controllers\RoleController::edit
* @see [unknown]:0
* @route '/admin/roles/{role}/edit'
*/
edit.url = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: args.role,
    }

    return edit.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::edit
* @see [unknown]:0
* @route '/admin/roles/{role}/edit'
*/
edit.get = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::edit
* @see [unknown]:0
* @route '/admin/roles/{role}/edit'
*/
edit.head = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RoleController::update
* @see [unknown]:0
* @route '/admin/roles/{role}'
*/
export const update = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '/admin/roles/{role}',
}

/**
* @see \App\Http\Controllers\RoleController::update
* @see [unknown]:0
* @route '/admin/roles/{role}'
*/
update.url = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: args.role,
    }

    return update.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::update
* @see [unknown]:0
* @route '/admin/roles/{role}'
*/
update.put = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RoleController::update
* @see [unknown]:0
* @route '/admin/roles/{role}'
*/
update.patch = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RoleController::destroy
* @see [unknown]:0
* @route '/admin/roles/{role}'
*/
export const destroy = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/admin/roles/{role}',
}

/**
* @see \App\Http\Controllers\RoleController::destroy
* @see [unknown]:0
* @route '/admin/roles/{role}'
*/
destroy.url = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: args.role,
    }

    return destroy.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::destroy
* @see [unknown]:0
* @route '/admin/roles/{role}'
*/
destroy.delete = (args: { role: string | number } | [role: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const roles = {
    index,
    create,
    store,
    edit,
    update,
    destroy,
}

export default roles