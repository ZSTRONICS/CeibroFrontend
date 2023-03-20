import * as Yup from 'yup'

export const projectOverviewSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  dueDate: Yup.string().min(10).max(10).required(),
  publishStatus: Yup.string().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  // owner: Yup.array().required(),
  // description: Yup.string().required(),
  // location: Yup.string().required(),
  // projectPhoto: Yup.string().required(),
})
