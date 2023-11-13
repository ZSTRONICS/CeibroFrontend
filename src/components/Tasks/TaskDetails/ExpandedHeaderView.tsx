import DespcriptionBox from 'components/Utills/DespcriptionBox'

interface ExpandedHeaderViewProps{
topic:string
createdBy:string
project:string
sentTo:string
Invitees:string
}

export default function ExpandedHeaderView({topic,createdBy,project,sentTo,Invitees}:ExpandedHeaderViewProps) {
  return (
    <div style={{width:'100%'}}>
      <div style={{display:'flex',gap:'64px'}} >
      <DespcriptionBox description={createdBy} title='Created by'/>
      <DespcriptionBox description={project??''} title='Project' titleWidth='73px'/>
      </div>
      <DespcriptionBox description={sentTo} title='Sent to'/>
      <DespcriptionBox description={Invitees} title='Invitees'/>
    </div>
  )
}
