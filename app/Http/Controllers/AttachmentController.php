
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attachment;
use App\Services\AttachmentService;

class AttachmentController extends Controller
{
    protected AttachmentService $service;

    public function __construct(AttachmentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = Attachment::latest()->paginate(10);
        return inertia('Attachments/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'Attachment created.');
    }

    public function update(Request $request, Attachment $attachment)
    {
        $this->service->update($attachment, $request->all());
        return redirect()->back()->with('success', 'Attachment updated.');
    }

    public function destroy(Attachment $attachment)
    {
        $this->service->delete($attachment);
        return redirect()->back()->with('success', 'Attachment deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('Attachments/Show', compact('item'));
    }
}
