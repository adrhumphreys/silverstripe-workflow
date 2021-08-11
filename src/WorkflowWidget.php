<?php

namespace SilverStripe\Workflow;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Extensible;
use SilverStripe\Core\Manifest\ModuleResource;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObject;
use SilverStripe\View\ArrayData;

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
    public function __construct(DataObject $item, bool $addMarginRight = false)
    {
        parent::__construct('WorkflowWidget', 'Workflow');
        $this->item = $item;
        $this->addExtraClass('workflow-widget');

        if ($addMarginRight) {
            $this->addExtraClass('workflow-widget--margin-right');
        }
    }

    /**
     * @return DataObject|StepRelationExtension
     */
    public function getItem(): DataObject
    {
        return $this->item;
    }

    public function getProps(): array
    {
        $steps = [WorkflowWidget::getNothingStep()];

        /** @var Step $step */
        foreach (Step::get() as $step) {
            $steps[] = [
                'id' => $step->ID,
                'title' => $step->Title,
                'icon' => $step->getIconPath(),
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

        $props = ArrayData::create([
            'recordId' => $item->ID,
            'recordType' => $item instanceof SiteTree
                ? WorkflowController::RECORD_TYPE_PAGE
                : WorkflowController::RECORD_TYPE_ELEMENT,
            'steps' => $steps,
            'selectedStepId' => $selectedStepId,
            'route' => WorkflowController::ROUTE,
        ]);

        $this->extend('updateProps', $props);

        $props = $props->toMap();

        return $props;
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

    public static function getNothingStep(): array
    {
        // Icon is relative resource
        $iconResource = ModuleResourceLoader::singleton()
            ->resolveResource('silverstripe/workflow: client/assets/none.svg');

        return [
            'id' => 0,
            'title' => 'Nothing selected',
            'icon' => $iconResource->getURL(),
        ];
    }
}
