import React from 'react';
import Skeleton from 'components/Skeleton';
import styled from 'styled-components';
import { Image, Typography, Space, Col } from 'antd';
const { Title } = Typography;
import { createClient } from 'contentful';

const Container = styled.div`
  display: flex;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  align-items: center';
`;

const ImageSection = styled(Section)`
  justify-content: center;
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const client = createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const response = await client.getEntries({
    content_type: 'author',
  });

  const paths = response.items.map((item: any) => {
    return {
      params: { slug: item.fields.username },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'author',
    'fields.username': params.slug,
  });

  if (items.length === 0) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      author: items[0],
    },
    revalidate: 1,
  };
}

function Author({ author }) {
  if (!author) {
    return <Skeleton />;
  }

  const { authorName, shortIntro, profilePicture } = author.fields;

  return (
    <Container>
      <Space direction="vertical">
        <ImageSection className="profilePicture">
          <Image
            alt="Profile Picture"
            src={'https:' + profilePicture.fields.file.url}
            preview={false}
          />
        </ImageSection>
        <Section className="authorName">
          <StyledCol span={22} offset={2}>
            <Title level={1} style={{ marginLeft: 7 }}>
              {authorName}
            </Title>
          </StyledCol>
        </Section>
        <Section className="shortIntro">
          <StyledCol span={22} offset={2}>
            <Title level={5} style={{ marginLeft: 7, color: 'grey', fontStyle: 'italic' }}>
              {shortIntro}
            </Title>
          </StyledCol>
        </Section>
      </Space>
    </Container>
  );
}

export default Author;
