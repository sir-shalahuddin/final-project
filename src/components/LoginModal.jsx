import {
    useColorModeValue,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Alert,
    AlertTitle,
    AlertIcon
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import fetchUserData from '../services/User';
import PropTypes from 'prop-types';

export default function LoginModal({ isOpen, onClose }) {

    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const initialRef = useRef(null)

    async function loginService({ email, password }) {
        try {
            const response = await fetch(import.meta.env.VITE_HOST + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json()
                const newToken = data.token
                const user = await fetchUserData(newToken);
                login(user, newToken);
                onClose();
            }
            else {
                const data = await response.json()
                return data.message;

            }
        } catch (error) {
            console.error("Error during login:", error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = await loginService(form);
        setErrorMessage(error)

    }

    const handleForm = e => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value })
    }

    const handleCloseModal = () => {
        onClose()
        setErrorMessage(null)
    }


    return (
        <>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={handleCloseModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login First</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                                <FormControl value={form.email} onChange={handleForm} id="email">
                                    <FormLabel >Email address</FormLabel>
                                    <Input ref={initialRef} type="email" />
                                </FormControl>
                                <FormControl value={form.password} onChange={handleForm} id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                handleSubmit(e);
                                            }
                                        }} />
                                </FormControl>
                                {errorMessage &&
                                    <Alert status='error'>
                                        <AlertIcon />
                                        <AlertTitle>{errorMessage}</AlertTitle>
                                    </Alert>
                                }
                                <Button
                                    onClick={handleSubmit}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};