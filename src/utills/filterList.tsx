
export const filterList = (terms:any, arr:[]) => {
    if ("" === terms || terms.length < 3) return arr;
  const words = terms.match(/\w+|"[^"]+"/g);
  words.push(terms);
  return arr.filter((a) => {
      const v = Object.values(a);
      const f = JSON.stringify(v).toLowerCase();
    return words.every((val:any) => f.includes(val));
  });
  };
