<script setup>
const props = defineProps({
    show: Boolean,
    site: Object,
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const formatKey = (key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const renderSection = (obj) => {
    if (!obj) return []
    return Object.entries(obj).map(([key, val]) => ({
        key: formatKey(key),
        value: val ?? '-'
    }))
}

const printReport = () => {
    const printable = document.getElementById('site-report').innerHTML
    const win = window.open('', '', 'width=800,height=600')
    win.document.write(`
    <html>
      <head>
        <title>MHP Site Report</title>
        <style>
          body { font-family: sans-serif; margin: 20px; }
          h1, h2 { color: #2c3e50; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          td { padding: 4px 8px; border: 1px solid #ddd; }
          .section-title { background: #f0f0f0; font-weight: bold; }
        </style>
      </head>
      <body>${printable}</body>
    </html>`)
    win.document.close()
    win.print()
}
</script>

<template>
    <transition name="fade">
        <div
            v-if="show"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div
                class="bg-white rounded-lg shadow-lg relative max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
                <button
                    @click="close"
                    class="absolute top-2 right-2 text-lg bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                >
                    ✖
                </button>

                <div id="site-report">
                    <h1 class="text-2xl font-bold text-center mb-4">
                        🌟 MHP Site Report
                    </h1>

                    <!-- General -->
                    <section class="mb-4">
                        <h2 class="text-lg font-semibold border-b pb-1 mb-2">
                            General Information
                        </h2>
                        <table class="text-sm">
                            <tbody>
                            <tr v-for="{key, value} in renderSection(site)" :key="key">
                                <td class="bg-gray-50 font-medium w-1/3">{{ key }}</td>
                                <td>{{ value }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <!-- CBO -->
                    <section v-if="site?.cbo" class="mb-4">
                        <h2 class="text-lg font-semibold border-b pb-1 mb-2">
                            CBO Information
                        </h2>
                        <table class="text-sm">
                            <tbody>
                            <tr v-for="{key, value} in renderSection(site.cbo)" :key="key">
                                <td class="bg-gray-50 font-medium w-1/3">{{ key }}</td>
                                <td>{{ value }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <!-- Admin Approval -->
                    <section v-if="site?.admin_approval" class="mb-4">
                        <h2 class="text-lg font-semibold border-b pb-1 mb-2">
                            Admin Approval
                        </h2>
                        <table class="text-sm">
                            <tbody>
                            <tr v-for="{key, value} in renderSection(site.admin_approval)" :key="key">
                                <td class="bg-gray-50 font-medium w-1/3">{{ key }}</td>
                                <td>{{ value }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </div>

                <div class="mt-4 text-right">
                    <button
                        @click="printReport"
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        🖨️ Print Report
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
