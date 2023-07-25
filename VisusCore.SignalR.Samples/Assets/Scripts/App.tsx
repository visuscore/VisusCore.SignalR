import React from "react";
import ReactDOM from "react-dom";
import { Chat } from "./ChatComponent";

function App() {
    return (
        <div>
            <h3>SignalR Sample App</h3>
            <Chat />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("signalr-sample-app"));
