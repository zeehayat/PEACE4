<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vendor;
use App\Models\ProcurementRequisition;
use App\Models\ProcurementItem;
use App\Models\ProcurementQuotation;
use App\Models\ProcurementOrder;
use App\Models\ProcurementDelivery;
use App\Models\ProcurementPayment;
use App\Models\ProcurementCommitteeMember;
use App\Models\ProcurementCommitteeReview;
use App\Models\ProcurementFinalApproval;

class ProcurementSeeder extends Seeder
{
    public function run(): void
    {
        // Vendors
        $vendors = Vendor::factory()->count(5)->create();

        // Committee Members
        $committeeMembers = ProcurementCommitteeMember::factory()->count(3)->create();

        // Requisitions + items + quotations + orders
        ProcurementRequisition::factory()
            ->count(5)
            ->create()
            ->each(function ($requisition) use ($vendors, $committeeMembers) {
                ProcurementItem::factory()->count(3)->create([
                    'procurement_requisition_id' => $requisition->id,
                ]);

                $quotation = ProcurementQuotation::factory()->create([
                    'procurement_requisition_id' => $requisition->id,
                    'vendor_id' => $vendors->random()->id,
                ]);

                $order = ProcurementOrder::factory()->create([
                    'procurement_quotation_id' => $quotation->id,
                ]);

                ProcurementDelivery::factory()->create([
                    'procurement_order_id' => $order->id,
                ]);

                ProcurementPayment::factory()->create([
                    'procurement_order_id' => $order->id,
                ]);

                // Committee reviews
                foreach ($committeeMembers as $member) {
                    ProcurementCommitteeReview::factory()->create([
                        'procurement_order_id' => $order->id,
                        'committee_member_id' => $member->id,
                        'member_name' => $member->name,
                        'designation' => $member->designation,
                    ]);
                }

                // Final approval
                ProcurementFinalApproval::factory()->create([
                    'procurement_order_id' => $order->id,
                ]);
            });
    }
}
