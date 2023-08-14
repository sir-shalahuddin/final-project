import { Center, Text } from '@chakra-ui/react'

export default function Error(error) {
    return (
        <>
            <Center h="100%">
                <Text>
                    {error}
                </Text>
            </Center>
        </>
    )
}