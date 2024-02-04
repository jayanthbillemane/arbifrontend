import React, { useRef, useEffect } from 'react';

const VideoStream = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);

    useEffect(() => {
        const setupWebRTC = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;

            // Create a peer connection
            peerConnection.current = new RTCPeerConnection();

            // Add the local stream to the peer connection
            stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

            // Set up event handlers
            peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                // Send the ICE candidate to the server (via WebSocket)
                sendToServer({ type: 'ice-candidate', candidate: event.candidate });
            }
            };

            peerConnection.current.onnegotiationneeded = async () => {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            // Send the offer to the server (via WebSocket)
            sendToServer({ type: 'offer', offer: peerConnection.current.localDescription });
            };

            peerConnection.current.ontrack = (event) => {
            // Attach the remote stream to the remote video element
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
            };
        } catch (error) {
            console.error('Error setting up WebRTC:', error);
        }
        };

        const sendToServer = (data) => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws');

        socket.onopen = () => {
            socket.send(JSON.stringify(data));
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
        };

        setupWebRTC();

        return () => {
        // Clean up resources (close the peer connection, etc.) when the component is unmounted
        if (peerConnection.current) {
            peerConnection.current.close();
        }
        };
    }, []);

    return (
        <div>
        <video ref={localVideoRef} autoPlay muted playsInline />
        <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
    );
    };

export default VideoStream;
