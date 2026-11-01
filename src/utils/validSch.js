import * as yup from 'yup';

const todayTime = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
export const TASK_VALIDATION_SCHEME = yup.object({
  text: yup.string().trim().min(2).max(50).required(),
  deadline: yup
    .date()
    .required('Вкажіть дедлайн')
    .min(todayTime(), 'Дедлайн не може бути в минулому'),
});
