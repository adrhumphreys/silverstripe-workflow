import { DropdownItem } from "reactstrap";
import classNames from "classnames";
import React from "react";

const WorkflowStep = ({ id, title, onClick, selectedId }) => (
    <DropdownItem
        className={classNames("workflow-widget__item", {
            "workflow-widget__item--no-state": id === 0,
            "workflow-widget__item--active": selectedId === id,
        })}
        onClick={onClick}
        toggle={false}
        disabled={selectedId === id}
    >
        {title}
        {selectedId === id && id !== 0 ? (
            <span className="font-icon font-icon-check-mark-circle" />
        ) : null}
    </DropdownItem>
);

export default WorkflowStep;
