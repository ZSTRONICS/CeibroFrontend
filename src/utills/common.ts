export const openFormInNewWindow = (path: string) => {
  const width = 900;
  const height = 782;
  const newWindow = window.open(
    path,
    "",
    `width=${width},height=${height},toolbar=no,location=no,resizable=no`
  );

  // Set the title of the new window
  if (newWindow != null) {
    newWindow.document.title = "";
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
