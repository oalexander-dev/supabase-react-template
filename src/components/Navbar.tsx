import { Button } from '@welcome-ui/button';
import { ButtonGroup } from '@welcome-ui/button-group';
import { DropdownMenu, useDropdownMenuState } from '@welcome-ui/dropdown-menu';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sb } from '../lib/api';
import urls from '../lib/urls';
import Loading from './Loading';

export interface NavbarProps {
    loggedIn: boolean;
}

const pages = [
    {
        title: 'Home',
        url: urls.homeUrl
    }
];

export default function Navbar(props: NavbarProps) {
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const actionsMenuState = useDropdownMenuState({ gutter: 10 });

    const handleActionClick = (e: MouseEvent) => {
        actionsMenuState.hide();

        if (e.currentTarget.id === 'profile') {
            navigate(urls.accountUrl);
        }
    };

    const handleLogout = () => {
        actionsMenuState.hide();

        setLogoutLoading(true);

        sb.auth
            .signOut()
            .then(() => {
                setLogoutLoading(false);
                navigate(urls.loginUrl);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Flex
                direction="row"
                justify="space-between"
                align="center"
                w="calc(100vw - 32px)"
                marginLeft={16}
                marginRight={16}
            >
                <Flex
                    direction="row"
                    justify="space-between"
                    align="center"
                    wrap="nowrap"
                >
                    <Text variant="h3" marginRight={{ xs: 24, sm: 56 }}>
                        Logo
                    </Text>
                    {props.loggedIn ? (
                        pages.map((page) => (
                            <Button
                                key={page.title}
                                variant="quaternary"
                                onClick={() => navigate(page.url)}
                            >
                                {page.title}
                            </Button>
                        ))
                    ) : (
                        <></>
                    )}
                </Flex>
                {props.loggedIn ? (
                    <DropdownMenu.Trigger {...actionsMenuState} as={Button}>
                        Account
                    </DropdownMenu.Trigger>
                ) : (
                    <ButtonGroup>
                        <Button
                            variant="tertiary"
                            onClick={() => navigate(urls.loginUrl)}
                        >
                            Login
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(urls.registerUrl)}
                        >
                            Register
                        </Button>
                    </ButtonGroup>
                )}
            </Flex>
            <DropdownMenu {...actionsMenuState} aria-label="Account actions">
                <DropdownMenu.Item
                    {...actionsMenuState}
                    onClick={handleActionClick}
                    id="profile"
                >
                    View Profile
                </DropdownMenu.Item>
                <DropdownMenu.Separator {...actionsMenuState} />
                <DropdownMenu.Item {...actionsMenuState} onClick={handleLogout}>
                    Logout
                </DropdownMenu.Item>
            </DropdownMenu>
            <Loading loading={logoutLoading} />
        </>
    );
}
