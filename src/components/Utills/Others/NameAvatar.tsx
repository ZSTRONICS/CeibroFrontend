import { makeStyles } from "@material-ui/core"
import colors from "../../../assets/colors"

interface NameAvatarProps {
    name: string;
    background?: string;
}

const NameAvatar: React.FC<NameAvatarProps> = (props) => {
    const classes = useStyles()
    const { name } = props
    const letter2 = name?.split(' ')[1]? name.split(' ')[1][0]: ""
    const letters = name?.[0].toUpperCase() + letter2

    return (
        <div className={classes.outerWrapper} style={{ background: props?.background || colors.secondaryGrey }}>
            {letters}
        </div>
    )
}

export default NameAvatar

const useStyles = makeStyles({
    outerWrapper: {
        border: `1px solid ${colors.secondaryGrey}`,
        background: colors.secondaryGrey,
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        maxWidth: 45
    }
})