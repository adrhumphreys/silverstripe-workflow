import Injector from "lib/Injector";
import WorkflowWidget from "../components/WorkflowWidget";
import WorkflowButton from "../components/WorkflowButton";
import ElementActions from "../components/ElementActions";

export default () => {
  Injector.component.registerMany({
    WorkflowWidget: WorkflowWidget,
    WorkflowButton: WorkflowButton,
  });

  Injector.transform("workflow", (updater) => {
    updater.component(
      "ElementActions",
      (ActionCompontent) => (props) => (
        <ElementActions ActionCompontent={ActionCompontent} {...props} />
      ),
      "WorkflowElementActions"
    );
  });
};
