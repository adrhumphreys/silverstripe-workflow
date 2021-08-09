<?php

namespace SilverStripe\Workflow;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\DataObject;

/**
 * A little awkward, but prevents us from needing to write to the page record
 * @property int StepID
 * @property int PageID
 * @property int ElementID
 */
class StepRelation extends DataObject
{
    private static array $has_one = [
        'Step' => Step::class,
        'Page' => SiteTree::class,
        'Element' => BaseElement::class,
    ];
}
