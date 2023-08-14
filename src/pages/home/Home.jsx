import {
    Input,
    Center,
    SimpleGrid,
    Wrap,
    Button
} from '@chakra-ui/react'
import VideoThumbnail from './components/VideoThumbnail'
import useFetch from '../../hooks/useFetch';
import Error from '../../components/Error';
import { useState } from 'react';

export default function Home() {
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState('');

    const queryString = `${category ? '&category=' + category : ''}${query ? '&q=' + query : ''}`;
    const { data, error } = useFetch(`${import.meta.env.VITE_HOST}/videos?${queryString}`);
    const handleCategory = (event) => {
        if (event.target.value === '0') {
            setCategory('');
        }
        else {
            setCategory(event.target.value);
        }

    }

    const handleQuery = (event) => {
        setTimeout(() => {
            setQuery(event.target.value);
        }, 300);

    }


    return (
        <>
            <Input my={[1, 2, 4]} placeholder='Search' onChange={handleQuery} />
            {!query &&
                <Wrap display="flex" justifyContent="center" alignItems="center" pb={[1, 2, 4]} spacing={1}>
                    {['All', 'Live', 'Explore', 'Promo', 'Official Store', 'Tips & Rekomendasi', 'Terbaru', 'Upcoming'].map((key, i) => (
                        <Button
                            px={[2, 4]}
                            py={[1, 3]}
                            size={['xs', 'sm', 'md']}
                            fontSize={[8, 10, 12]}
                            borderRadius={[10, 15]}
                            key={i}
                            value={i}
                            variant='outline'
                            colorScheme='teal'
                            onClick={handleCategory}>
                            {key}
                        </Button>
                    ))}
                </Wrap>}

            {data &&
                <Center>
                    <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={4}>
                        {data?.data?.map((data) =>
                            <VideoThumbnail
                                key={data.video_id}
                                data={data}
                                live={category === '7' ? false : true}
                            />)}
                    </SimpleGrid>
                </Center >
            }
            {error && <Error error={error} />}

        </>
    )
} 