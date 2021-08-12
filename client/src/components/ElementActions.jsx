import React, { useState, useEffect } from "react";
import { getSteps } from "../helper";
import { inject } from "lib/Injector";

const ElementActions = (props) => {
    const { WorkflowButton } = props;
    const [steps, setSteps] = useState([]);
    const [links, setLinks] = useState(null);
    const [selectedStepId, setSelectedStepId] = useState(0);

    const recordId = props.element.id;
    const recordType = "element";

    // Once on render we want the available steps
    useEffect(() => {
        getSteps({
            route: "cms/api/workflow/steps/",
            recordId,
            recordType,
        }).then(({ steps, selectedStepId, links }) => {
            setSteps(steps);
            setSelectedStepId(selectedStepId);
            setLinks(links);
        });
    }, []);

    const buttonProps = {
        recordId,
        recordType,
        route: "cms/api/workflow",
        steps,
        selectedStepId,
        links,
    };

    return (
        <div className="workflow-element-actions">
            <WorkflowButton {...buttonProps} />
        </div>
    );
};

export { ElementActions as Component };

export default inject(["WorkflowButton"])(ElementActions);
