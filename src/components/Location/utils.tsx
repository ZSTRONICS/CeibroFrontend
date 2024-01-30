export const filterData = (
  data: any[],
  filterKey: string,
  value: any
): any[] => {
  if (data && data.length > 0) {
    return data.filter((item) => item[filterKey] === value);
  } else {
    return [];
  }
};
export const findData = (data: any[], filterKey: string, value: any): any[] => {
  if (data && data.length > 0) {
    return data.find((item) => item[filterKey] === value);
  } else {
    return [];
  }
};
