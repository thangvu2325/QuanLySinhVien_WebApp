import { FunctionComponent, ReactNode } from "react";
import className from "classnames/bind";
import styles from "./Modal.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CloseButton } from "react-bootstrap";

const cx = className.bind(styles);
interface ModalProps {
  onHide: () => void;
  onHideModalDelete: () => void;
  title: string;
  children: ReactNode;
  show?: boolean | undefined;
  centered: boolean;
}
const ModalComponent: FunctionComponent<ModalProps> = ({
  onHide,
  onHideModalDelete,
  title,
  children,
  show = false,
  centered = false,
  ...restProps
}) => {
  return (
    <Modal
      {...restProps}
      show={show}
      backdrop="static"
      keyboard={false}
      centered={centered}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        <CloseButton
          onClick={() => {
            onHideModalDelete();
            onHide();
          }}
        />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
