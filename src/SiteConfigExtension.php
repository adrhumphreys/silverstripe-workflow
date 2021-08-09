<?php

namespace SilverStripe\Workflow;

use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\HasManyList;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * Add the workflow states to the site
 *
 * @property SiteConfig|$this owner
 * @method Step[]|HasManyList Steps
 */
class SiteConfigExtension extends DataExtension
{
    private static array $has_many = [
        'Steps' => Step::class,
    ];

    public function updateCMSFields(FieldList $fields): void
    {
        $field = GridField::create(
            'Steps',
            'Steps',
            $this->owner->Steps(),
            GridFieldConfig_RecordEditor::create()
        );
        $fields->addFieldToTab('Root.Workflow', $field);
    }
}
