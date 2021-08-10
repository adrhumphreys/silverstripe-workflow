import React, { useState, useEffect } from "react";
import { getSteps } from "../helper";
import { inject } from "lib/Injector";

const ElementActions = (props) => {
    const { ActionCompontent, WorkflowButton } = props;
    const [steps, setSteps] = useState([]);
    const [selectedStepId, setSelectedStepId] = useState(0);

    const recordId = props.element.id;
    const recordType = "element";

    // Once on render we want the available steps
    useEffect(() => {
        getSteps({
            route: "cms/api/workflow/steps/",
            recordId,
            recordType,
        }).then(({ steps, selectedStepId }) => {
            setSteps(steps);
            setSelectedStepId(selectedStepId);
        });
    }, []);

    const buttonProps = {
        recordId,
        recordType,
        route: "cms/api/workflow",
        steps,
        selectedStepId,
    };

    return (
        <div className="workflow-element-actions">
            <WorkflowButton {...buttonProps} />
            <ActionCompontent {...props} />
        </div>
    );
};

export { ElementActions as Component };

export default inject(["WorkflowButton"])(ElementActions);
