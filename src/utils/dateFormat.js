export function formatDate(date) {
  const now = new Date();
  var TWO_MIN = 2 * 60 * 1000;
  const _date = new Date(date);
  if (now - _date > TWO_MIN) {
    const month = _date.toLocaleString("no-NO", { month: "long" });
    const dateString = ` ${_date.getDate()}. ${month} at ${
      (_date.getHours() < 10 ? "0" : "") + _date.getHours()
    }:${(_date.getMinutes() < 10 ? "0" : "") + _date.getMinutes()}`;
    date = dateString;
  } else {
    date = "Just now";
  }
  return date;
}
