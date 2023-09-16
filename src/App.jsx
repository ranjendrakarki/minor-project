// App.js
import React, {useEffect, useState} from 'react';
import './App.css';
import pusher from "./InitializePusher.jsx";

function App() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const channel = pusher.subscribe('my-channel');

    useEffect(() => {
        channel.bind('my-event', function(data) {
            console.log(JSON.stringify(data));
            const newMessageObj = {
                text: "hello",
                sender: 'User',
            };
            setMessages([...messages, newMessageObj]);
        });

        return () => {
            channel.unbind();
            channel.unsubscribe();
        };
    }, [messages]);
    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const newMessageObj = {
                text: newMessage,
                sender: 'User',
            };
            console.log('hello')


            // Send a 'new-message' event to Pusher
            let a = channel.trigger('client-my-event', newMessageObj);
            console.log(a)
            // channel.bind("my-event", () => {
            //     let triggered = channel.trigger("client-my-event", {
            //         your: "data",
            //     });
            //     console.log("triggered")
            //     console.log(triggered)
            // });

            // Add the message to the local state
            setMessages([...messages, newMessageObj]);
            setNewMessage('');
        }
    };

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    // const handleSendMessage = () => {
    //     if (newMessage.trim() !== '') {
    //         const newMessageObj = {
    //             text: newMessage,
    //             sender: 'User',
    //         };
    //
    //         setMessages([...messages, newMessageObj]);
    //         setNewMessage('');
    //     }
    // };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Chat Application</h1>
                <div className="message-list">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender === 'User' ? 'user' : 'other'}`}>
                            <span className="message-sender">{message.sender}:</span> {message.text}
                        </div>
                    ))}
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={handleMessageChange}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </header>
        </div>
    );
}

export default App;



