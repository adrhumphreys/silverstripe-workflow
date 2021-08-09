import React, { useState } from "react";
import PropTypes from "prop-types";
import { inject } from "lib/Injector";
import { sendSelectedStep } from "../helper";

const WorkflowStep = ({ id, title, onClick, selectedId }) => (
    <button type="button" className="workflow__state" onClick={onClick}>
        {title}
        {selectedId === id ? "selected" : "not selected"}
    </button>
);

const WorkflowOptions = ({ steps, selectedId, createOnClick }) => {
    const renderedSteps = steps.map((s) => (
        <WorkflowStep
            key={s.id}
            {...s}
            onClick={createOnClick(s.id)}
            selectedId={selectedId}
        />
    ));

    return <div>{renderedSteps}</div>;
};

const WorkflowButton = ({
    recordId,
    recordType,
    selectedStepId,
    steps,
    PopoverField,
    route,
}) => {
    const [selectedId, setSelectedId] = useState(selectedStepId);
    const [open, setOpen] = useState(false);
    const toggleCallback = () => setOpen(!open);

    const selectedSteps = steps.filter((s) => s.id === selectedId);
    const selectedStep =
        Array.isArray(selectedSteps) && selectedSteps.length > 0
            ? selectedSteps[0]
            : null;
    const title = selectedStep ? `${selectedStep.title}` : "Workflow";

    const popoverProps = {
        id: `workflow-widget-${recordType}-${recordId}`,
        buttonClassName: "font-icon-tree",
        title: title,
        data: {
            popoverTitle: "Edit workflow state",
            buttonTooltip: "Edit workflow state",
            placement: "top",
            trigger: "focus",
        },
    };

    console.log(steps);
    console.log(selectedId);
    console.log(selectedStepId);

    const createOnClick = (stepId) => () => {
        setSelectedId(stepId);
        sendSelectedStep({
            route,
            stepId,
            recordId,
            recordType,
        });
    };

    return (
        <div className="workflow-widget">
            <PopoverField {...popoverProps}>
                <WorkflowOptions
                    steps={steps}
                    setSelectedId={setSelectedId}
                    selectedId={selectedId}
                    createOnClick={createOnClick}
                />
            </PopoverField>
        </div>
    );
};

WorkflowButton.propTypes = {
    PopoverField: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
        .isRequired,
};

export { WorkflowButton as Component };

export default inject(["PopoverField"])(WorkflowButton);
