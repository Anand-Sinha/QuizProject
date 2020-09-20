import axios from "axios";

export const getQuestion = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: "/api/v1/ques",
    });
    // console.log(result);
    const resultData = result.data.data.data;
    return resultData;
  } catch (error) {
    console.log(error);
  }
};
