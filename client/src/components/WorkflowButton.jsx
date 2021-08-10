import React, { useState, useEffect, Fragment } from "react";
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
    const [title, setTitle] = useState(null);
    const [icon, setIcon] = useState(null);

    // This prop gets changed so we need to update it
    useEffect(() => {
        setSelectedId(selectedStepId);
    }, [selectedStepId]);

    useEffect(() => {
        const selectedSteps = steps.filter((s) => s.id === selectedId);
        const selectedStep =
            Array.isArray(selectedSteps) && selectedSteps.length > 0
                ? selectedSteps[0]
                : null;

        if (selectedStep) {
            setTitle(selectedStep.title);
            setIcon(selectedStep.icon);
        }
    }, [selectedId]);

    const createOnClick = (stepId) => () => {
        setSelectedId(stepId);
        sendSelectedStep({
            route,
            stepId,
            recordId,
            recordType,
        });
    };

    const renderedSteps = steps
        ? steps.map((s) => (
              <WorkflowStep
                  key={s.id}
                  {...s}
                  onClick={createOnClick(s.id)}
                  selectedId={selectedId}
              />
          ))
        : null;

    return (
        <div className="workflow-widget">
            <UncontrolledButtonDropdown>
                <DropdownToggle
                    className={classNames("workflow-widget__button", {
                        "workflow-widget__button--loading":
                            renderedSteps === null,
                    })}
                >
                    {icon ? (
                        <img src={icon} alt={title} />
                    ) : (
                        <div>
                            <WorkflowIcon />
                            {title}
                        </div>
                    )}
                </DropdownToggle>
                <DropdownMenu>{renderedSteps}</DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
    );
};

export { WorkflowButton as Component };

export default inject(["WorkflowIcon", "WorkflowStep"])(WorkflowButton);
