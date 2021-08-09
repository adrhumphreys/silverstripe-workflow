import React from "react";
import PropTypes from "prop-types";
import { inject } from "lib/Injector";

// Middle-ware for the widget since we need to deal with props
// we don't care for
const WorkflowWidget = (props) => {
    console.log(props);
    const { actualProps, WorkflowButton } = props;
    return <WorkflowButton {...actualProps} />;
};

export { WorkflowWidget as Component };

export default inject(["WorkflowButton"])(WorkflowWidget);
