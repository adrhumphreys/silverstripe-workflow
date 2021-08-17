<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Colorpicker\Forms\ColorPickerField;
use SilverStripe\Forms\FieldList;
use SilverStripe\IconPicker\IconPickerField;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * @property string Title
 * @property string Icon
 * @property string Color
 * @property int Sort
 * @property int WorkflowID
 * @method SiteConfig Workflow
 * @method SiteTree[]|HasManyList Pages
 * @method BaseElement[]|HasManyList Elements
 */
class Step extends DataObject
{
    public const DEFAULT_ICON = 'font-icon-info-circled';

    private static array $colors = [
        [
            'Title' => 'Red',
            'CSSClass' => 'workflow-widget__item__icon--red',
            'Color' => '#d40404',
        ],
        [
            'Title' => 'Blue',
            'CSSClass' => 'workflow-widget__item__icon--blue',
            'Color' => '#005a93',
        ],
        [
            'Title' => 'Light Blue',
            'CSSClass' => 'workflow-widget__item__icon--light-blue',
            'Color' => '#29abe2',
        ],
        [
            'Title' => 'Green',
            'CSSClass' => 'workflow-widget__item__icon--green',
            'Color' => '#3fa142',
        ],
        [
            'Title' => 'Orange',
            'CSSClass' => 'workflow-widget__item__icon--orange',
            'Color' => '#ff7f22',
        ]
    ];

    private static array $icons = [
        'font-icon-info-circled' => 'Info circled',
        'font-icon-print' => 'Print',
        'font-icon-plus' => 'Plus',
    ];

    private static string $singular_name = 'Step';

    private static string $plural_name = 'Steps';

    private static string $table_name = 'Workflow_Step';

    private static array $db = [
        'Title' => 'Varchar(255)',
        'Icon' => 'Varchar(255)',
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
            'Icon',
            'Sort',
            'Pages',
            'Elements',
            'WorkflowID',
        ]);

        $fields->addFieldToTab(
            'Root.Main',
            IconPickerField::create(
                'Icon',
                'Icon',
                static::config()->get('icons')
            )
        );

        $fields->addFieldsToTab(
            'Root.Main',
            [
                ColorPickerField::create(
                    'Color',
                    'Icon color',
                    static::config()->get('colors')
                )
            ],
            'Icon'
        );

        return $fields;
    }

    public function getIconClass(): ?string
    {
        return $this->Icon ?? self::DEFAULT_ICON;
    }
}
