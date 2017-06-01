import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";

export default class KeyboardControllerComponent extends Component {

  public static componentName: string = "KeyboardController";

  public static attributes: { [key: string]: IAttributeDeclaration } = {
    m: {
      converter: "Number",
      default: 1
    },
    attenuation: {
      converter: "Number",
      default: 0.999
    },
    resistance: {
      converter: "Number",
      default: 0.5
    }
  };

  private _time = 0;
  private _speed = 0;
  private _a = false;
  private _d = false;

  public $mount(): void {
    window.addEventListener("keyup", (e) => {
      if (e.key == "a") {
        this._a = false
      } else if (e.key == "d") {
        this._d = false;
      }
    }, false);
    window.addEventListener("keydown", (e) => {
      if (e.key == "a") {
        this._a = true;
      } else if (e.key == "d") {
        this._d = true;
      }
    }, false);
  }

  public $update(): void {
    let force = this._a ? 1 : 0;
    force += this._d ? -1 : 0;

    let res = -this._speed * this.getAttribute("resistance");
    // this._speed *= this.getAttribute("attenuation");
    console.log(force, res, this._speed);
    let now = Date.now();
    let delta = now - this._time;
    this._time = now;

    if (delta < 1000) {
      let ds = delta / 1000;
      let dv = ds * (force + res);
      this._speed += dv;
      let xd = this._speed * ds;
      var pos = this.node.getAttribute("position");
      this.node.setAttribute("position", [pos.X + xd, pos.Y, pos.Z])
    }

  }
}
