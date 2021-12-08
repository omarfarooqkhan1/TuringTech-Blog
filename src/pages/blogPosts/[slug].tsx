import React from 'react';
import Skeleton from 'components/Skeleton';
import styled from 'styled-components';
import { Avatar, Image, Typography, Space, Col, Divider } from 'antd';
const { Title, Text } = Typography;
import { createClient } from 'contentful';

const Container = styled.div`
  display: flex;
  padding: 0 50px;
  justifycontent: center;
  flexdirection: column;
`;

const Section = styled.div`
  display: flex;
  align-items: center';
`;

const ImageSection = styled(Section)`
  justify-content: center;
`;

const StyledDivider = styled(Divider)`
  border-color: lightgrey;
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const AuthorDetails = styled(Col)`
  display: flex;
  flex-direction: column;
  right: 10;
`;

const client = createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const response = await client.getEntries({
    content_type: 'blogPost',
  });

  const paths = response.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
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
      blogPost: items[0],
    },
    revalidate: 1,
  };
}

function BlogPost({ blogPost }) {
  if (!blogPost) {
    return <Skeleton />;
  }

  const { title, thumbnail, shortDescription, body, category, author } = blogPost.fields;

  return (
    <Container>
      <Space direction="vertical">
        <ImageSection className="thumbnail">
          <Image
            alt="Thumbnail of the blog post"
            src={'https:' + thumbnail.fields.file.url}
            preview={false}
          />
        </ImageSection>
        <Section className="category">
          <StyledCol span={6} offset={2}>
            <Title level={4} style={{ marginTop: 20, marginLeft: 7, color: '#01696E' }}>
              {category.fields.title.toUpperCase()}
            </Title>
          </StyledCol>
        </Section>
        <Section className="title">
          <StyledCol span={22} offset={2}>
            <Title level={1} style={{ marginLeft: 7 }}>
              {title}
            </Title>
          </StyledCol>
        </Section>
        <Section className="shortDescription">
          <StyledCol span={22} offset={2}>
            <Title level={5} style={{ marginLeft: 7, color: 'grey', fontStyle: 'italic' }}>
              {shortDescription}
            </Title>
          </StyledCol>
        </Section>
        <Section className="author-details">
          <StyledCol span={2} offset={2}>
            <Avatar size={60} src={author.fields.profilePicture.fields.file.url} />
          </StyledCol>
          <AuthorDetails span={20}>
            <Title level={5}>{author.fields.authorName}</Title>
            <Text style={{ color: 'grey' }}>{author.fields.shortIntro}</Text>
          </AuthorDetails>
        </Section>
        <Section className="divider">
          <StyledCol span={20} offset={2}>
            <StyledDivider />
          </StyledCol>
        </Section>
        <Section className="post-body">
          <StyledCol span={20} offset={2}>
            <Text style={{ marginLeft: 7 }}>{body}</Text>
          </StyledCol>
        </Section>
      </Space>
    </Container>
  );
}

export default BlogPost;
