
export const openFormInNewWindow = (path: string, windowTitle:string) => {
  let width = 900;
  let height = 782;
  const leftOffset = (window.screen.width - width) / 2 + window.screenX;
  const topOffset = (window.screen.height - height) / 2 + window.screenY;
  // if (window.innerWidth < 900) {
  //   width = window.innerWidth - 50;
  // }
  // if (window.innerHeight < 782) {
  //   height = window.innerHeight - 50;
  // }
  const newWindow = window.open(
    path,
    "",
    `width=${width},height=${height},left=${leftOffset},top=${topOffset},toolbar=no,location=no,resizable=no, status=no`
  );

  // Set the title of the new window
  if (newWindow != null) {
    newWindow.addEventListener('load', () => {
      newWindow.document.title = windowTitle;
    });
  }
};

// Now this function for handle contacts search
export const handleGroupSearch = (
  searchText: string,
  sortedData: { [key: string]: any[] },
  searchKey: string | undefined
) => {
  if (searchText === "" || !searchKey) return sortedData;

  const searchCharacter = searchText.charAt(0).toLowerCase();
  const filteredData: { [key: string]: any[] } = {};

  Object.entries(sortedData).forEach(([groupLetter, groupOptions]) => {
    if (groupLetter.startsWith(searchCharacter.toUpperCase())) {
      const filteredOptions = groupOptions.filter((groupOption) =>
        groupOption[searchKey].toLowerCase().includes(searchText.toLowerCase())
      );
      if (filteredOptions.length > 0) {
        filteredData[groupLetter] = filteredOptions;
      }
      //this return for break the forEach loop
      return;
    }
  });

  return filteredData;
};
