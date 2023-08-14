import {
    Avatar,
    Box,
    Flex,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'
import ImageUpload from './UploadImage'
import { Link } from 'react-router-dom'
import RegisterModal from './RegisterModal'

export default function Navbar() {
    const { user, isLoggedIn, logout } = useAuth();
    
    const {
        isOpen: isOpenRegister,
        onOpen: onOpenRegister,
        onClose: onCloseRegister
    } = useDisclosure();
    const {
        isOpen: isOpenAlert,
        onOpen: onOpenAlert,
        onClose: onCloseAlert
    } = useDisclosure();
    const {
        isOpen: isOpenLogin,
        onOpen: onOpenLogin,
        onClose: onCloseLogin
    } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Link to="/">
                        <Box>Tokopedia Play</Box>
                    </Link>
                    <Flex alignItems={'center'}>
                        {isLoggedIn ? (
                            <Menu>
                                <Text px={4}>
                                    {user?.data?.username}
                                </Text>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            user?.data?.url_profile_picture
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <ImageUpload />
                                    <MenuItem onClick={logout}>
                                        Log Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <>
                                <Button onClick={onOpenLogin}>Log In</Button>
                                <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
                                <Button onClick={onOpenRegister}>Sign up</Button>
                                <RegisterModal
                                    isOpenRegister={isOpenRegister}
                                    onCloseRegister={onCloseRegister}
                                    isOpenAlert={isOpenAlert}
                                    onOpenAlert={onOpenAlert}
                                    onCloseAlert={onCloseAlert}
                                    onOpenLogin={onOpenLogin}
                                />
                            </>
                        )}


                    </Flex>
                </Flex>
            </Box>
        </>
    )
}