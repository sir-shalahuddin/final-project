import { Spinner, Center, Image, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import useImageLoad from '../../../hooks/useImageLoad';
import PropTypes from 'prop-types';

export default function ProductDetail({ data }) {
    const imageLoaded = useImageLoad(data.link_product);
    return <>
        <Card
            key={data.product_id}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
        >
            <CardHeader
                maxW={70}
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {imageLoaded ?
                    <Image src={data.link_product}></Image>
                    :
                    <Center>
                        <Spinner />
                    </Center>
                }

            </CardHeader>
            <CardBody
                pl={0}
            >
                <Text noOfLines={1}>
                    {data.title}
                </Text>
                <Text>
                    Rp {data.price}
                </Text>
            </CardBody>
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