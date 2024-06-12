import React, { useState } from 'react';
import axios from 'axios';

const GestureControl = () => {
    const [gestures, setGestures] = useState([]);
    const [isDetecting, setIsDetecting] = useState(false);

    const startDetection = async () => {
        if (isDetecting) return;
        try {
            await axios.post('http://localhost:5000/start');
            setIsDetecting(true);
        } catch (error) {
            console.error('Error starting detection:', error);
        }
    };

    const stopDetection = async () => {
        if (!isDetecting) return;
        try {
            await axios.post('http://localhost:5000/stop');
            setIsDetecting(false);
        } catch (error) {
            console.error('Error stopping detection:', error);
        }
    };

    const fetchGestures = async () => {
        try {
            const response = await axios.get('http://localhost:5000/gestures');
            setGestures(response.data.gestures);
        } catch (error) {
            console.error('Error fetching gestures:', error);
        }
    };

    const speakGestures = async () => {
        try {
            await axios.post('http://localhost:5000/speak');
        } catch (error) {
            console.error('Error speaking gestures:', error);
        }
    };

    const resetDetection = async () => {
        setGestures([]); // Clear the fetched gestures
        setIsDetecting(false); // Stop detection if running
    };

    return (
        <div>
            <button onClick={startDetection}>Start Detection</button>
            <button onClick={stopDetection}>Stop Detection</button>
            <button onClick={fetchGestures}>Fetch Gestures</button>
            <button onClick={speakGestures}>Speak Gestures</button>
            <button onClick={resetDetection}>Reset</button>
            <ul>
                {gestures.map((gesture, index) => (
                    <li key={index}>{gesture}</li>
                ))}
            </ul>
        </div>
    );
};

export default GestureControl;
