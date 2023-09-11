import { FunctionComponent, ReactNode } from "react";
import className from "classnames/bind";
import styles from "./Modal.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const cx = className.bind(styles);
interface ModalProps {
  onHide: () => void;
  title: string;
  children: ReactNode;
  show?: boolean | undefined;
}
const ModalComponent: FunctionComponent<ModalProps> = ({
  onHide,
  title,
  children,
  show = false,
  ...props
}) => {
  console.log("Modal Open");
  return (
    <Modal {...props} show={show} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
