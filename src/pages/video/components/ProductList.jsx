import { Box, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

export default function ProductList() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(import.meta.env.VITE_HOST + '/videos/' + id + '/products');

    return (
        <>
            <Card textAlign="left" flex={1} bgColor='#7AB2B2' >
                <CardHeader bgColor='#4D869C' borderTopLeftRadius="8" borderTopRightRadius="8" >
                    <Heading size='sm'>Produk</Heading>
                </CardHeader>
                <CardBody overflowX={{ md: 'none', sm: 'scroll' }} pb={0}>
                    <Box
                        display='flex'
                        flexDirection={{ md: 'column' }}
                    >
                        {data &&
                            data.data.map((data) => (
                                <Box minW={180} mx={{ md: 0, sm: 2 }} >
                                    <ProductDetail key={data.product_id} data={data} />
                                </Box>
                            ))}
                        {loading && <Loading />}
                        {error && <Error />}
                    </Box>
                </CardBody>
            </Card>
        </>
    );
}
