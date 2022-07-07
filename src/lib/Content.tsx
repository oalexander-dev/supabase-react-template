import { Box } from '@welcome-ui/box';
import PropTypes from 'prop-types';

type ContentType = 'center' | 'full';

type Direction = 'row' | 'column';

export interface ContentProps {
    type: ContentType;
    children: PropTypes.ReactNodeLike;
    direction?: Direction;
}

export default function Content(props: ContentProps) {
    return (
        <Box
            display="flex"
            w="100%"
            justifyContent={props.type === 'center' ? 'center' : 'flex-start'}
            alignItems={props.type === 'center' ? 'center' : 'start'}
            flexDirection={props.direction || 'row'}
            marginTop="12px"
        >
            {props.children}
        </Box>
    );
}
