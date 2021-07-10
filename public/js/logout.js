// logging out the users
// import axios from "axios";

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    // console.log("user is logged out");
    try {
      const result = await axios({
        method: "GET",
        url: "/api/user/logout",
      });

      //   console.log(result);
      if (result.data.status === "success") location.reload(true);
    } catch (error) {
      console.log(error);
      alert("Error Logging out!! Try again later");
    }
  });
}
