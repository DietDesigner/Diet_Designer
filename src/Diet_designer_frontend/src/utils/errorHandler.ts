export const loginErrorHandler = (err: any) => {
  console.log(err);

  // if (err?.data?.response) return err?.data?.response;

  // if (!err?.originalStatus) {
  //   // isLoading: true until timeout occurs
  //   return "No Server Response";
  // }
  if (err?.status === 400) {
    return "Missing Username or Password";
  } else if (err?.status === 401) {
    return "Unauthorized or incorrect credentials";
  } else {
    return "Login Failed";
  }
};

export const errorHandler = (err: any) => {
  console.log(err);

  if (err?.data?.response?.message) return err.data.response.message;

  if (err?.status === 400) {
    return "Something is missing";
  } else if (err?.status === 401) {
    return "Unauthorized";
  } else if (err?.status === 404) {
    return "Not Found";
  } else {
    return "OpsSomething went wrong!!!";
  }
};

export const signupErrorHandler = (err: any) => {
  console.log(err);

  if (err?.data?.message) return err.data.message;

  if (err?.status === 403) {
    return "User with the same email or phone number exists";
  } else if (err?.originalStatus === 401) {
    return "Unauthorized";
  } else if (err?.status === 409) {
    return "User with the same email or phone number exists";
  } else {
    return "OpsSomething went wrong!!!";
  }
};

export const responseErrorHandler = (error: any) => {
  console.log(error);
  if (error?.status === 422) {
    const errorArrays = error?.data?.response?.message;
    if (errorArrays.length > 0) {
      let errorKeys = errorArrays.map(
        (item: any) => Object.keys(item)[0] + ": " + Object.values(item)[0]
      );
      let fields = "";
      errorKeys.map(
        (item: any) => (fields = fields + `${fields === "" ? "" : `\n`}` + item)
      );

      console.log("fields", fields);
      return fields;
    }
  }

  let resMessage =
    (error?.data?.response && error?.data?.response?.message) ||
    error?.response?.data ||
    error?.message ||
    error?.data?.message ||
    error.toString();

  if (resMessage !== "") {
    console.log("resMessage", resMessage);
    return resMessage;
  }

  if (error?.status === 404 || error.status === 404)
    resMessage = "The requested resource was not found";
  if (error?.status === 401 || error.status === 401) resMessage = "Unauthorize";
  if (error?.status === 409 || error.status === 409)
    resMessage = "Duplicate Entry";
  // if (error?.originalStatus === 500 || error.status === 505) resMessage = "Oops Something went wrong Please try again later!!!";
  if (resMessage === "Request failed with status code 500") {
    resMessage = "Oops Something went wrong Please try again later!!!";
  }

  if (resMessage === "Network Error")
    resMessage = "Oops, it seems you do not have internet access!!";
  if (resMessage === "invalid signature")
    resMessage = "Oops Seems the link has expired";

  console.log("Error Message: ", resMessage);

  if (typeof resMessage === "object") resMessage = JSON.stringify(resMessage);

  return resMessage;
};
