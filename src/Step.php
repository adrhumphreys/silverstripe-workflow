<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * @property string Title
 * @property int Sort
 * @method SiteConfig Workflow
 * @method SiteTree[]|HasManyList Pages
 * @method BaseElement[]|HasManyList Elements
 */
class Step extends DataObject
{
    private static string $singular_name = 'Step';

    private static string $plural_name = 'Steps';

    private static string $table_name = 'Workflow_Step';

    private static array $db = [
        'Title' => 'Varchar(255)',
        'Sort' => 'Int',
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
            'Sort',
            'Pages',
            'Elements',
            'WorkflowID',
        ]);

        return $fields;
    }
}
