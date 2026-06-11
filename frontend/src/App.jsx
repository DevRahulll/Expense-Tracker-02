import React from "react";

function App() {
    return (
        <div>
            <button className="btn btn-secondary">Start</button>
            <div className="">
                <div className="avatar-group -space-x-6">
                    <div className="avatar">
                        <div className="w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller"
                />
                <div className="navbar bg-base-100 shadow-sm">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
            </div>
        </div>
    );
}

export default App;
