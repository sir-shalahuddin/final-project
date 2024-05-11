import { Flex } from '@chakra-ui/react'
import ProductList from './components/ProductList'
import EmbedVideo from './components/EmbedVideo'
import CommentList from './components/CommentList'

export default function VideoDetail() {
    return (
        <>
            <Flex mt={4} gap={2} h={450} flexDirection={{ base: 'column', md: 'row' }}>
                <ProductList />
                <EmbedVideo />
                <CommentList />
            </Flex >
        </>
    )

}



