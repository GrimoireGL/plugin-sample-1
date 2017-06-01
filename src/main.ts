import gr from "grimoirejs";
import KeyboardController from "./Components/KeyboardControllerComponent";

export default () => {
  gr.register(async () => {
    gr.registerComponent("KeyboardController", KeyboardController)
  });
};
