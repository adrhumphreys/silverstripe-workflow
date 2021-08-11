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
import WorkflowStep from "./WorkflowStep";

const WorkflowButton = (props) => {
    const {
        recordId,
        recordType,
        selectedStepId,
        steps,
        route,
        links = null,
        WorkflowIcon,
    } = props;
    const [selectedId, setSelectedId] = useState(selectedStepId);
    const [title, setTitle] = useState(null);
    const [icon, setIcon] = useState(null);
    const [faIcon, setFaIcon] = useState("fas fa-spinner");
    const [customLinks, setCustomLinks] = useState(links);

    useEffect(() => {
        setCustomLinks(links);
    }, [links]);

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
            setFaIcon(selectedStep.faIcon);
        }
    }, [selectedId]);

    const createOnClick = (stepId) => () => {
        setSelectedId(stepId);
        sendSelectedStep({
            route,
            stepId,
            recordId,
            recordType,
        }).then((links) => {
            links ? setCustomLinks(links) : null;
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

    const renderedLinks = customLinks
        ? customLinks.map(({ url, title, icon = null }) => (
              <DropdownItem
                  rel="noopener"
                  target="_blank"
                  className="workflow-widget__item workflow-widget__item--link"
                  href={url}
              >
                  {icon ? <img src={icon} aria-hidden={true} /> : null}
                  {title}
              </DropdownItem>
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
                    <span
                        className={classNames(
                            "workflow-widget__item__icon",
                            faIcon
                        )}
                    />
                </DropdownToggle>
                <DropdownMenu>
                    {renderedSteps}{" "}
                    {renderedLinks && renderedLinks.length > 0 ? (
                        <Fragment>
                            <DropdownItem divider />
                            {renderedLinks}
                        </Fragment>
                    ) : null}
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
    );
};

export { WorkflowButton as Component };

export default inject(["WorkflowIcon"])(WorkflowButton);
