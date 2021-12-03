import React from 'react';
import { Avatar, Image, Typography, Space, Col, Divider } from 'antd';
const { Title, Text } = Typography;
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const response = await client.getEntries({
    content_type: 'blogPost',
  });

  const paths = response.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
  });

  return {
    props: {
      blogPost: items[0],
      revalidate: 1,
    },
  };
}

function BlogPost({ blogPost }) {
  const { title, thumbnail, shortDescription, body, category, author } = blogPost.fields;
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        padding: '0 50px',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Space direction="vertical">
        <div
          className="thumbnail"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            alt="Thumbnail of the blog post"
            src={'https:' + thumbnail.fields.file.url}
            preview={false}
          />
        </div>
        <div className="category" style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={6} offset={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={4} style={{ marginTop: 20, marginLeft: 7, color: '#01696E' }}>
              {category.fields.title.toUpperCase()}
            </Title>
          </Col>
        </div>
        <div className="title" style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={22} offset={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={1} style={{ marginLeft: 7 }}>
              {title}
            </Title>
          </Col>
        </div>
        <div className="shortDescription" style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={22} offset={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={5} style={{ marginLeft: 7, color: 'grey', fontStyle: 'italic' }}>
              {shortDescription}
            </Title>
          </Col>
        </div>
        <div className="author-details" style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={2} offset={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size={60} src={author.fields.profilePicture.fields.file.url} />
          </Col>
          <Col span={20} style={{ display: 'flex', flexDirection: 'column', right: 10 }}>
            <Title level={5}>{author.fields.authorName}</Title>
            <Text style={{ color: 'grey' }}>{author.fields.shortIntro}</Text>
          </Col>
        </div>
        <div className="divider" style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={20} offset={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Divider style={{ borderColor: 'lightgrey' }} />
          </Col>
        </div>
        <div className="post-body" style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={20} offset={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Text style={{ marginLeft: 7 }}>{body}</Text>
          </Col>
        </div>
      </Space>
    </div>
  );
}

export default BlogPost;
