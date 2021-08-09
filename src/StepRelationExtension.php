<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

/**
 * Allow a data object to have an assigned step, we go through
 * StepRelation as we don't want to write to the data object
 *
 * @property int StepRelationID
 * @method StepRelation StepRelation
 */
class StepRelationExtension extends DataExtension
{
    public function updateCMSFields(FieldList $fields): void
    {
        if (!$this->owner instanceof BaseElement) {
            return;
        }

        // TODO: Get elemental to support adding in custom actions
        $fields->addFieldToTab(
            'Root.Main',
            WorkflowWidget::create($this->owner),
            'Title'
        );
    }

    public function updateCMSActions(FieldList $actions): void
    {
        $actions->push(WorkflowWidget::create($this->owner));
    }
}
