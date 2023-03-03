import ViewAllDocs from 'components/Tasks/SubTasks/ViewAllDocs'
import CDrawer from 'Drawer/CDrawer'
import React from 'react'

function OpenViewDocsDrawer(props:any) {
  return (
    <>
    <CDrawer
        showBoxShadow={true}
        hideBackDrop={true}
        opencdrawer={props.opencdrawer}
        handleclosecdrawer={props.handleAttachmentDrawer}
        children={
          <ViewAllDocs
            heading="Attachments"
            handleclosecdrawer={props.handleAttachmentDrawer}
            moduleName={props.moduleName}
            moduleId={props.moduleId}
          />
        }
      />
    </>
  )
}

export default OpenViewDocsDrawer