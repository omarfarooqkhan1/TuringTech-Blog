import styled from 'styled-components';

export default function Skeleton() {
  const Skeleton = styled.div`
    max-width: 1000px;
    margin: 20px auto;
    & > div {
      background: lightgrey;
      border-radius: 4px;
      margin: 20px 0;
    }
  `;

  const SBanner = styled.div`
    padding: 12% 0;
  `;

  const SHeader = styled.div`
    padding: 15px 0;
    max-width: 500px;
  `;

  const SContent = styled.div`
    padding: 8px 0;
    max-width: 1000px;
  `;

  return (
    <Skeleton>
      <SBanner />
      <SHeader />
      <SContent />
      <SContent />
      <SContent />
    </Skeleton>
  );
}
