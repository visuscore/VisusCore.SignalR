import React, { Component, Fragment } from "react";
import * as signalR from "@microsoft/signalr";
import * as signalRMsgPack from "@microsoft/signalr-protocol-msgpack";

interface PageProps { }

interface PageState {
    user: string;
    message: string;
    messages: string[];
    hubConnection?: signalR.HubConnection;
    connected: boolean;
    sending: boolean;
    lastError: string;
}

export class Chat extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            user: "",
            message: "",
            messages: [],
            hubConnection: null,
            connected: false,
            sending: false,
            lastError: null,
        };
    }

    componentDidMount() {
        let messages = [...this.state.messages];

        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub", signalR.HttpTransportType.WebSockets)
            .configureLogging(signalR.LogLevel.Trace)
            .withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
            .withAutomaticReconnect()
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection.on("broadcastMessage", (user, message) => {
                const encodedMsg = `${user}: ${message}`;
                messages.push(encodedMsg);
                this.setState({
                    messages
                });
            });

            const tryConnect = () => {
                this.state.hubConnection
                    .start()
                    .then(() => this.setState({ connected: true }))
                    .catch(error => {
                        this.setState({ lastError: error.toString() });
                        setTimeout(() => tryConnect(), 5000);
                    });
            };

            tryConnect();
        });
    }

    sendMessage() {
        this.setState({ sending: true })
        this.state.hubConnection
            .invoke("SendAsync", this.state.user, this.state.message)
            .then(() => this.setState({ lastError: null, sending: false }))
            .catch(error => this.setState({ lastError: error.toString(), sending: false }));
    }

    render() {
        return (
            <Fragment>
                <div>
                    <fieldset>
                        <legend>User</legend>
                        <input onChange={event => this.setState({ user: event.target.value })} />
                    </fieldset>
                    <fieldset>
                        <legend>Message</legend>
                        <input onChange={event => this.setState({ message: event.target.value })} />
                    </fieldset>
                    <button id="sendButton" onClick={() => this.sendMessage()} disabled={!this.state.connected || this.state.sending}>
                        Send
                    </button>
                </div>
                {!this.state.lastError && (<div>

                    <div>Received messages</div>
                    <div>
                        {this.state.messages.map((message, index) => (
                            <div key={index}>
                                {" "}
                                {message}{" "}
                            </div>
                        ))}
                    </div>
                </div>)}
                {this.state.lastError && (<div>

                    <div>Error</div>
                    <div>
                        {this.state.lastError}
                    </div>
                </div>)}
            </Fragment>
        );
    }
}
