# Workflow
Manage your content by using a dropdown on your elements and pages to set the state of them. This module has been designed to be paired with an integration in project management software such as Trello. (We've done this initially with Trello [here](https://github.com/adrhumphreys/silverstripe-workflow-trello))

## Requirements

* SilverStripe ^4
* Elemental ^4

## Installation
```
composer require silverstripe/workflow
```

## Add custom icons/colors to steps
These are configurable properties in the `Step` you can do something like:

```yaml
SilverStripe\Workflow\Step:
    colors:
        -
            Title: 'Red'
            CSSClass: 'custom-css-class'
            Color: '#d40404'
```

Likewise for icons:
```yaml
SilverStripe\Workflow\Step:
    icons:
        -
            Title: 'My icon'
            CSSClass: 'custom-css-class'
```

## Integrate with a third party:
We've tried to make it so you can just add some extension points and methods to allow you to integrate with a third party service easily. If you run into bariers, please reach out. We'd love to help.

### Editing the response when upating a workflow:
`WorkflowControllerExtension::handleChange` is the method that is called and it fires of anextension hook of `updateResponse`. If you update the response to include in the json and array of links with the key `links` you can include the link to the relevant service where needed


## License
See [License](license.md)

## Maintainers
 * Adrian Humphreys <adrhumphreys@gmail.com>

## Bugtracker
Bugs are tracked in the issues section of this repository. Before submitting an issue please read over existing issues to ensure yours is unique.

If the issue does look like a new bug:

 - Create a new issue
 - Describe the steps required to reproduce your issue, and the expected outcome. Unit tests, screenshots
 and screencasts can help here.
 - Describe your environment as detailed as possible: SilverStripe version, Browser, PHP version,
 Operating System, any installed SilverStripe modules.

Please report security issues to the module maintainers directly. Please don't file security issues in the bugtracker.

## Development and contribution
If you would like to make contributions to the module please ensure you raise a pull request and discuss with the module maintainers.
