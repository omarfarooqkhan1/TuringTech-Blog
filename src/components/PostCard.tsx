import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

export default function PostCard( {blogPost} ) {
    const { title, slug, thumbnail, shortDescription } = blogPost.fields;

    return (
        <div className="card">
            <Card
                hoverable
                style={{ width: thumbnail.fields.file.details.image.width/2, flexDirection: 'row' }}
                cover={<img alt="Thumbnail of the blog post" src={'https:'+thumbnail.fields.file.url}/>}
            >
                <Meta title={title} description={shortDescription} />
            </Card>   
        </div> 
    )
}
