import { Text } from '@welcome-ui/text';

import Content from '../lib/Content';

export interface HomePageProps {}

export default function HomePage(props: HomePageProps) {
    return (
        <Content type="center">
            <Text variant="h3">Home Page</Text>
        </Content>
    );
}
