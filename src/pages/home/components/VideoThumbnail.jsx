import { Box, Card, Center, Spinner, Image, Text, Tag } from '@chakra-ui/react';
import useImageLoad from '../../../hooks/useImageLoad';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function VideoThumbnail({ data, live }) {
    
    const imageLoaded = useImageLoad(data.url_image_thumbnail);

    if (!imageLoaded) return (
        <>
            <Center h={300} w={150}>
                <Spinner />
            </Center>
        </>
    )

    return (
        <>
            <Link to={'/videos/' + data.video_id}>
                <Card
                    h={[225, 280, 285, 290, 295, 300]}
                    w={[125, 155, 160, 165, 170, 175]}>
                    <Image
                        objectFit="cover"
                        src={data.url_image_thumbnail}
                        alt={data.video_id}
                        borderRadius='lg'
                        width="100%"
                        height="100%"
                    />
                    <Tag variant="solid" colorScheme="red" position="absolute" top={1} left={1}>{live ? 'Live' : 'Upcoming'}</Tag>
                    <Box

                        position="absolute"
                        bottom={1}
                        left={1}>
                        <Text
                            noOfLines={2}
                            fontSize={[12, 14]}
                            textAlign="left"
                            color="white">
                            {data.description}
                        </Text>
                        <Text
                            fontSize={[10, 12]}
                            textAlign="left"
                            color="gray.400">
                            {data.seller}
                        </Text>
                    </Box>
                </Card >
            </Link>
        </>
    )

}

VideoThumbnail.propTypes = {
    data: PropTypes.shape({
        url_image_thumbnail: PropTypes.string.isRequired,
        video_id: PropTypes.string.isRequired,
        description: PropTypes.string,
        seller: PropTypes.string.isRequired,
    }).isRequired,
    live: PropTypes.bool.isRequired,
};
