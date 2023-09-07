import { FunctionComponent } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
interface HomeProps {}
const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={cx("wrap")}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};
export default Home;
