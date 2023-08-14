import { useState, useRef } from 'react';
import {
    Spinner,
    Avatar,
    AvatarBadge,
    Box,
    Text
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

import { EditIcon } from '@chakra-ui/icons'

const ImageUpload = () => {
    const { setIsPictureChange, user, token } = useAuth();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);



    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            // setSelectedFile(file);

            const formData = new FormData();
            formData.append('file', file);
            setIsUploading(true);

            try {
                const response = await fetch(import.meta.env.VITE_HOST + '/users/profile-pictures', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    setIsPictureChange(true);
                } else {
                    console.error('Upload failed');
                }
            } catch (error) {
                console.error('Error uploading image', error);
            } finally {
                setIsUploading(false); // Finish the upload process
            }
        }
    };


    return (
        <Box py={5}>
            {isUploading ?
                <Spinner color="blue.500" mt={2} />
                :
                <Avatar
                    size="xl"
                    src={user?.data?.url_profile_picture}
                    onClick={handleAvatarClick}
                >
                    <AvatarBadge borderWidth={0} boxSize='0.8em' bgColor="gray.500">
                        <EditIcon w={4} h={4}></EditIcon>
                    </AvatarBadge>
                </Avatar>
            }
            <Text>Halo, {user?.data?.username}</Text>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
        </Box>
    );
};

export default ImageUpload;
