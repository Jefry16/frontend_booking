import type { AppProps } from "next/app";
import Layout from "../components/layout";
import '../styles/less/antd.less'
import "../styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
