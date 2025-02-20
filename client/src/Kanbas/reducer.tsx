import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [],
  enrollmentsOn: false,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === enrollment.user && e.course === enrollment.course)
      );
    },
    enrollmentsOnSwitch: (state) => {
      state.enrollmentsOn = !state.enrollmentsOn;
    },
  },
});
export const { enroll, unenroll, enrollmentsOnSwitch, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
