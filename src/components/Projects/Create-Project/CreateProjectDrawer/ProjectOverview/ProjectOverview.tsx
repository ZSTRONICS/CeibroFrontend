import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import CDatePicker from 'components/DatePicker/CDatePicker'
import { getStatusDropdown } from 'config/project.config'
import { formatDate } from 'helpers/project.helper'
import _ from 'lodash'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectActions, { getProjectDetail } from 'redux/action/project.action'
import { getAvailableUsers } from 'redux/action/user.action'
import { RootState } from 'redux/reducers'
import colors from '../../../../../assets/colors'
import CreatableSelect from '../../../../Utills/Inputs/CreateAbleSelect2'
import ImagePicker from '../../../../Utills/Inputs/ImagePicker'
import SelectDropdown, { dataInterface } from '../../../../Utills/Inputs/SelectDropdown'
import HorizontalBreak from '../../../../Utills/Others/HorizontalBreak'
import ProjectOverViewForm from './ProjectOverViewForm'

const ProjectOverview = () => {
  const classes = useStyles()
  const projectOverview = useSelector((state: RootState) => state.project.projectOverview)
  const selectedProject = useSelector((state: RootState) => state.project.selectedProject)
  const { user } = useSelector((state: RootState) => state.auth)
  const [data, setData] = useState<dataInterface[]>([])
  // const localized = momentdeDateFormat(projectOverview.dueDate);

  const [showDate, setShowDate] = useState<any>(projectOverview.dueDate);
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false)
        },
        other: selectedProject,
      }
      setLoading(true)
      dispatch(getProjectDetail(payload))
    }
  }, [selectedProject])

  useEffect(() => {
    const payload = {
        other: true,
        success: (res: any) => {
          setData(res.data)
          // setting current user as default owner
          res?.data?.map((row: dataInterface) => {
            if (row?.value === user?._id) {
              if (!selectedProject) {
                dispatch(
                  projectActions.setProjectOverview({
                    ...projectOverview,
                    owner: [...(projectOverview?.owner || []), row],
                  })
                )
              }
            }
          })
        },
      }
      dispatch(getAvailableUsers(payload))
    }, []);

  // const handleDateChange = (e: any) => {
  //   const date = e?.target?.value
  //   console.log('date',date);
    
  //   date &&
  //     dispatch(
  //       projectActions.setProjectOverview({
  //         ...projectOverview,
  //         dueDate: date,
  //       })
  //     )
  // }

  const handleOwnerChange = (users: dataInterface[]) => {
    users &&
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          owner: users,
        })
      )
  }

  const handleStatusChange = (status: dataInterface) => {
    status?.value &&
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          publishStatus: status.value,
        })
      )
  }

  const my = formatDate(projectOverview?.dueDate)
  const statusData = getStatusDropdown()
  const statusValue = projectOverview?.publishStatus
    ? {
        label: projectOverview?.publishStatus,
        value: projectOverview?.publishStatus,
      }
    : null

  //  const newArray = Array.from(
  //    new Set(projectOverview?.owner?.map((el: any) => JSON.stringify(el)))
  //  ).map((el: any) => JSON.parse(el));

  const ProjectOwnerList = projectOverview?.owner?.reduce?.((acc: any, current: any) => {
    const x = acc.find((item: any) => item.value === current.value)
    if (!x) {
      return acc.concat([current])
    } else {
      return acc
    }
  }, [])

  const isDisabled = !_.map(ProjectOwnerList, 'value').includes(user._id)

  return (
    <div style={{ width: '100%' }}>
      <Grid container>
        {loading && <CircularProgress size={20} className={classes.progress} />}

        <Grid item xs={12} sm={6} md={3} className="black-input">
          {/* <DatePicker value={my} onChange={handleDateChange} /> */}
          <CDatePicker
              showLabel={true}
              required
              value={showDate}
              id="date1"
              name="dueDate"
              onChange={(e: any) => {
                setShowDate(e);
                projectOverview.dueDate= moment(e).format("YYYY-MM-DD");
              }}
            /> 
        </Grid>

        <Grid item xs={12} sm={6} md={5} className={classes.datePickerWrapper}>
          <SelectDropdown
            handleChange={handleOwnerChange}
            data={data}
            value={ProjectOwnerList}
            title="Owner"
            isMulti={true}
            isDisabled={isDisabled}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.datePickerWrapper}>
          <CreatableSelect
            handleChange={handleStatusChange}
            data={statusData}
            value={statusValue}
            title="Status"
          />
        </Grid>

        <Grid item xs={12} md={12} style={{ padding: '20px 5px' }}>
          <HorizontalBreak color={colors.grey} />
        </Grid>
      </Grid>

      <Grid container className={classes.secondForm}>
        <Grid item xs={12} md={2} className={classes.imagePicker}>
          <ImagePicker />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProjectOverViewForm />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProjectOverview

const useStyles = makeStyles({
  datePickerWrapper: {
    paddingLeft: 20,
    '@media (max-width:600px)': {
      paddingLeft: 0,
      paddingTop: 20,
    },
  },
  secondForm: {
    paddingTop: 0,
  },
  imagePicker: {
    '@media (max-width:600px)': {
      paddingBottom: 20,
    },
  },

  progress: {
    color: colors.primary,
    position: 'absolute',
    zIndex: 1,
    margin: 'auto',
    marginTop: '300px',
    left: 0,
    right: 0,
    top: 10,
    textAlign: 'center',
  },
})
