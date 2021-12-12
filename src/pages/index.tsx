import React from 'react';
import { Typography, Row, List, Col, Divider, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { createClient } from 'contentful';
import PostCard from '../components/PostCard';
import styled from 'styled-components';

const Centered = styled(Row)`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const LeftHeading = styled(Centered)`
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
`;

const client = createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
});

export async function getStaticProps() {
  const response = await client.getEntries({
    content_type: 'blogPost',
  });

  const categories = await client.getEntries({
    content_type: 'category',
  });

  return {
    props: {
      blogPosts: response.items,
      categories: categories.items
    },
    revalidate: 1,
  };
}

function BlogPosts({ blogPosts, categories }) {
  const [posts, setPosts] = React.useState(blogPosts);
  
  const filterPosts = (searchTerm: string) => {
    if(!searchTerm) {
      setPosts(blogPosts);
    } else {
      setPosts(blogPosts.filter(blogPost => blogPost.fields.title.toLowerCase().includes(searchTerm)));
    }
  }

  const filterByCategory = (categoryName: string) => {
    if(categoryName === 'All') {
      setPosts(blogPosts);
    } else {
      setPosts(blogPosts.filter(blogPost => blogPost.fields.category.fields.title === categoryName));
    }
  }

  return (
    <>
      <Centered>
        <Title level={2}>Latest Blog Posts</Title>
      </Centered>
      <Section>
        <PostCard key={blogPosts[0].sys.id} blogPost={blogPosts[0]} />
      </Section>
      <Divider />
      <LeftHeading>
        <Col>
          <Title level={2}>Browse Blogs by Category</Title>
          <Text>Want to go deeper? Click on a category below for detailed results.</Text>
          <br/>
          <br/>
          <Space>
            <Button type="primary" onClick={() => filterByCategory('All')}>All</Button>
            {categories.map((category) => {
              return (
                <Button onClick={() => filterByCategory(category.fields.title)}>{category.fields.title}</Button>
              )
            })} 
          </Space>
        </Col>
      </LeftHeading>
      <Centered>
        <Col span={5}>
          <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} onChange={(e) => filterPosts(e.target.value.toLowerCase())} />
        </Col>
      </Centered>
      <Section>
        <List
          dataSource={posts}
          renderItem={(blogPost: any) => (
            <List.Item>
              <PostCard key={blogPost.sys.id} blogPost={blogPost} />
            </List.Item>
          )}
        />
      </Section>
    </>
  );
}

export default BlogPosts;
