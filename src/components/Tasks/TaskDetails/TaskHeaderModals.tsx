import CustomModal from "components/Modal";
interface ModalConfig {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  content: JSX.Element;
}
interface Props {
  modals: ModalConfig[];
}
function TaskHeaderModals(props: Props) {
  const { modals } = props;
  return (
    <>
      {modals.map(
        (modal: ModalConfig, index: number) =>
          modal.isOpen && (
            <CustomModal
              key={index}
              maxWidth={"md"}
              showFullWidth={true}
              showDivider={true}
              showCloseBtn={false}
              showTitleWithLogo={true}
              title={modal.title}
              isOpen={modal.isOpen}
              handleClose={modal.handleClose}
              children={modal.content}
            />
          )
      )}
    </>
  );
}

export default TaskHeaderModals;
