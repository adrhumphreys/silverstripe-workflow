<?php

namespace SilverStripe\Workflow;

use BucklesHusky\FontAwesomeIconPicker\Forms\FAPickerField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\TextField;
use SilverStripe\IconPicker\IconPickerField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\HasManyList;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * Add the workflow states to the site
 *
 * @property SiteConfig|$this owner
 * @property string WorkflowNoStepTitle
 * @property string WorkflowNoStepIcon
 * @method Step[]|HasManyList Steps
 */
class SiteConfigExtension extends DataExtension
{
    private static array $db = [
        'WorkflowNoStepTitle' => 'Varchar(255)',
        'WorkflowNoStepIcon' => 'Varchar(255)',
    ];

    private static array $has_many = [
        'Steps' => Step::class,
    ];

    public function updateCMSFields(FieldList $fields): void
    {
        $fields->addFieldsToTab('Root.Workflow', [
            TextField::create('WorkflowNoStepTitle', 'Unselected step title')
                ->setDescription('E.g. "Nothing set"'),
            IconPickerField::create(
                'Icon',
                'Icon',
                Step::config()->get('icons')
            ),
        ]);

        $field = GridField::create(
            'Steps',
            'Steps',
            $this->owner->Steps(),
            GridFieldConfig_RecordEditor::create()
        );
        $fields->addFieldToTab('Root.Workflow', $field);
    }
}
