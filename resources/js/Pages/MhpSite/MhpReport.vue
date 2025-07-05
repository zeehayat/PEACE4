<script setup>
const props = defineProps({
    site: { type: Object, required: true }
})

function printSection(id) {
    const content = document.getElementById(id).innerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Print</title></head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}
</script>

<template>
    <div>
        <div id="mhp-approval-report" class="bg-white text-black p-4">
            <!-- Header -->
            <div class="flex items-center justify-between border-b pb-2 mb-4">
                <div>
                    <h1 class="text-2xl font-bold text-blue-700">MHP Site + Admin Approval Report</h1>
                    <p class="text-sm text-gray-600">Generated on: {{ new Date().toLocaleDateString() }}</p>
                </div>
                <div>
                    <img src="/your-logo.png" alt="Logo" class="h-12" />
                </div>
            </div>

            <!-- MHP Site Details -->
            <h2 class="text-lg font-semibold text-gray-700 mt-4 mb-2">🌟 MHP Site Details</h2>
            <table class="w-full text-sm border-collapse mb-4">
                <tbody>
                <tr><td class="font-semibold p-1 border">ID</td><td class="p-1 border">{{ site.id }}</td></tr>
                <tr><td class="font-semibold p-1 border">CBO</td><td class="p-1 border">{{ site.cbo?.reference_code }}</td></tr>
                <tr><td class="font-semibold p-1 border">Status</td><td class="p-1 border">{{ site.status }}</td></tr>
                <tr><td class="font-semibold p-1 border">Population</td><td class="p-1 border">{{ site.population ?? '-' }}</td></tr>
                <tr><td class="font-semibold p-1 border">Grid Status</td><td class="p-1 border">{{ site.grid_status }}</td></tr>
                <tr><td class="font-semibold p-1 border">Tentative Completion</td><td class="p-1 border">{{ site.tentative_completion_date ?? '-' }}</td></tr>
                <tr><td class="font-semibold p-1 border">Created At</td><td class="p-1 border">{{ site.created_at }}</td></tr>
                <tr><td class="font-semibold p-1 border">Updated At</td><td class="p-1 border">{{ site.updated_at }}</td></tr>
                </tbody>
            </table>

            <!-- Admin Approval -->
            <template v-if="site.admin_approval">
                <h2 class="text-lg font-semibold text-gray-700 mt-6 mb-2">📋 Admin Approval Details</h2>
                <table class="w-full text-sm border-collapse mb-4">
                    <tbody>
                    <tr><td class="font-semibold p-1 border">EU Approval Date</td><td class="p-1 border">{{ site.admin_approval.eu_approval_date ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Approved Cost</td><td class="p-1 border">{{ site.admin_approval.approved_cost ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Revised Cost 1</td><td class="p-1 border">{{ site.admin_approval.revised_cost_1 ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Revised Cost 2</td><td class="p-1 border">{{ site.admin_approval.revised_cost_2 ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Revised Cost 3</td><td class="p-1 border">{{ site.admin_approval.revised_cost_3 ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">HPP Inauguration Date</td><td class="p-1 border">{{ site.admin_approval.hpp_inauguration_date ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Technical Survey Date</td><td class="p-1 border">{{ site.admin_approval.technical_survey_date ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Design PSU Submission</td><td class="p-1 border">{{ site.admin_approval.date_design_psu_submission ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Head Office Review Submission</td><td class="p-1 border">{{ site.admin_approval.headoffice_review_submission_date ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Design Estimate Date</td><td class="p-1 border">{{ site.admin_approval.design_estimate_date ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">EU Approval Submission Date</td><td class="p-1 border">{{ site.admin_approval.eu_approval_submission_date ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">OPM Validation Date</td><td class="p-1 border">{{ site.admin_approval.opm_validation_date ?? '-' }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Created At</td><td class="p-1 border">{{ site.admin_approval.created_at }}</td></tr>
                    <tr><td class="font-semibold p-1 border">Updated At</td><td class="p-1 border">{{ site.admin_approval.updated_at }}</td></tr>
                    </tbody>
                </table>
            </template>
            <template v-else>
                <div class="text-red-600 text-center mt-4">⚠️ No Admin Approval exists for this site.</div>
            </template>

            <!-- Footer -->
            <div class="text-xs text-center text-gray-500 border-t pt-2 mt-4">
                © {{ new Date().getFullYear() }} Developed by Zeeshan for SRSP. All rights reserved.
            </div>
        </div>

        <div class="mt-4 text-right">
            <button
                @click="printSection('mhp-approval-report')"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                🖨️ Print Report
            </button>
        </div>
    </div>
</template>
