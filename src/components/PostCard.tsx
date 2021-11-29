import React from 'react';
import { useRouter } from 'next/router';
import { Card } from 'antd';
const { Meta } = Card;

export default function PostCard({ blogPost }) {
  const { title, slug, thumbnail, shortDescription } = blogPost.fields;
  const router = useRouter();
  return (
    <div className="card">
      <Card
        onClick={() => router.push('/blogPosts/' + slug)}
        hoverable
        style={{ width: 400, height: 400, flexDirection: 'row' }}
        cover={<img alt="Thumbnail of the blog post" src={'https:' + thumbnail.fields.file.url} />}>
        <Meta title={title} description={shortDescription} />
      </Card>
    </div>
  );
}
