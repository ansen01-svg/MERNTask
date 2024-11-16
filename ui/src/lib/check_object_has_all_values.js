export const isObjectComplete = (obj) =>
  Object.values(obj).every((value) => {
    if (typeof value === "object" && value !== null) {
      return isObjectComplete(value);
    }
    return value !== null && value !== undefined && value !== "";
  });
