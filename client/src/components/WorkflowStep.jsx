import { DropdownItem } from "reactstrap";
import classNames from "classnames";
import React from "react";

const WorkflowStep = ({ id, title, onClick, selectedId, faIcon = "fas" }) => (
    <DropdownItem
        className={classNames("workflow-widget__item", {
            "workflow-widget__item--no-state": id === 0,
            "workflow-widget__item--active": selectedId === id,
        })}
        onClick={onClick}
        disabled={selectedId === id}
    >
        <span className={classNames("workflow-widget__item__icon", faIcon)} />
        {title}
    </DropdownItem>
);

export default WorkflowStep;
