import PropTypes from 'prop-types';

export interface ProtectedPageProps {
    loggedIn: boolean;
    children: PropTypes.ReactNodeLike;
}

export default function ProtectedPage(props: ProtectedPageProps) {
    if (props.loggedIn) {
        return <>{props.children}</>;
    }

    return <></>;
}
