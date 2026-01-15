import { ReactNode } from "react";
import CourseNavigation from "./navigation";
export default async function CoursesLayout(
  { children }: Readonly<{ children: ReactNode;}>) {
 //const { cid } = await params;
 return (
   <div id="wd-courses">
     <h2>Courses 1234</h2>
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

