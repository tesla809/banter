import React from 'react';
import { Flex, Box } from 'rebass';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Message from '../models/Message';
import { User } from 'radiks';
import Feed from '../components/feed';
import { AppContext } from '../common/context/app-context';
class Home extends React.Component {
  static propTypes = {
    rawMessages: PropTypes.array.isRequired,
  };

  static getInitialProps = async (ctx) => {
    const {
      params: { username },
    } = ctx.req;

    const user = username.replace('::]', '');
    const rawMessages = await Message.fetchList(
      {
        createdBy: user,
        sort: '-createdAt',
        limit: 10,
      },
      { decrypt: false }
    );

    return {
      rawMessages,
    };
  };

  render() {
    const { rawMessages } = this.props;
    return (
      <Flex>
        <Head>
          <title>Banter</title>
        </Head>
        <Box width={[1, 3 / 4]} mx="auto">
          <Feed borderTop={0} hideCompose rawMessages={rawMessages} />
        </Box>
      </Flex>
    );
  }
}

Home.contextType = AppContext;

export default Home;