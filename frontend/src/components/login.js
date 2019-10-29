import React from "react";
import Popup from "reactjs-popup";
import './login.css'
export default () => (
    <Popup trigger={<button className="buttonLink"> Login </button>} modal>
        {close => (
            <div className="modal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header"> Login </div>
                <form>
                    <label className="ilabel">
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <label className="ilabel">
                        Net ID:
                        <input type="text" name="nid" />
                    </label>
                    <label className="ilabel">
                        Password:
                        <input type="text" name="password" />
                    </label>
                    <button className="login-btn">Login</button>
                </form>
            </div>
        )}
    </Popup>
);