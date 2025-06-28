<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    @routes
    {{-- The @vite directive should ideally be inside @inertiaHead for better performance, but this works too --}}
    @vite('resources/js/app.js')
    @inertiaHead
</head>
<body class="font-sans antialiased bg-gradient-to-br from-purple-100 via-blue-50 to-teal-100 text-gray-800">

{{-- Let @inertia create the root element. We wrap it in our layout structure. --}}
<div class="flex flex-col md:flex-row min-h-screen">
    <div class="md:hidden bg-white border-b border-blue-200 p-4 flex justify-between items-center">
        <h2 class="text-lg font-bold text-blue-800">Navigation</h2>
        <button id="menu-toggle" class="text-blue-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>

    <aside id="sidebar" class="w-full md:w-64 bg-white shadow-md border-b md:border-b-0 md:border-r border-blue-200 p-4 hidden md:block">
        <nav class="flex flex-col space-y-2">
            <a href="/dashboard" class="text-blue-600 hover:text-teal-700">Dashboard</a>
            <a href="/modules" class="text-blue-600 hover:text-teal-700">Modules</a>
            <a href="/procurement" class="text-blue-600 hover:text-teal-700">Procurement</a>
            <a href="/cbo" class="text-blue-600 hover:text-teal-700">CBO</a>
            <a href="/mhp" class="text-blue-600 hover:text-teal-700">MHP</a>
            <a href="/irrigation" class="text-blue-600 hover:text-teal-700">Irrigation</a>
            <a href="/settings" class="text-blue-600 hover:text-teal-700">Settings</a>
        </nav>
    </aside>

    <div class="flex-1 flex flex-col">
        @if (session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 m-4 rounded">
                {{ session('success') }}
            </div>
        @endif

        @if (session('error'))
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
                {{ session('error') }}
            </div>
        @endif

        <main class="flex-1 p-4">
            {{-- This will now correctly render <div id="app" data-page="..."></div> --}}
            @inertia
        </main>
    </div>
</div>

<script>
    // This script should be fine, but ensure it runs after the DOM is loaded.
    // It's generally better to handle such logic within your Vue components.
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', function () {
                const sidebar = document.getElementById('sidebar');
                sidebar.classList.toggle('hidden');
            });
        }
    });
</script>

</body>
</html>
