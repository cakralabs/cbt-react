import React from "react";
export {ReactComponent as DashboardLogo} from './Dashboard.svg';
export {ReactComponent as AppraisalLogo} from './Appraisal.svg';
export {ReactComponent as AttendanceLogo} from './Attendance.svg';
export {ReactComponent as CalendarLogo} from './Calendar.svg';
export {ReactComponent as CentreLogo} from './Centre.svg';
export {ReactComponent as ChatLogo} from './Chat.svg';
export {ReactComponent as ClassLogo} from './Class.svg';
export {ReactComponent as EventLogo} from './Event.svg';
export {ReactComponent as KidsLogo} from './Kids.svg';
export {ReactComponent as ParentLogo} from './Parent.svg';
export {ReactComponent as SettingsLogo} from './Settings.svg';
export {ReactComponent as SurveyLogo} from './Survey.svg';
export {ReactComponent as TeacherLogo} from './Teacher.svg';
export {ReactComponent as VisitorLogo} from './Visitor.svg';
export {ReactComponent as CentreLeaderLogo} from './CentreLeader.svg';
export {ReactComponent as WeeklyPlanLogo} from './WeeklyPlan.svg';
export {ReactComponent as StaffLogo} from './Staff.svg';

export const CustomIcon = (props) =>{
    return(
        <span className="anticon">
            <props.icon />
        </span>
    )
} 