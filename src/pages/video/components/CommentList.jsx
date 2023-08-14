import {
    Box,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text
} from '@chakra-ui/react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext'
import ChatForm from './ChatForm';
import generateRandomString from '../../../services/RandomString';

export default function CommentList() {
    const { id } = useParams()
    const { data, setData, loading, error } = useFetch(import.meta.env.VITE_HOST + '/videos/' + id + '/comments');
    const [message, setMessage] = useState("")
    const { user, isLoggedIn } = useAuth();
    const [socket, setSocket] = useState(null);
    const latestMessageRef = useRef(null);


    const handleSubmit = () => {
        if (!socket || !message.trim()) {
            return;
        }
        const newComment = { video_id: id, username: user.data.username, comment: message };
        socket.send(JSON.stringify(newComment));
        setMessage('');
    };


    useEffect(() => {
        const newSocket = new WebSocket(import.meta.env.VITE_WS_HOST + '/comments-ws');

        newSocket.onopen = () => {
            setSocket(newSocket);
        };

        newSocket.onmessage = (message) => {
            try {
                JSON.parse(message.data)
            } catch (err) {
                console.error('WebSocket error:', err.error);
            }
        };

        newSocket.onclose = () => {
            setSocket(null);
        };

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleSocketMessage = (event) => {
            const newComment = JSON.parse(event.data);
            setData((prevData) => ({ ...prevData, data: [...prevData.data, newComment] }));
        };

        socket.addEventListener('message', handleSocketMessage);

        return () => {
            socket.removeEventListener('message', handleSocketMessage);
        };
    }, [socket]);

    useEffect(() => {
        if (latestMessageRef.current) {
            latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [data]);

    return (
        <>
            <Card textAlign="left" flex={1}>
                <CardHeader>
                    <Text>Komentar Teratas</Text>
                </CardHeader>
                <CardBody
                    overflowY='scroll'
                >
                    {data && data.data.map((comment, index) => (
                        <Box pb={2} key={comment.id ? comment.id : generateRandomString(10)}>
                            <Text>{comment.username}</Text>
                            <Text>{comment.comment}</Text>
                            {index === data.data.length - 1 && <div ref={latestMessageRef} />}
                        </Box>
                    ))}
                    {loading && <Loading />}
                    {error && <Error />}
                </CardBody>
                <CardFooter>
                    {isLoggedIn ?
                        <ChatForm message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
                        :
                        <Text color="gray.500">Please Log In First</Text>
                    }
                </CardFooter>
            </Card>
        </>
    )
}


