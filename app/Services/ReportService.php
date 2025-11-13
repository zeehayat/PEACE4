<?php

namespace App\Services;

use App\Models\Cbo;
use App\Models\CboDialogue;
use App\Models\CboExposureVisit;
use App\Models\CboTraining;
use App\Models\MhpSite;
use App\Models\IrrigationScheme;
use App\Models\ProjectPhysicalProgress;
use App\Models\MhpCompletion;
use App\Models\IrrigationCompletion;
use App\Models\IrrigationSchemeProfile;

class ReportService
{
    public function getMonthlyProgressData($year, $month)
    {
        // TODO: Implement data fetching logic
        return [
            'mhp_participatory_workshops' => $this->getMhpParticipatoryWorkshops($year, $month),
            'mhp_cbos' => $this->getMhpCbos($year, $month),
            'mhp_women_sessions' => $this->getMhpWomenSessions($year, $month),
            'mhp_technical_surveys' => $this->getMhpTechnicalSurveys($year, $month),
            'mhp_design_improvements' => $this->getMhpDesignImprovements($year, $month),
            'mhp_procurement' => $this->getMhpProcurement($year, $month),
            'mhp_construction_progress' => $this->getMhpConstructionProgress($year, $month),
            'mhp_completions' => $this->getMhpCompletions($year, $month),
            'mhp_testing' => $this->getMhpTesting($year, $month),
            'irrigation_participatory_workshops' => $this->getIrrigationParticipatoryWorkshops($year, $month),
            'irrigation_cbos' => $this->getIrrigationCbos($year, $month),
            'irrigation_feasibility_surveys' => $this->getIrrigationFeasibilitySurveys($year, $month),
            'irrigation_scheme_digests' => $this->getIrrigationSchemeDigests($year, $month),
            'irrigation_construction_progress' => $this->getIrrigationConstructionProgress($year, $month),
            'irrigation_completions' => $this->getIrrigationCompletions($year, $month),
            'irrigation_handing_over' => $this->getIrrigationHandingOver($year, $month),
        ];
    }

    // MHP Data
    private function getMhpParticipatoryWorkshops($year, $month)
    {
        $mhpCboIds = MhpSite::pluck('cbo_id')->unique();
        $dialogues = CboDialogue::whereIn('cbo_id', $mhpCboIds)->whereYear('date_of_dialogue', $year)->whereMonth('date_of_dialogue', $month)->with('cbo')->get();
        $exposureVisits = CboExposureVisit::whereIn('cbo_id', $mhpCboIds)->whereYear('date_of_visit', $year)->whereMonth('date_of_visit', $month)->with('cbo')->get();
        return ['dialogues' => $dialogues, 'exposure_visits' => $exposureVisits];
    }

    private function getMhpCbos($year, $month)
    {
        $mhpCboIds = MhpSite::pluck('cbo_id')->unique();
        return Cbo::whereIn('id', $mhpCboIds)->whereYear('date_of_formation', $year)->whereMonth('date_of_formation', $month)->get();
    }

    private function getMhpWomenSessions($year, $month)
    {
        return CboTraining::where('training_gender', 'Female')->whereYear('date_of_training', $year)->whereMonth('date_of_training', $month)->with('cbo')->get();
    }

    private function getMhpTechnicalSurveys($year, $month)
    {
        return MhpSite::whereYear('created_at', $year)->whereMonth('created_at', $month)->get();
    }

    private function getMhpDesignImprovements($year, $month)
    {
        // Assuming design improvements are tracked by updates to the MhpSite model
        return MhpSite::whereYear('updated_at', $year)->whereMonth('updated_at', $month)->get();
    }

    private function getMhpProcurement($year, $month)
    {
        // Models not implemented
        return [];
    }

    private function getMhpConstructionProgress($year, $month)
    {
        return ProjectPhysicalProgress::where('projectable_type', 'App\Models\MhpSite')
            ->whereYear('progress_date', $year)->whereMonth('progress_date', $month)->with('projectable')->get();
    }

    private function getMhpCompletions($year, $month)
    {
        return MhpCompletion::whereYear('testing_commissioning_date', $year)->whereMonth('testing_commissioning_date', $month)->with('mhpSite')->get();
    }

    private function getMhpTesting($year, $month)
    {
        return MhpCompletion::whereYear('testing_commissioning_date', $year)->whereMonth('testing_commissioning_date', $month)->with('mhpSite')->get();
    }

    // Irrigation Data
    private function getIrrigationParticipatoryWorkshops($year, $month)
    {
        $irrigationCboIds = IrrigationScheme::pluck('cbo_id')->unique();
        $dialogues = CboDialogue::whereIn('cbo_id', $irrigationCboIds)->whereYear('date_of_dialogue', $year)->whereMonth('date_of_dialogue', $month)->with('cbo')->get();
        $exposureVisits = CboExposureVisit::whereIn('cbo_id', $irrigationCboIds)->whereYear('date_of_visit', $year)->whereMonth('date_of_visit', $month)->with('cbo')->get();
        return ['dialogues' => $dialogues, 'exposure_visits' => $exposureVisits];
    }

    private function getIrrigationCbos($year, $month)
    {
        $irrigationCboIds = IrrigationScheme::pluck('cbo_id')->unique();
        return Cbo::whereIn('id', $irrigationCboIds)->whereYear('date_of_formation', $year)->whereMonth('date_of_formation', $month)->get();
    }

    private function getIrrigationFeasibilitySurveys($year, $month)
    {
        return IrrigationSchemeProfile::whereYear('date_technical_surveys', $year)->whereMonth('date_technical_surveys', $month)->with('irrigationScheme')->get();
    }

    private function getIrrigationSchemeDigests($year, $month)
    {
        return IrrigationScheme::whereYear('created_at', $year)->whereMonth('created_at', $month)->with('profile')->get();
    }

    private function getIrrigationConstructionProgress($year, $month)
    {
        return ProjectPhysicalProgress::where('projectable_type', 'App\Models\IrrigationScheme')
            ->whereYear('progress_date', $year)->whereMonth('progress_date', $month)->with('projectable')->get();
    }

    private function getIrrigationCompletions($year, $month)
    {
        return IrrigationCompletion::whereYear('created_at', $year)->whereMonth('created_at', $month)->with('irrigationScheme')->get();
    }

    private function getIrrigationHandingOver($year, $month)
    {
        return IrrigationCompletion::whereYear('handing_over_to_community_date', $year)->whereMonth('handing_over_to_community_date', $month)->with('irrigationScheme')->get();
    }
}
