// const windowsMap = new Map();

import { taskConstantEn, taskConstantEt } from "translation/TaskConstant";

export const openFormInNewWindow = (path: string, windowTitle: string) => {
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
    `width=${width}, height=${height}, left=${leftOffset}, top=${topOffset}, toolbar=no, location=no, resizable=no, status=no`
  );

  // Set the title of the new window
  if (newWindow != null) {
    newWindow.addEventListener("load", () => {
      newWindow.document.title = windowTitle;
    });
  } else {
    alert('The new window was blocked. Please allow pop-ups for this site.');
  }
};

// Now this function for handle contacts search
export const handleGroupSearch = (
  searchText: string,
  sortedData: { [key: string]: any[] },
  searchKey: string | undefined
) => {
  if (searchText === "" || !searchKey) return sortedData;

  // const searchCharacter = searchText.charAt(0).toLowerCase();
  const filteredData: { [key: string]: any[] } = {};

  Object.entries(sortedData).forEach(([groupLetter, groupOptions]) => {
    // if (groupLetter.startsWith(searchCharacter.toUpperCase())) {
    const filteredOptions = groupOptions.filter((groupOption) =>
      groupOption[searchKey].toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredOptions.length > 0) {
      filteredData[groupLetter] = filteredOptions;
    }
    //this return for break the forEach loop
    // return;
  });
  // });
  return filteredData;
};
/**
 * Checks if the given string includes the search value, ignoring case.
 *
 * @param {string} str - The string to search in.
 * @param {string} searchValue - The value to search for.
 * @return {boolean} Returns true if the string contains the search value, 
 *                    Otherwise, returns false.
 */
export function includesIgnoreCase(str: string, searchValue: string): boolean {
  const lowerStr = str.toLowerCase();
  const lowerSearchValue = searchValue.toLowerCase();
  return lowerStr.includes(lowerSearchValue);
}

//handle remove Item from File array fo image and doc
export const removeItem = (data: File[], removeFile: File) => {
  const filteredData = data.filter((item: File) => {
    return removeFile.name !== item.name;
  });
  return filteredData;
};

export const taskConstants: any = {
  allTaskFromMe: {
    ongoing: [
      {
        heading: taskConstantEt.FromMe_Ongoing_Qestion_et,
        description: taskConstantEt.FromMe_Ongoing_desc_et,
      },
      {
        heading: taskConstantEn.FromMe_Ongoing_Qestion_en,
        description: taskConstantEn.FromMe_Ongoing_desc_en,
      },
    ],
    done: [
      {
        heading: taskConstantEt.FromMe_Done_Qestion_et,
        description: taskConstantEt.FromMe_Done_desc_et,
      },
      {
        heading: taskConstantEn.FromMe_Done_Qestion_en,
        description: taskConstantEn.FromMe_Done_desc_en,
      },
    ],
  },
  allTaskToMe: {
    ongoing: [
      {
        heading: taskConstantEt.To_Me_Ongoing_Qestion_et,
        description: taskConstantEt.To_Me_Ongoing_desc_et,
      },
      {
        heading: taskConstantEn.To_Me_Ongoing_Qestion_en,
        description: taskConstantEn.To_Me_Ongoing_desc_en,
      },
    ],
    done: [
      {
        heading: taskConstantEt.To_Me_Done_Qestion_et,
        description: taskConstantEt.To_Me_Done_desc_et,
      },
      {
        heading: taskConstantEn.To_Me_Done_Qestion_en,
        description: taskConstantEn.To_Me_Done_desc_en,
      },
    ],
  },
  allTaskHidden: {
    canceled: [
      {
        heading: taskConstantEt.Hidden_Canceled_Qestion_et,
        description: taskConstantEt.Hidden_Canceled_desc_et,
      },
      {
        heading: taskConstantEn.Hidden_Canceled_Qestion_en,
        description: taskConstantEn.Hidden_Canceled_desc_en,
      },
    ],
    done: [
      {
        heading: taskConstantEt.Hidden_Done_Qestion_et,
        description: taskConstantEt.Hidden_Done_desc_et,
      },
      {
        heading: taskConstantEn.Hidden_Done_Qestion_en,
        description: taskConstantEn.Hidden_Done_desc_en,
      },
    ],
    ongoing: [
      {
        heading: taskConstantEt.Hidden_Ongoing_Qestion_et,
        description: taskConstantEt.Hidden_Ongoing_Qestion_et,
      },
      {
        heading: taskConstantEn.Hidden_Ongoing_Qestion_en,
        description: taskConstantEn.Hidden_Ongoing_desc_en,
      },
    ],
  },
};


