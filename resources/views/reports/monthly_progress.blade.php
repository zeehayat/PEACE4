<!DOCTYPE html>
<html>
<head>
    <title>Monthly Progress Report</title>
    <style>
        body { font-family: sans-serif; }
        h1, h2, h3, h4 { font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 8px; }
        th { background-color: #f2f2f2; }
        .section-title { background-color: #e0e0e0; font-weight: bold; padding: 10px; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Monthly Progress Report</h1>
    <p><strong>Month:</strong> {{ $month }} | <strong>Year:</strong> {{ $year }}</p>

    <div class="section-title">Output 1.1: Community-based micro and mini hydropower plants...</div>

    <h4>1. Participatory workshops/dialogues/broad-based meetings and exposure visits...</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>District</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Beneficiaries</th>
            </tr>
        </thead>
        <tbody>
            @forelse($mhp_participatory_workshops['dialogues'] as $index => $dialogue)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $dialogue->cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>{{ $dialogue->participants }}</td>
            </tr>
            @empty
            <tr><td colspan="5">No dialogues this month.</td></tr>
            @endforelse
            @forelse($mhp_participatory_workshops['exposure_visits'] as $index => $visit)
            <tr>
                <td>{{ count($mhp_participatory_workshops['dialogues']) + $index + 1 }}</td>
                <td>{{ $visit->cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>{{ $visit->participants }}</td>
            </tr>
            @empty
            <tr><td colspan="5">No exposure visits this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>2. CBO Formation</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>District</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Total members</th>
            </tr>
        </thead>
        <tbody>
            @forelse($mhp_cbos as $index => $cbo)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>{{ $cbo->total_members }}</td>
            </tr>
            @empty
            <tr><td colspan="5">No MHP CBOs formed this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>3. Conduct detailed technical surveys of the MHP schemes</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>Districts</th>
                <th>Activities</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Variance</th>
            </tr>
        </thead>
        <tbody>
            @forelse($mhp_technical_surveys as $index => $survey)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $survey->cbo->district }}</td>
                <td>No. of Detail Surveys</td>
                <td>N/A</td>
                <td>1</td>
                <td>N/A</td>
            </tr>
            @empty
            <tr><td colspan="6">No technical surveys this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>4. Design improvement and endorsement from EU</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>Districts</th>
                <th>Activities</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Variance</th>
            </tr>
        </thead>
        <tbody>
            @forelse($mhp_design_improvements as $index => $improvement)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $improvement->cbo->district }}</td>
                <td>Reviewed by OPM</td>
                <td>N/A</td>
                <td>1</td>
                <td>N/A</td>
            </tr>
            @empty
            <tr><td colspan="6">No design improvements this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>5. Construction/rehabilitation of community-based HPPs</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>District</th>
                <th>MHPs</th>
                <th>Status</th>
                <th>Civil Progress in %</th>
                <th>T&D Progress in %</th>
                <th>EME Progress in %</th>
                <th>Remarks</th>
            </tr>
        </thead>
        <tbody>
            @forelse($mhp_construction_progress as $index => $progress)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $progress->projectable->cbo->district }}</td>
                <td>{{ $progress->projectable->name }}</td>
                <td>{{ $progress->projectable->status }}</td>
                <td>{{ $progress->progress_percentage }}</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>{{ $progress->remarks }}</td>
            </tr>
            @empty
            <tr><td colspan="8">No construction progress this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>6. MHP Completion</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>District</th>
                <th>MHPs Site</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Beneficiaries</th>
                <th>Total Cost</th>
            </tr>
        </thead>
        <tbody>
            @forelse($mhp_completions as $index => $completion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $completion->mhpSite->cbo->district }}</td>
                <td>{{ $completion->mhpSite->name }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>{{ $completion->mhpSite->population }}</td>
                <td>{{ $completion->mhpSite->estimated_cost }}</td>
            </tr>
            @empty
            <tr><td colspan="7">No MHP completions this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <div class="section-title">Output 1.2: Community-based irrigations systems...</div>

    <h4>1. Participatory workshops/dialogues/broad-based meetings and exposure visits...</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>District</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Beneficiaries</th>
            </tr>
        </thead>
        <tbody>
            @forelse($irrigation_participatory_workshops['dialogues'] as $index => $dialogue)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $dialogue->cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>{{ $dialogue->participants }}</td>
            </tr>
            @empty
            <tr><td colspan="5">No dialogues this month.</td></tr>
            @endforelse
            @forelse($irrigation_participatory_workshops['exposure_visits'] as $index => $visit)
            <tr>
                <td>{{ count($irrigation_participatory_workshops['dialogues']) + $index + 1 }}</td>
                <td>{{ $visit->cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>{{ $visit->participants }}</td>
            </tr>
            @empty
            <tr><td colspan="5">No exposure visits this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>2. CBO Formation</h4>
    <table>
        <thead>
            <tr>
                <th>S. No</th>
                <th>District</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Total members</th>
            </tr>
        </thead>
        <tbody>
            @forelse($irrigation_cbos as $index => $cbo)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>{{ $cbo->total_members }}</td>
            </tr>
            @empty
            <tr><td colspan="5">No Irrigation CBOs formed this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>3. Social and technical feasibility survey of the scheme</h4>
    <table>
        <thead>
            <tr>
                <th>Sr. No</th>
                <th>District</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Variance</th>
            </tr>
        </thead>
        <tbody>
            @forelse($irrigation_feasibility_surveys as $index => $survey)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $survey->irrigationScheme->cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>N/A</td>
            </tr>
            @empty
            <tr><td colspan="5">No feasibility surveys this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>4. 100 Prepare scheme digests and cost estimates</h4>
    <table>
        <thead>
            <tr>
                <th>Sr. No</th>
                <th>District</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Variance</th>
            </tr>
        </thead>
        <tbody>
            @forelse($irrigation_scheme_digests as $index => $digest)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $digest->cbo->district }}</td>
                <td>N/A</td>
                <td>1</td>
                <td>N/A</td>
            </tr>
            @empty
            <tr><td colspan="5">No scheme digests this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>5. Construction/rehabilitation of community-based irrigations systems</h4>
    <table>
        <thead>
            <tr>
                <th>Sr. No</th>
                <th>District</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Variance</th>
            </tr>
        </thead>
        <tbody>
            @forelse($irrigation_construction_progress as $index => $progress)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $progress->projectable->cbo->district }}</td>
                <td>N/A</td>
                <td>{{ $progress->progress_percentage }}%</td>
                <td>N/A</td>
            </tr>
            @empty
            <tr><td colspan="5">No construction progress this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>6. Irrigation Scheme Completion</h4>
    <table>
        <thead>
            <tr>
                <th>Sr. No</th>
                <th>District</th>
                <th>No. of scheme completed</th>
                <th>Beneficiaries</th>
                <th>Community share</th>
                <th>Project Share</th>
                <th>Total Cost</th>
            </tr>
        </thead>
        <tbody>
            @forelse($irrigation_completions as $index => $completion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $completion->irrigationScheme->cbo->district }}</td>
                <td>1</td>
                <td>{{ $completion->number_of_beneficiary_farmers }}</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
            </tr>
            @empty
            <tr><td colspan="7">No irrigation completions this month.</td></tr>
            @endforelse
        </tbody>
    </table>

    <h4>7. Handing and taking</h4>
    <table>
        <thead>
            <tr>
                <th>Sr. No</th>
                <th>District</th>
                <th>Village</th>
                <th>CBO Name</th>
                <th>Scheme</th>
                <th>Date of Handing over</th>
                <th>Completion Certificate (Yes/No)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($irrigation_handing_over as $index => $handover)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $handover->irrigationScheme->cbo->district }}</td>
                <td>{{ $handover->irrigationScheme->cbo->village }}</td>
                <td>{{ $handover->irrigationScheme->cbo->cbo_name }}</td>
                <td>{{ $handover->irrigationScheme->scheme_type }}</td>
                <td>{{ $handover->handing_over_to_community_date }}</td>
                <td>Yes</td>
            </tr>
            @empty
            <tr><td colspan="7">No handing over this month.</td></tr>
            @endforelse
        </tbody>
    </table>

</body>
</html>