<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Forms\ElementalAreaConfig;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\GridField\GridFieldDetailForm;

/**
 * @property ElementalAreaConfig|$this owner
 */
class ElementalAreaConfigExtension extends Extension
{
    public function updateConfig(): void
    {
        /** @var GridFieldDetailForm $form */
        $form = $this->owner->getComponentByType(GridFieldDetailForm::class);
        $form->setItemRequestClass(WorkflowItemRequest::class);
    }
}
