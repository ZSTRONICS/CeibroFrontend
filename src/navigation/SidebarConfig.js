
import { VscHome } from "react-icons/vsc";
import { BsChatSquareDots } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { AiOutlineFolder } from "react-icons/ai";



export default [
    {
        title: 'Dashboard',
        icon: <VscHome />,
        path: "dashboard",
        notification: 0,
        active: true
    },
    {
        title: 'Chat',
        icon: <BsChatSquareDots />,
        path: "chat",
        notification: 2
    },
    {
        title: 'Tasks',
        icon: <BiTask />,
        path: "tasks",
        notification: 2
    },
    {
        title: 'Projects',
        icon: <AiOutlineFolder />,
        path: "projects",
        notification: 0
    }

]