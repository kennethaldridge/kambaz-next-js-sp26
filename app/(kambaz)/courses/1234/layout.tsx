import { ReactNode } from "react";
import CourseNavigation from "./navigation";

 export default function CoursesLayout({ children }: { children: ReactNode }){
 return (
   <div id="wd-courses">
     <h2>Courses</h2>
     <hr />
     <table>
       <tbody>
         <tr>
           <td valign="top" width="200"> <CourseNavigation /> </td>
           <td valign="top" width="100%"> {children} </td>
         </tr>
       </tbody>
     </table>
   </div>
);}
