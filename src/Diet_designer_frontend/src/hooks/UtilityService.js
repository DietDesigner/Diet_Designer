const useUtilityService = () => {
  const setPrincipalToLocalStorage = (data) => {
    try {
      window.localStorage.setItem("principal", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save principal to localStorage:", error);
    }
  };

  const getPrincipalFromLocalStorage = () => {
    try {
      const storedPrincipal = localStorage.getItem("principal");
      return storedPrincipal ? JSON.parse(storedPrincipal) : null;
    } catch (error) {
      console.error("Failed to parse principal from localStorage:", error);
      return null;
    }
  };

  return {
    setPrincipalToLocalStorage,
    getPrincipalFromLocalStorage,
  };
};

export default useUtilityService;
