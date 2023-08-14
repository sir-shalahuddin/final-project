import { Box, AspectRatio } from '@chakra-ui/react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

export default function EmbedVideo() {
    const { id } = useParams()
    const { data, loading, error } = useFetch(import.meta.env.VITE_HOST + '/videos/' + id)

    return (
        <>
            <Box bgColor="grey" flex={3}>
                {data &&
                    <AspectRatio h="100%">
                        <iframe
                            title='naruto'
                            src={data.data.video_src}
                            allowFullScreen />
                    </AspectRatio>}
                {loading && <Loading />}
                {error && <Error />}
            </Box>
        </>
    )
}