import Injector from "lib/Injector";
import WorkflowWidget from "../components/WorkflowWidget";
import WorkflowButton from "../components/WorkflowButton";
import WorkflowIcon from "../components/WorkflowIcon";
import WorkflowStep from "../components/WorkflowStep";

export default () => {
  Injector.component.registerMany({
    WorkflowWidget: WorkflowWidget,
    WorkflowButton: WorkflowButton,
    WorkflowIcon: WorkflowIcon,
    WorkflowStep: WorkflowStep,
  });
};
