import { createClient } from 'contentful';
import React from 'react';

export async function getStaticProps() {
    const client = createClient(
        {
            space: process.env.CF_SPACE_ID,
            accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
        }
    );

    const response = await client.getEntries(
        { content_type: 'blogPost' }
    );

    return {
        props: {
            blogPosts: response.items
        }
    }
}

function BlogPosts({ blogPosts }) {
    console.log(blogPosts);
    return (
        <div>
            
        </div>
    )
}

export default BlogPosts;
