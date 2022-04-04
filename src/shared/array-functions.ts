export const partition = <T>(array: T[]) => {
  const TEMPORARY: T[][] = [];
  const GROUP_NUMBER = 2;

  for (let index_array = 0; index_array < array.length; index_array += GROUP_NUMBER) {
     const part = array.slice(index_array, index_array + GROUP_NUMBER);
     TEMPORARY.push(part);
  }

  return TEMPORARY;
}