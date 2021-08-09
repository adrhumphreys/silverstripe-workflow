import jQuery from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import { loadComponent } from "lib/Injector";

/**
 * Uses entwine to inject the WorkflowWidget React component into the DOM, when used
 * outside of a React context e.g. in the CMS
 */
jQuery.entwine("ss", ($) => {
  $(".js-injector-boot .workflow-widget").entwine({
    onmatch() {
      const context = {};
      const WorkflowWidget = loadComponent("WorkflowWidget", context);
      const props = JSON.parse(this.attr("data-state"));

      ReactDOM.render(<WorkflowWidget {...props} />, this[0]);
    },

    onunmatch() {
      ReactDOM.unmountComponentAtNode(this[0]);
    },
  });
});
