import { Text } from '@welcome-ui/text';
import { useEffect, useState } from 'react';

import Content from '../lib/Content';
import { sb } from '../lib/api';

export interface AccountPageProps {}

export default function AccountPage(props: AccountPageProps) {
    const [email, setEmail] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);

    useEffect(() => {
        const user = sb.auth.user();

        if (!user) {
            return;
        }

        sb.from('employees')
            .select('first_name,last_name')
            .eq('id', user?.id)
            .then((res) => {
                if (res.data) {
                    setFirstName(res.data[0].first_name || null);
                    setLastName(res.data[0].last_name || null);
                    setEmail(user.email || null);
                }
            });
    }, []);

    return (
        <Content type="center" direction="column">
            <Text variant="h3">Account Page</Text>
            <Text variant="h5">
                {firstName} {lastName} ({email})
            </Text>
        </Content>
    );
}
