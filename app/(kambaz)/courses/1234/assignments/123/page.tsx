export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name"><h3>Assignment Name </h3></label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" cols={50} rows={10}>
          The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
          The landing page should include the following: Your full name and section Links to each of the labs 
          assignments Link to the Kanbas application Links to all relevant source code repositories The 
          Kanbas application should include a link to navigate back to the landing page.
        </textarea>
        <br /> <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr><br/></tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
            <select id="wd-assignment-group">
                <option value="TESTS">TESTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option selected value="ASSIGNMENTS">
                    ASSIGNMENTS</option>
                <option value="PROJECTS">PROJECTS</option>
              </select>
            </td>
          </tr>
          <tr><br/></tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
            <select id="wd-display-grade">
                <option selected value="PERCENTAGE">
                    Percentage</option>
                <option value="POINTS">Points</option>
                <option value="LETTER">Letter</option>
              </select>
            </td>
          </tr>
          <tr><br/></tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-sub-type">Submission Type</label>
            </td>
            <td>
            <select id="wd-sub-type">
                <option selected value="ONLINE">
                    Online</option>
                <option value="IN-PERSON">In-Person</option>
              </select>
            </td>
          </tr>
          <tr><br/></tr>
          <tr>
            <td></td>
            <td>
                <label>Online Entry Options</label><br/>

                <input type="checkbox" name="entry-option" id="wd-chkbox-text"/>
                <label htmlFor="wd-chkbox-text">Text Entry</label><br/>

                <input type="checkbox" name="entry-option" id="wd-chkbox-url"/>
                <label htmlFor="wd-chkbox-url">Website URL</label><br/>

                <input type="checkbox" name="entry-option" id="wd-chkbox-record"/>
                <label htmlFor="wd-chkbox-record">Media Recordings</label><br/>

                <input type="checkbox" name="entry-option" id="wd-chkbox-annotation"/>
                <label htmlFor="wd-chkbox-annotation">Student Annotation</label><br/>

                <input type="checkbox" name="entry-option" id="wd-chkbox-upload"/>
                <label htmlFor="wd-chkbox-upload">File Uploads</label>
            </td>
          </tr>
          <tr><br/></tr>
          <tr>
            <td align="right" valign="top">
              Assign
            </td>
            <td>
                <label htmlFor="wd-assign">Assign to</label><br/>
              <input id="wd-assign" defaultValue={"Everyone"} />
            </td>
          </tr>
          <tr><br/></tr>
          <tr>
            <td></td>
            <td>
                <label htmlFor="wd-due">Due</label><br/>
                <input type="date"
                    defaultValue="2024-05-13"
                    id="wd-due"/>
            </td>
          </tr>
          <tr><br/></tr>
          <tr>
            <td></td>
            <td>
                <label htmlFor="wd-avail">Available from</label><br/>
                <input type="date"
                    defaultValue="2024-05-06"
                    id="wd-avail"/>
            </td>
            <td align="left">
                <label htmlFor="wd-until">Until</label><br/>
                <input type="date"
                    defaultValue="2024-05-20"
                    id="wd-until"/>
            </td>
          </tr>
          <tr>
                <td colSpan={3}><hr/></td>
          </tr>
          <tr>
            <td></td><td></td>
            <td align="right">
                <button type="button">Cancel</button>
                <button type="button">Save</button>
            </td>
        </tr>    
        </table>
        
      </div>
  );}
  