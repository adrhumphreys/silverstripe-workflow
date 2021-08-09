import Injector from "lib/Injector";
import WorkflowWidget from "../components/WorkflowWidget";
import WorkflowButton from "../components/WorkflowButton";

export default () => {
  Injector.component.registerMany({
    WorkflowWidget: WorkflowWidget,
    WorkflowButton: WorkflowButton,
  });
};
