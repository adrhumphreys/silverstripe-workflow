<?php

namespace SilverStripe\Workflow;

use SilverStripe\Forms\FieldList;
use SilverStripe\Versioned\VersionedGridFieldItemRequest;

class WorkflowItemRequest extends VersionedGridFieldItemRequest
{
    protected function getFormActions(): FieldList
    {
        $actions = parent::getFormActions();

        $record = $this->getRecord();

        $actions->add(WorkflowWidget::create($record, true));

        return $actions;
    }
}
