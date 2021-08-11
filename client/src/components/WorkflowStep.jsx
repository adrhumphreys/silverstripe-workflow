import { DropdownItem } from "reactstrap";
import classNames from "classnames";
import React from "react";

const WorkflowStep = ({ id, title, onClick, selectedId, icon }) => (
    <DropdownItem
        className={classNames("workflow-widget__item", {
            "workflow-widget__item--no-state": id === 0,
            "workflow-widget__item--active": selectedId === id,
        })}
        onClick={onClick}
        disabled={selectedId === id}
    >
        <img src={icon} aria-hidden="true" />
        {title}
    </DropdownItem>
);

export default WorkflowStep;
