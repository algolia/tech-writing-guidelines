export default function (_ref) {
  var numberLocale = _ref.numberLocale;

  return {
    formatNumber: function formatNumber(number, render) {
      return Number(render(number)).toLocaleString(numberLocale);
    }
  };
}