export default {
  header: '',
  item: itemTemplate,
  clearAll: 'Clear all',
  footer: ''
};

function itemTemplate(_ref) {
  var label = _ref.label,
      operator = _ref.operator,
      displayOperator = _ref.displayOperator,
      exclude = _ref.exclude,
      name = _ref.name,
      count = _ref.count,
      cssClasses = _ref.cssClasses,
      query = _ref.query;

  var computedOperator = operator ? displayOperator : '';
  var computedLabel = label ? label + ' ' + (computedOperator || ':') + ' ' : computedOperator;
  var countValue = count === undefined ? 0 : count;
  var computedCount = query ? '' : '<span class="' + cssClasses.count + '">' + countValue + '</span>';
  var computedExclude = exclude ? '-' : '';
  return computedLabel + ' ' + computedExclude + ' ' + name + ' ' + computedCount;
}