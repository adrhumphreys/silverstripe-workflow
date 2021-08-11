<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\ORM\DataObject;

class WorkflowController extends Controller
{
    public const ROUTE = 'cms/api/workflow';

    public const RECORD_TYPE_PAGE = 'page';
    public const RECORD_TYPE_ELEMENT = 'element';

    private static string $url_segment = self::ROUTE;

    private static array $url_handlers = [
        'POST /' => 'handleChange',
        'GET steps' => 'getSteps',
    ];

    private static array $allowed_actions = [
        'handleChange',
        'getSteps',
    ];

    public function handleChange(HTTPRequest $request): HTTPResponse
    {
        $input = json_decode($request->getBody(), true);

        $proposedStep = $input['stepId'];
        $proposedRecordId = $input['recordId'];
        $proposedRecordType = $input['recordType'];

        foreach ([$proposedStep, $proposedRecordId] as $inputCheck) {
            if (!is_numeric($inputCheck)) {
                return $this->createJsonResponse([
                    'error' => 'Missing or invalid parameters',
                ]);
            }
        }

        if ($proposedRecordType !== self::RECORD_TYPE_ELEMENT
            && $proposedRecordType !== self::RECORD_TYPE_PAGE) {
            return $this->createJsonResponse([
                'error' => 'Invalid record type',
            ]);
        }

        /** @var StepRelationExtension $record */
        $record = $proposedRecordType === self::RECORD_TYPE_PAGE
            ? SiteTree::get()->find('ID', $proposedRecordId)
            : BaseElement::get()->find('ID', $proposedRecordId);

        if (!$record) {
            return $this->createJsonResponse([
                'error' => 'Record not found',
            ]);
        }

        $step = Step::get()->find('ID', $proposedStep);

        if (!$step && $proposedStep !== 0) {
            return $this->createJsonResponse([
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

        $relatedStep->StepID = $step
            ? $step->ID
            : 0;
        $relatedStep->write();

        $response = $this->createJsonResponse([
            'success' => true,
        ]);

        $this->extend('updateResponse', $response, $record, $relatedStep, $step);

        return $response;
    }

    public function getSteps(HTTPRequest $request): HTTPResponse
    {
        $data = [];
        $recordId = $request->getVar('id');
        $recordType = $request->getVar('type');
        $relation = null;

        if ($recordId && $recordType) {
            $relation = $this->getRelationByTypeID($recordId, $recordType);
            if ($relation) {
                $data['selectedStepId'] = $relation->StepID;
            }
        }

        $steps = [WorkflowWidget::getNothingStep()];

        /** @var Step $step */
        foreach (Step::get() as $step) {
            $steps[] = [
                'id' => $step->ID,
                'title' => $step->Title,
                'icon' => $step->getIconPath(),
            ];
        }

        $data['steps'] = $steps;

        $this->extend('updateGetSteps', $data, $relation);

        return $this->createJsonResponse($data);
    }

    public function getRelationByTypeID(string $id, string $type): ?StepRelation
    {
        $record = $type === self::RECORD_TYPE_PAGE
            ? SiteTree::get()->find('ID', $id)
            : BaseElement::get()->find('ID', $id);

        if (!$record) {
            return null;
        }

        $relatedStepField = $record instanceof SiteTree
            ? 'PageID'
            : 'ElementID';

        /** @var StepRelation $relation */
        $relation = StepRelation::get()
            ->find($relatedStepField, $record->ID);

        return $relation;
    }

    public function createJsonResponse(array $data): HTTPResponse
    {
        $body = json_encode($data, JSON_PRETTY_PRINT);

        return HTTPResponse::create($body)
            ->addHeader('Content-Type', 'application/json; charset=utf-8');
    }
}
