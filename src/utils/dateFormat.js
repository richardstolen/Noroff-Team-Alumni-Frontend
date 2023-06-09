export function formatDate(date) {
  const now = new Date();
  var TWO_MIN = 5 * 60 * 1000;
  const _date = new Date(date);
  _date.setHours(_date.getHours() + 2);
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

export function formatEventDate(date) {
  const _date = new Date(date);
  const month = _date.toLocaleString("no-NO", { month: "long" });
  const dateString = ` ${_date.getDate()}. ${month}`;

  return dateString;
}
