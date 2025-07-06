<script setup>
// The original script setup is kept as is, per your request.
// It will receive data from the backend via props.
import {computed} from "vue";

const props = defineProps({
    // A prop to control visibility in a non-printable context is no longer needed
    // for this specific component, but kept for compatibility.
    show: Boolean,
    approval: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const statuses = {
    eu_approval_date: 'EU Approval Date',
    approved_cost: 'Approved Cost',
    revised_cost_1: 'Revised Cost 1',
    revised_cost_2: 'Revised Cost 2',
    revised_cost_3: 'Revised Cost 3',
    hpp_inauguration_date: 'HPP Inauguration Date',
    technical_survey_date: 'Technical Survey Date',
    date_design_psu_submission: 'Design Submitted to PSU',
    headoffice_review_submission_date: 'Submission to Head Office',
    design_estimate_date: 'Design Estimate Date',
    eu_approval_submission_date: 'Submission to EU for Approval',
    opm_validation_date: 'OPM Validation Date'
}

const formatDate = (val) => {
    if (!val) return '-'
    // A more robust date formatting for a professional report
    try {
        const date = new Date(val);
        if (isNaN(date.getTime())) return val; // Return original if invalid
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return val;
    }
}

const formatCurrency = (val) => {
    if (val === null || val === undefined) return '-';
    // Prepends "PKR" to the localized number string for Pakistani Rupees.
    return `PKR ${Number(val).toLocaleString()}`;
}
const projectId = computed(() => {
    if (!approval?.mhp_site_id || !approval?.cbo_id) return 'N/A';
    return `${approval.cbo_id}/${approval.mhp_site_id}`;
});
const printReport = () => {
    window.print();
}
console.log(props.approval);
</script>

<template>

    <div v-if="show" class="report-background">
        <div class="A4-page">
            <header class="report-header">
                <h1 class="report-title">Administrative Approval Report</h1>

                <p class="report-subtitle">
                    Project ID:
                    <span v-if="approval.project_id">{{ approval.project_id }}</span>
                    <span v-else-if="approval.cbo?.reference_code && approval.mhp_site_id">
            {{ approval.cbo.reference_code }}/{{ approval.mhp_site_id }}
        </span>
                    <span v-else>N/A</span>
                </p>
            </header>

            <main>
                <section class="report-section">
                    <h2 class="section-title">Approval Details</h2>
                    <div class="details-grid">
                        <template v-for="(label, field) in statuses" :key="field">
                            <div class="detail-item">
                                <label class="detail-label">{{ label }}</label>
                                <div class="detail-value">
                                    <span v-if="field.includes('cost')">{{ formatCurrency(approval[field]) }}</span>
                                    <span v-else-if="field.includes('date')">{{ formatDate(approval[field]) }}</span>
                                    <span v-else>{{ approval[field] ?? '-' }}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </section>

                <section class="report-section">
                    <h2 class="section-title">Attachments</h2>
                    <div v-if="approval.media?.length" class="attachments-list">
                        <ul>
                            <li v-for="file in approval.media" :key="file.id">
                                <a :href="file.original_url" target="_blank">{{ file.file_name }}</a>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="empty-state">
                        No attachments found.
                    </div>
                </section>
            </main>

            <footer class="report-footer">
                <p>Generated on: {{ new Date().toLocaleDateString() }}</p>
                <p>Page 1 of 1</p>
            </footer>
        </div>

        <div class="report-actions">
            <button @click="printReport" class="action-button primary">Print / Save as PDF</button>
            <button @click="emit('close')" class="action-button secondary">Close Preview</button>
        </div>
    </div>
</template>

<style scoped>
/* Scoped styles for the report component */

/* Main background for the preview mode */
.report-background {
    position: fixed;
    inset: 0;
    background-color: #f0f2f5; /* Light gray background */
    z-index: 50;
    overflow-y: auto;
    padding: 2rem;
}

/* Simulates a sheet of A4 paper */
.A4-page {
    background: white;
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 1.5cm 2cm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    font-family: 'Times New Roman', Times, serif; /* Classic report font */
    color: #333;
}

/* Report Header */
.report-header {
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
}
.report-title {
    font-size: 24pt;
    font-weight: bold;
}
.report-subtitle {
    font-size: 12pt;
    color: #555;
}

/* Section Styling */
.report-section {
    margin-bottom: 1.5rem;
    page-break-inside: avoid;
}
.section-title {
    font-size: 18pt;
    margin-top: 1rem;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.25rem;
    margin-bottom: 1rem;
}

/* Key-Value Grid for Details */
.details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem 2rem;
    font-size: 11pt;
}
.detail-item {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5rem;
    border-bottom: 1px dotted #e0e0e0;
}
.detail-label {
    font-weight: bold;
    color: #444;
    margin-bottom: 0.25rem;
}
.detail-value {
    color: #222;
}

/* Attachments List */
.attachments-list ul {
    list-style-type: disc;
    padding-left: 20px;
    font-size: 11pt;
}
.attachments-list li {
    margin-bottom: 0.5rem;
}
.attachments-list a {
    color: #333;
    text-decoration: none;
}
.empty-state {
    color: #777;
    font-style: italic;
    font-size: 11pt;
}

/* Report Footer */
.report-footer {
    margin-top: auto; /* Pushes footer to the bottom */
    border-top: 2px solid #333;
    padding-top: 0.5rem;
    font-size: 9pt;
    color: #666;
    display: flex;
    justify-content: space-between;
}

/* Action Buttons (for screen only) */
.report-actions {
    text-align: center;
    margin-top: 1.5rem;
}
.action-button {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    margin: 0 0.5rem;
    transition: background-color 0.2s;
}
.action-button.primary {
    background-color: #007bff;
    color: white;
}
.action-button.primary:hover {
    background-color: #0056b3;
}
.action-button.secondary {
    background-color: #6c757d;
    color: white;
}
.action-button.secondary:hover {
    background-color: #5a6268;
}

/* --- PRINT STYLES --- */
@media print {
    /* Hide non-printable elements */
    .report-background {
        position: static;
        padding: 0;
        background-color: white;
    }
    .report-actions {
        display: none;
    }

    /* Reset page styles for printing */
    .A4-page {
        width: 100%;
        min-height: 0;
        margin: 0;
        padding: 0;
        box-shadow: none;
        color: black;
    }

    /* Ensure links are just text */
    .attachments-list a {
        color: black;
        text-decoration: none;
    }

    /* Prevent page breaks inside items */
    .report-section, .detail-item {
        page-break-inside: avoid;
    }
}
</style>
```
