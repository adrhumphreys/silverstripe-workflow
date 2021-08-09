<?php

namespace SilverStripe\Workflow;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObject;

class WorkflowWidget extends FormField
{
    private DataObject $item;

    protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

    protected $schemaComponent = 'WorkflowWidget';

    private static array $casting = [
        'getPropsJSON' => 'HTMLFragment',
    ];

    /**
     * @param DataObject|StepRelationExtension $item
     */
    public function __construct(DataObject $item)
    {
        parent::__construct('WorkflowWidget', 'Workflow');
        $this->item = $item;
        $this->addExtraClass('workflow-widget');
    }

    public function getProps(): array
    {
        $steps = [
            [
                'id' => 0,
                'title' => 'No step',
            ]
        ];

        foreach (Step::get() as $step) {
            $steps[] = [
                'id' => $step->ID,
                'title' => $step->Title,
            ];
        }

        $item = $this->item;
        $idField = $item instanceof SiteTree
            ? 'PageID'
            : 'ElementID';
        /** @var StepRelation $selectedStep */
        $selectedStep = StepRelation::get()->find($idField, $item->ID);
        $selectedStepId = $selectedStep
            ? $selectedStep->StepID
            : 0;

        return [
            'recordId' => $item->ID,
            'recordType' => $item instanceof SiteTree
                ? WorkflowController::RECORD_TYPE_PAGE
                : WorkflowController::RECORD_TYPE_ELEMENT,
            'steps' => $steps,
            'selectedStepId' => $selectedStepId,
            'route' => WorkflowController::ROUTE,
        ];
    }

    public function getSchemaStateDefaults(): array
    {
        $state = parent::getSchemaStateDefaults();
        $state['actualProps'] = $this->getProps();

        return $state;
    }

    public function setUseButtonTag(): void
    {
        // This is a method that's assumed to exist
    }
}