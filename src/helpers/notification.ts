import { Store } from "react-notifications-component";

export default function notify(type: "success" | "failure") {
  Store.addNotification({
    title: type === "success" ? "Copied!" : "Error",
    message:
      type === "success"
        ? "Summary has been copied to your clipboard!! 📜"
        : "There's been a slight problem, refresh page",
    type: type === "success" ? "success" : "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4500,
      onScreen: true,
    },
  });
}
