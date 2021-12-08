import React from 'react';
import Button from 'components/Button';
import { Result } from 'antd';
import { useRouter } from 'next/router';

function NotFound() {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button primary={true} onClick={() => router.push('/')}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotFound;
