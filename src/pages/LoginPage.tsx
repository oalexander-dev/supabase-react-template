import { Button } from '@welcome-ui/button';
import { Card } from '@welcome-ui/card';
import { Field } from '@welcome-ui/field';
import { EyeIcon } from '@welcome-ui/icons.eye';
import { HideIcon } from '@welcome-ui/icons.hide';
import { InputText } from '@welcome-ui/input-text';
import { Text } from '@welcome-ui/text';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../components/Loading';
import Content from '../lib/Content';
import { sb } from '../lib/api';
import urls from '../lib/urls';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        sb.auth
            .signIn({
                email,
                password
            })
            .then((res) => {
                setLoading(false);

                if (res.error) {
                    setError(res.error.message);
                    return;
                }

                if (res.user && res.session) {
                    // login was successful
                    navigate(urls.homeUrl);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Content type="center">
            <Card w={400}>
                <Card.Body>
                    <Text variant="h4" textAlign="center">
                        Login
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <Field label="Email" required>
                            <InputText
                                placeholder="example@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </Field>
                        <Field label="Password" marginTop={24} required>
                            <InputText
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                iconPlacement="right"
                                icon={
                                    <Button
                                        shape="circle"
                                        size="sm"
                                        variant="quaternary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <HideIcon size="lg" />
                                        ) : (
                                            <EyeIcon size="lg" />
                                        )}
                                    </Button>
                                }
                            />
                        </Field>
                        <Button
                            type="submit"
                            disabled={loading}
                            w="100%"
                            marginTop={32}
                        >
                            Login
                        </Button>
                        {error ? (
                            <Text
                                variant="body3"
                                color="danger.500"
                                textAlign="center"
                                marginTop={24}
                            >
                                {error}
                            </Text>
                        ) : (
                            <></>
                        )}
                    </form>
                </Card.Body>
            </Card>
            <Loading loading={loading} />
        </Content>
    );
}
