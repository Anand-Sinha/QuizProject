import axios from "axios";

export const getQuestion = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: "/api/v1/ques",
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
