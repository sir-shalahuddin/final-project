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
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Alert,
    AlertTitle,
    AlertIcon,
    Center,
    Flex
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types';


export default function RegisterModal({ isOpenRegister, onCloseRegister, isOpenAlert, onOpenAlert, onCloseAlert, onOpenLogin }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const initialRef = useRef(null)

    async function registerService({ email, password, username }) {
        try {
            const response = await fetch(import.meta.env.VITE_HOST + '/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            });

            if (response.ok) {
                setForm({
                    email: "",
                    password: "",
                    username: ""
                })
                onCloseRegister();
                onOpenAlert();
            }
            else {
                const data = await response.json()
                return data.message;

            }
        } catch (error) {
            return error;
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = await registerService(form);
        setErrorMessage(error)
    }

    const handleForm = e => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value })
    }

    const handleCloseModal = () => {
        onCloseRegister()
        setErrorMessage(null)
    }


    return (
        <>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpenRegister}
                onClose={handleCloseModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up First</ModalHeader>
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
                                <FormControl value={form.username} onChange={handleForm} id="username">
                                    <FormLabel >Username</FormLabel>
                                    <Input type="text" />
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
                                    Sign up
                                </Button>
                            </Stack>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isOpenAlert}
                onClose={onCloseAlert}
            >
                <ModalContent>
                    <ModalHeader>Sign Up Succes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center py={10}>
                            <CheckCircleIcon color="green" boxSize={10} />
                        </Center>

                    </ModalBody>
                    <ModalFooter >
                        <Flex justifyContent="center">
                            <Button
                                onClick={() => {
                                    onCloseAlert();
                                    onOpenLogin();
                                }}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Please Login First
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

RegisterModal.propTypes = {
    isOpenRegister: PropTypes.bool.isRequired,
    onCloseRegister: PropTypes.func.isRequired,
    isOpenAlert: PropTypes.bool.isRequired,
    onOpenAlert: PropTypes.func.isRequired,
    onCloseAlert: PropTypes.func.isRequired,
    onOpenLogin: PropTypes.func.isRequired,
};
