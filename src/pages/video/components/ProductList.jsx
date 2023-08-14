import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import ProductDetail from './ProductDetail';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

export default function ProductList() {
    const { id } = useParams()
    const { data, loading, error } = useFetch(import.meta.env.VITE_HOST + '/videos/' + id + '/products');
    return (
        <>
            <Card textAlign="left" flex={1}>
                <CardHeader>
                    <Text>Produk</Text>
                </CardHeader>
                <CardBody
                    overflowY='scroll'
                >

                    {data &&
                        data.data.map((data) => (
                            <ProductDetail key={data.product_id} data={data} />
                        ))}
                    {loading && <Loading />}
                    {error && <Error />}
                </CardBody>
            </Card>
        </>
    )
}



