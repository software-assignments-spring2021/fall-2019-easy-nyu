import React from "react";
import Popup from "reactjs-popup";
import './signup.css'
export default () => (
    <Popup trigger={<button className="buttonLink"> Create Account </button>} modal>
        {close => (
            <div className="modal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header"> Create Account </div>
                <form>
                    <label className="ilabel">
                        Name:
                        <input type="text" name="name" />
                    </label>
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
                    <label className="ilabel">
                        Confirm Password:
                        <input type="text" name="password2" />
                    </label>
                    <button className="signup-btn">Create Account</button>
                </form>
            </div>
        )}
    </Popup>
);