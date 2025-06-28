<template>
    <div class="max-w-md mx-auto mt-20">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="submit">
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium">Email</label>
                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full border rounded px-3 py-2"
                />
                <div v-if="form.errors.email" class="text-red-500 text-sm">{{ form.errors.email }}</div>
            </div>

            <div class="mb-4">
                <label for="password" class="block text-sm font-medium">Password</label>
                <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full border rounded px-3 py-2"
                />
                <div v-if="form.errors.password" class="text-red-500 text-sm">{{ form.errors.password }}</div>
            </div>

            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Login
            </button>
        </form>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'

const form = useForm({
  email: '',
  password: '',
})

const submit = () => {
  form.post('/login')
}
</script>
