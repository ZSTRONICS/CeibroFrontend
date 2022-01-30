import { makeStyles, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import colors from '../../assets/colors';
// @ts-ignore
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { getRoomMessages } from '../../redux/action/chat.action';
import { SET_PAGINATION_BLOCK } from '../../config/chat.config';

interface IAppProps {
}

const MessageSearch: React.FunctionComponent<IAppProps> = (props) => {
    const classes = useStyles();
    const { selectedChat } = useSelector((state: RootState) => state.chat);
    const [search, setSearch] = React.useState("");
    const dispatch = useDispatch();

    const handleSearchChange = _.debounce((e: any) => {
        const value = e?.target?.value 
        setSearch(value);
        dispatch({
            type: SET_PAGINATION_BLOCK,
            payload: true
        })
        dispatch(getRoomMessages({
            other: {
                roomId: selectedChat,
                search: value
            },
            success: () => {
                setTimeout(() => {
                    dispatch({
                        type: SET_PAGINATION_BLOCK,
                        payload: false
                    })
                }, 1000)
            }
        }))
    }, 300)

    return (
        <div className={classes.wrapper}>
            <div className={classes.iconWrapper}>
                <Search />
                <Typography className={classes.horizontalBreak}>
                    |
                </Typography>
            </div>
            <div className={classes.inputWrapper}>
                <input 
                    type="text"
                    className={`emptyBorder ${classes.input}`}
                    placeholder="Chat search"
                    onChange={handleSearchChange}
                />
            </div>
            <div className={classes.btnWrapper}>
                <select className={classes.categories}>
                    <option>All Categories</option>
                    {/* <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option> */}
                </select>
            </div>
        </div>
    )
};

export default MessageSearch;

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flex: 1,
        background: colors.white,
    },
    iconWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: 2,
        border: `0.2px solid ${colors.inputGrey}`,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        borderRight: 'none'
    },
    horizontalBreak: {
        color: colors.mediumGrey
    },
    inputWrapper: {
        flex:  4,
        border: `0.2px solid ${colors.inputGrey}`,
        // borderTopLeftRadius: 7,
        // borderBottomLeftRadius: 7,
        borderRight: 'none',
        borderLeft: 'none',
        paddingRight: 5
    },
    input: {
        height: 35,
        flex: 1,
        width: '100%'
    },
    btnWrapper: {
        flex: 3,
        display: 'flex',
    },
    btn: {
        flex: 1,
        background: colors.primary,
        color: colors.white,
        borderColor: colors.primary,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        cursor: 'pointer'
    },
    btnText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    categories: {
        border: `0.2px solid ${colors.inputGrey}`,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        background: colors.white,
        "&:focus": {
            outline: "none"
        }
    }
})
