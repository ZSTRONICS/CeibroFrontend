
export function formatDate(date: any) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

  return [year, month, day].join('-');
}

export function removeCurrentUser(values: any, currentUser: any) {
  return values?.filter((user: any) => String(user.value) !== String(currentUser));
}