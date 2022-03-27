export function formatDate(date: any) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
export function mapGroups(groups: any) {
  return groups?.map((list: any) => ({
    label: list.name,
    value: list.id,
  }));
}
