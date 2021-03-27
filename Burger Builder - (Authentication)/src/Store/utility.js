export const updateObject = (oldObj, updatedProperty) => {
  return {
    ...oldObj,
    ...updatedProperty,
  };
};
