import { Card } from '@welcome-ui/card';
import { Text } from '@welcome-ui/text';

import Content from '../lib/Content';

export default function VerifyEmailPage() {
    return (
        <Content type="center" direction="column">
            <Card minWidth={400}>
                <Card.Body>
                    <Text variant="h4">Welcome to APP_NAME!</Text>
                    <Text variant="body1">
                        Check your inbox for a link to verify your email.
                    </Text>
                </Card.Body>
            </Card>
        </Content>
    );
}
