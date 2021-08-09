<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Models\BaseElement;
use LogicException;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;

class WorkflowController extends Controller
{
    public const ROUTE = 'cms/api/workflow';

    public const RECORD_TYPE_PAGE = 'page';
    public const RECORD_TYPE_ELEMENT = 'element';

    private static string $url_segment = self::ROUTE;

    private static array $url_handlers = [
        'POST /' => 'handleChange',
    ];

    private static array $allowed_actions = [
        'handleChange',
    ];

    public function handleChange(HTTPRequest $request): HTTPResponse
    {
        $input = json_decode($request->getBody(), true);

        $proposedStep = $input['stepId'];
        $proposedRecordId = $input['recordId'];
        $proposedRecordType = $input['recordType'];

        foreach ([$proposedStep, $proposedRecordId] as $inputCheck) {
            if (!$inputCheck || !is_numeric($inputCheck)) {
                return $this->createJsonResposne([
                    'error' => 'Missing or invalid parameters',
                ]);
            }
        }

        if ($proposedRecordType !== self::RECORD_TYPE_ELEMENT
            && $proposedRecordType !== self::RECORD_TYPE_PAGE) {
            return $this->createJsonResposne([
                'error' => 'Invalid record type',
            ]);
        }

        /** @var StepRelationExtension $record */
        $record = $proposedRecordType === self::RECORD_TYPE_PAGE
            ? SiteTree::get()->find('ID', $proposedRecordId)
            : BaseElement::get()->find('ID', $proposedRecordId);

        if (!$record) {
            return $this->createJsonResposne([
                'error' => 'Record not found',
            ]);
        }

        $step = Step::get()->find('ID', $proposedStep);

        if (!$step) {
            return $this->createJsonResposne([
                'error' => 'Step not found',
            ]);
        }

        $relatedStepField = $record instanceof SiteTree
            ? 'PageID'
            : 'ElementID';
        /** @var StepRelation $relatedStep */
        $relatedStep = StepRelation::get()
            ->find($relatedStepField, $record->ID);

        if (!$relatedStep) {
            $relatedStep = StepRelation::create();
            $relatedStep->setField($relatedStepField, $record->ID);
        }

        $relatedStep->StepID = $step->ID;
        $relatedStep->write();

        return $this->createJsonResposne([
            'success' => true,
        ]);
    }

    public function createJsonResposne(array $data): HTTPResponse
    {
        $body = json_encode($data, JSON_PRETTY_PRINT);

        return HTTPResponse::create($body)
            ->addHeader('Content-Type', 'application/json; charset=utf-8');
    }
}
