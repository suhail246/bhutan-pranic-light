// NOTE Language Images ---

import { BiBadgeCheck, BiMessageSquareDots } from "react-icons/bi";

import avatar1 from "../../images/users/avatar-2.jpg";
import avatar3 from "../../images/users/avatar-3.jpg";
import avatar4 from "../../images/users/avatar-6.jpg";
import avatar2 from "../../images/users/avatar-8.jpg";
import { Children } from "react";

// NOTE Nav Notifications Data ****
export const notificationsData = [
  {
    id: "all-notification",
    label: "All",
    content: [
      {
        id: "noti-1",
        type: "general",
        notificationText: `Your Elite author Graphic Optimization reward is ready!`,
        time: "JUST 30 SEC AGO",
        icon: <BiBadgeCheck size={15} color="#41A3DC" />,
        iconBgColor: "#DFF0FA",
      },
      {
        id: "noti-2",
        type: "user",
        username: "Angela Bernier",
        notificationText:
          "Answered to your comment on the cash flow forecast's graph 🔔.",
        time: "48 MIN AGO",
        userImage: avatar1,
      },
      {
        id: "noti-3",
        type: "general",
        notificationText:
          "You have received 20 new messages in the conversation",
        time: "2 HRS AGO",
        icon: <BiMessageSquareDots size={15} color="#F06548" />,
        iconBgColor: "#FDE8E4",
      },
      {
        id: "noti-4",
        type: "user",
        username: "Maureen Gibson",
        notificationText: "We talked about a project on linkedin.",
        time: "4 HRS AGO",
        userImage: avatar2,
      },
    ],
  },
  {
    id: "all-message-notifications",
    label: "Messages",
    content: [
      {
        id: "msg-noti-1",
        type: "user",
        username: "James Lemire",
        notificationText: "We talked about a project on linkedin.",
        time: "30 MIN AGO",
        userImage: avatar3,
      },
      {
        id: "msg-noti-2",
        type: "user",
        username: "Angela Bernier",
        notificationText:
          "Answered to your comment on the cash flow forecast's graph 🔔.",
        time: "2 HRS AGO",
        userImage: avatar1,
      },
      {
        id: "msg-noti-3",
        type: "user",
        username: "Kenneth Brown",
        notificationText: "Mentionned you in his comment on 📃 invoice #12501.",
        time: "10 HRS AGO",
        userImage: avatar4,
      },
      {
        id: "msg-noti-4",
        type: "user",
        username: "Maureen Gibson",
        notificationText: "We talked about a project on linkedin.",
        time: "3 DAYS AGO",
        userImage: avatar2,
      },
    ],
  },
  {
    id: "all-alert-notifications",
    label: "Alerts",
    content: [],
  },
];

// Bhutan navbar content
 export const dataOfNav = [
  {
    _id : 1,
  name: "Home",
  Children: []
},
  {
    _id : 2,
  name: "about-us",
  Children: []
},
  {
    _id : 3,
  name: "Event",
  Children: []
},
  {
    _id : 4,
  name: "Register",
  Children: []
},
  {
    _id : 5,
  name: "contact-us",
  Children: []
},

 ]