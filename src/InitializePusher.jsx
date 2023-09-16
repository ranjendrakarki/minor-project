// InitializePusher.js

import Pusher from 'pusher-js';

const pusher = new Pusher('4441230b04e72a731e60', {
    cluster: 'ap2'
});

export default pusher;
