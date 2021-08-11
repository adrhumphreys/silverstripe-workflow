<?php

namespace SilverStripe\Workflow;

use BucklesHusky\FontAwesomeIconPicker\Forms\FAPickerField;
use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Colorpicker\Forms\ColorPickerField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * @property string Title
 * @property string FAIcon
 * @property string Color
 * @property int Sort
 * @property int WorkflowID
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
        'FAIcon' => 'Varchar(255)',
        'Color' => 'Varchar(255)',
        'Sort' => 'Int',
    ];

    private static array $has_one = [
        'Workflow' => SiteConfig::class,
    ];

    public function getCMSFields(): FieldList
    {
        $fields = parent::getCMSFields();

        $fields->removeByName([
            'FAIcon',
            'Sort',
            'Pages',
            'Elements',
            'WorkflowID',
        ]);

        $fields->addFieldToTab(
            'Root.Main',
            FAPickerField::create('FAIcon', 'Icon')
        );

        $fields->addFieldsToTab(
            'Root.Main',
            [
                ColorPickerField::create(
                    'Color',
                    'Icon color',
                    [
                        [
                            'Title' => 'Red',
                            'CSSClass' => 'workflow-widget__item__icon--red',
                            'Color' => '#E51016',
                        ],
                        [
                            'Title' => 'Blue',
                            'CSSClass' => 'workflow-widget__item__icon--blue',
                            'Color' => '#1F6BFE',
                        ],
                        [
                            'Title' => 'Green',
                            'CSSClass' => 'workflow-widget__item__icon--green',
                            'Color' => '#298436',
                        ]
                    ]
                )
            ],
            'FAIcon'
        );

        return $fields;
    }
}
