var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import templates from './defaultShowMoreTemplates.js';

var defaultShowMoreConfig = {
  templates: templates,
  limit: 100
};

export default function getShowMoreConfig(showMoreOptions) {
  if (!showMoreOptions) return null;

  if (showMoreOptions === true) {
    return defaultShowMoreConfig;
  }

  var config = _extends({}, showMoreOptions);
  if (!showMoreOptions.templates) {
    config.templates = defaultShowMoreConfig.templates;
  }
  if (!showMoreOptions.limit) {
    config.limit = defaultShowMoreConfig.limit;
  }
  return config;
}