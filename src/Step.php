<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * @property string Title
 * @property string Icon
 * @property int Sort
 * @property int WorkflowID
 * @method SiteConfig Workflow
 * @method SiteTree[]|HasManyList Pages
 * @method BaseElement[]|HasManyList Elements
 */
class Step extends DataObject
{
    public const ICON_NONE = 'none.svg';
    public const ICON_WORK_IN_PROGRESS = 'work-in-progress.svg';
    public const ICON_WAITING = 'waiting.svg';
    public const ICON_DONE = 'done.svg';

    private const ICONS = [
        self::ICON_NONE => 'None',
        self::ICON_WORK_IN_PROGRESS => 'Work in progress',
        self::ICON_WAITING => 'Waiting',
        self::ICON_DONE => 'Done',
    ];

    private static string $singular_name = 'Step';

    private static string $plural_name = 'Steps';

    private static string $table_name = 'Workflow_Step';

    private static array $db = [
        'Title' => 'Varchar(255)',
        'Icon' => 'Varchar(255)',
        'Sort' => 'Int',
    ];

    private static array $defaults = [
        'Icon' => self::ICON_NONE,
    ];

    private static array $has_one = [
        'Workflow' => SiteConfig::class,
    ];

    private static array $has_many = [
        'Pages' => SiteTree::class,
        'Elements' => BaseElement::class,
    ];

    public function getCMSFields(): FieldList
    {
        $fields = parent::getCMSFields();

        $fields->removeByName([
            'Icon',
            'Sort',
            'Pages',
            'Elements',
            'WorkflowID',
        ]);

        $fields->addFieldToTab('Root.Main', DropdownField::create(
           'Icon', 'Icon',  self::ICONS
        ));

        return $fields;
    }
}
