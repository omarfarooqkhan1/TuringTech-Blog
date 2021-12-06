import React from 'react';
import { useRouter } from 'next/router';
import { Card } from 'antd';
import styled from 'styled-components';
const { Meta } = Card;

export default function PostCard({ blogPost }) {
  const { title, slug, thumbnail, shortDescription } = blogPost.fields;
  const router = useRouter();

  const StyledCard = styled(Card)`
    width: 600px;
    height: 500px;
    flex-direction: row;
  `;

  return (
    <div className="card">
      <StyledCard
        onClick={() => router.push('/blogPosts/' + slug)}
        hoverable
        cover={<img alt="Thumbnail of the blog post" src={'https:' + thumbnail.fields.file.url} />}>
        <Meta title={title} description={shortDescription} />
      </StyledCard>
    </div>
  );
}
