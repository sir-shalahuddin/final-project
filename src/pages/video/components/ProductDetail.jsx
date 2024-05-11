import { Spinner, Center, Image, Card, Box, CardBody, CardFooter, Text, Button, ButtonGroup } from '@chakra-ui/react'
import useImageLoad from '../../../hooks/useImageLoad';
import PropTypes from 'prop-types';

export default function ProductDetail({ data }) {
    const imageLoaded = useImageLoad(data.link_product);
    return <>
        <Card
            key={data.product_id}
            backgroundColor='#EEF7FF'
        >
            <CardBody pl={0} pb={0} display="flex" alignItems="center" justifyContent="center">
                <Box px={2} py={0} >
                    {imageLoaded ?
                        <Image maxW={70} src={data.link_product}></Image>
                        :
                        <Center>
                            <Spinner />
                        </Center>
                    }
                </Box>
                <Box direction='column'>
                    <Text noOfLines={1}>
                        {data.title}
                    </Text>
                    <Text as='b'>
                        Rp{data.price}
                    </Text>
                </Box>
            </CardBody>
            <CardFooter>
                <ButtonGroup>
                    <Button size='xs' variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button size='xs' variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
        <br />
    </>;
}

ProductDetail.propTypes = {
    data: PropTypes.shape({
        product_id: PropTypes.string.isRequired,
        link_product: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};