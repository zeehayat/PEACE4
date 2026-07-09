// Shared status badge color helper used across Irrigation and MHP list/index views.
//
// Status strings come from two related but distinct domains:
//   - Irrigation scheme status: 'New', 'Active', 'Inactive'
//   - MHP site status: 'New', 'Rehabilitation', 'Upgradation', 'Completed'
//
// Both domains only ever need four visual buckets (success / warning-in-progress /
// danger / unknown default), so a single shared function handles the union of all
// known statuses rather than duplicating near-identical switch statements per domain.
export function useStatusBadge() {
    function getStatusClass(status) {
        switch (status) {
            case 'Active':
            case 'Completed':
                return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
            case 'New':
            case 'Rehabilitation':
            case 'Upgradation':
                return 'bg-amber-50 text-amber-700 border border-amber-200/60';
            case 'Inactive':
                return 'bg-rose-50 text-rose-700 border border-rose-200/60';
            default:
                return 'bg-ink-100 text-ink-600 border border-ink-200';
        }
    }

    return { getStatusClass };
}
