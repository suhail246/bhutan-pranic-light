import { globalStyleObj } from "@/app/assets/styles";

const Footer = () => {
  return (
    <footer
      aria-label="Footer"
      className={`${globalStyleObj.flexBetween} ${globalStyleObj.backgroundLight900Dark300} ${globalStyleObj.text13Light400} p-5 shadow-top-only`}
    >
      <h4>2025 © Bin Yaber </h4>
      <h4>All Rights Reserved</h4>
    </footer>
  );
};

export default Footer;
