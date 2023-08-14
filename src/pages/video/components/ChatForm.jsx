import { HStack, Textarea, IconButton } from '@chakra-ui/react'
import { MdSend } from 'react-icons/md';
import PropTypes from 'prop-types';

export default function ChatForm({ message, setMessage, handleSubmit }) {
    return <HStack py={2} borderTop="1px solid" borderColor="gray.200">
        <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                }
            }}
            resize="none"
            overflowY="auto"
            maxHeight="100px" />
        <IconButton
            aria-label="Send"
            icon={<MdSend />}
            onClick={handleSubmit}
            colorScheme="blue" />
    </HStack>;
}

ChatForm.propTypes = {
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};