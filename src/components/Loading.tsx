import { Loader } from '@welcome-ui/loader';

export interface LoadingProps {
    loading: boolean;
}

export default function Loading(props: LoadingProps) {
    if (props.loading) {
        return (
            <Loader
                color="primary.500"
                size="lg"
                position="absolute"
                bottom={16}
                left="50%"
                transform="translateX(-50%)"
            />
        );
    }

    return <></>;
}
