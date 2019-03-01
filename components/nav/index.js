import React from 'react';
import { Box, Flex, Type } from 'blockstack-ui';
import { Hover } from 'react-powerplug';
import Link from 'next/link';
import { useConnect } from 'redux-bundler-hook';
import { Provider, Popover } from 'reakit';
import theme from 'reakit-theme-default';
import { Avatar } from '../avatar';

const DropdownItem = ({ href, passHref, as, ...rest }) => {
  const WrapperComponent = href ? Link : Box;
  return (
    <Hover>
      {({ hovered, bind }) => (
        <WrapperComponent href={href} as={as} passHref={passHref}>
          <Box
            py={1}
            width={1}
            display="block"
            color="purple"
            is={href ? 'a' : Box}
            opacity={hovered ? 1 : 0.75}
            style={{
              textDecoration: 'none',
            }}
            cursor={hovered ? 'pointer' : 'unset'}
            {...bind}
            textAlign="right"
            {...rest}
          />
        </WrapperComponent>
      )}
    </Hover>
  );
};

export const Logo = ({ width = '28px', height = '28px' }) => (
  <svg
    focusable="false"
    role="img"
    viewBox="0 0 512 512"
    style={{
      width,
      height,
    }}
  >
    <path
      fill="currentColor"
      d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"
    />
  </svg>
);

const Nav = ({ ...rest }) => {
  const { doLogout, cookieUsername: username } = useConnect('doLogout', 'selectCookieUsername');

  return (
    <Provider theme={theme}>
      <Flex
        px={6}
        pt={5}
        pb={2}
        mb={3}
        mx="auto"
        maxWidth={650}
        alignItems="center"
        justifyContent="space-between"
        is="nav"
        {...rest}
      >
        <Hover>
          {({ hovered, bind }) => (
            <Box>
              <Type is="h1" m={0} fontSize="28px" display="inline-block" {...bind}>
                <Link href="/" passHref>
                  <Type
                    is="a"
                    color={hovered ? 'white' : 'purple'}
                    textDecoration="none"
                    transition="0.1s all ease-in-out"
                  >
                    <Logo />
                    <Type display={['none', 'inline-block']} ml={2}>
                      Banter
                    </Type>
                  </Type>
                </Link>
              </Type>
            </Box>
          )}
        </Hover>
        {username ? (
          <Popover.Container
            style={{
              outline: 'none',
            }}
          >
            {(popover) => (
              <Box
                is={Popover.Toggle}
                {...popover}
                style={{
                  outline: 'none',
                }}
              >
                <Hover>
                  {({ hovered, bind }) => (
                    <Box position="relative">
                      <Flex alignItems="center" cursor={hovered ? 'pointer' : 'unset'} {...bind}>
                        <Box
                          title="Your Profile"
                          size={31}
                          is="a"
                          display="block"
                          border="2px solid"
                          borderColor={hovered ? 'white' : 'transparent'}
                          transition="0.1s all ease-in-out"
                          borderRadius="100%"
                        >
                          <Avatar size={27} username={username} />
                        </Box>
                        <Type
                          transition="0.1s all ease-in-out"
                          color={hovered ? 'white' : 'purple'}
                          pl={2}
                          fontWeight={600}
                        >
                          {username}
                        </Type>
                      </Flex>
                      <Popover fade slide expand hideOnClickOutside {...popover}>
                        <Popover.Arrow />
                        <Box minWidth={100} textAlign="right">
                          <DropdownItem
                            href={{
                              pathname: '/user',
                              query: {
                                username,
                              },
                            }}
                            as={`/[::]${username}`}
                            passHref
                          >
                            Profile
                          </DropdownItem>

                          <DropdownItem is="a" href="/settings" passHref>
                            Settings
                          </DropdownItem>
                          <DropdownItem onClick={doLogout}>Log out</DropdownItem>
                        </Box>
                      </Popover>
                    </Box>
                  )}
                </Hover>
              </Box>
            )}
          </Popover.Container>
        ) : null}
      </Flex>
    </Provider>
  );
};
export default Nav;
