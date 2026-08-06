import IconWithTypography from "../molecules/IconWithTypography";
import Avatar from "../molecules/Avatar";

import home from "../../icons/home.svg";
import users from "../../icons/users.svg";
import gavel from "../../icons/gavel.svg";
import document from "../../icons/document.svg";
import chart from "../../icons/chart.svg";
import account from "../../icons/account.svg";
import screening from "../../icons/screening.svg";

import profile from "../../images/profile.png";


const SideNavigation = () => {

const menu = [
 {
  text:"Home",
  icon:home
 },
 {
  text:"Candidates",
  icon:users,
 },
 {
  text:"Adverse Actions",
  icon:gavel
 },
 {
  text:"Logs",
  icon:document
 },
 {
  text:"Analytics",
  icon:chart
 },
 {
  text:"Account",
  icon:account
 },
 {
  text:"Screenings",
  icon:screening
 }
];


return (

<div
style={{
 width:"250px",
 height:"100vh",
 background:"#fff",
 borderRight:"1px solid #eee",
 padding:"24px 16px",
 display:"flex",
 flexDirection:"column"
}}
>

<h2
style={{
color:"#3218B8",
fontSize:"20px",
fontWeight:700
}}
>
RECRUIT
</h2>


{
menu.map((item)=>(
<IconWithTypography
key={item.text}
icon={item.icon}
text={item.text}
active={item.active}
/>
))
}


<div style={{flex:1}}/>


<div
style={{
borderTop:"1px solid #eee",
paddingTop:"16px"
}}
>

<Avatar
image={profile}
name="James Rodriguez"
company="James.co"
/>

</div>


</div>

)

}

export default SideNavigation;