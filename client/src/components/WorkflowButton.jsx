import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from "reactstrap";
import classNames from "classnames";
import { inject } from "lib/Injector";
import { sendSelectedStep } from "../helper";

const WorkflowButton = (props) => {
    const {
        recordId,
        recordType,
        selectedStepId,
        steps,
        route,
        WorkflowIcon,
        WorkflowStep,
    } = props;
    const [selectedId, setSelectedId] = useState(selectedStepId);

    const selectedSteps = steps.filter((s) => s.id === selectedId);
    const selectedStep =
        Array.isArray(selectedSteps) && selectedSteps.length > 0
            ? selectedSteps[0]
            : null;
    const title = selectedStep ? `${selectedStep.title}` : "Workflow";

    const createOnClick = (stepId) => () => {
        setSelectedId(stepId);
        sendSelectedStep({
            route,
            stepId,
            recordId,
            recordType,
        });
    };

    const renderedSteps = steps.map((s) => (
        <WorkflowStep
            key={s.id}
            {...s}
            onClick={createOnClick(s.id)}
            selectedId={selectedId}
        />
    ));

    return (
        <div className="workflow-widget">
            <UncontrolledButtonDropdown>
                <DropdownToggle>
                    <WorkflowIcon />
                    {title}
                    <span className="sr-only">Update workflow</span>
                </DropdownToggle>
                <DropdownMenu>{renderedSteps}</DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
    );
};

export { WorkflowButton as Component };

export default inject(["WorkflowIcon", "WorkflowStep"])(WorkflowButton);
