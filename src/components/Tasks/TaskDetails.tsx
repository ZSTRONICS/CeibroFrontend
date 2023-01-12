import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { Drawer } from '@material-ui/core'

export default function TaskDetails() {
    // const detailDrawer = useSelector((store: RootState) => store.task.detailDrawer)

    return (
        <div>
            <Drawer anchor="right">
                TaskDetails
            </Drawer>
        </div>
    )
}
