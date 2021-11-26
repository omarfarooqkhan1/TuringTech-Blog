import React from 'react';
import { Divider, Typography } from 'antd';
const { Title } = Typography;

import { createClient } from 'contentful';
import PostCard from '../components/PostCard';

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CF_SPACE_ID,
        accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
    });

    const response = await client.getEntries({
        content_type: 'blogPost'
    });

    return {
        props: {
            blogPosts: response.items
        }
    }
}

function BlogPosts({ blogPosts }) {
    return (
        <div>
            <Divider/>
            <Title level={2}>Latest Blog Posts</Title>
            {blogPosts.map(blogPost => (
                <PostCard key={blogPost.sys.id} blogPost={blogPost}/>
            ))}
        </div>
    )
}

export default BlogPosts;
