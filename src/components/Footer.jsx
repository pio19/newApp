import { Layout } from "antd";

const { Footer } = Layout;

function CompFooter() {
  return (
    <Footer className="footer">
      Demo Web ©{new Date().getFullYear()} created by HaHa
    </Footer>
  );
}
export default CompFooter;
