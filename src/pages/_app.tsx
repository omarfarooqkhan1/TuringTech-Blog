import React from 'react';
import Layout from '../components/Layout';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'AvenirNextLTPro';
    src: url('/fonts/AvenirNextLTPro/AvenirNextLTPro-Regular.otf');
    font-style: normal;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'AvenirNextLTPro';
    src: url('/fonts/AvenirNextLTPro/AvenirNextLTPro-It.otf');
    font-style: italic;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'AvenirNextLTPro';
    src: url('/fonts/AvenirNextLTPro/AvenirNextLTPro-Bold.otf');
    font-style: bold;
    font-weight: 600;
    font-display: swap;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    font-family: AvenirNextLTPro;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
