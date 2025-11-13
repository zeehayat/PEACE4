<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReportService;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function monthlyProgress(Request $request, $year, $month)
    {
        $data = $this->reportService->getMonthlyProgressData($year, $month);
        $data['year'] = $year;
        $data['month'] = $month;

        $pdf = Pdf::loadView('reports.monthly_progress', $data);
        return $pdf->download('monthly-progress-report-'.$year.'-'.$month.'.pdf');
    }
}