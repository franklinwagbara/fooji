import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default function Select({ onGroupChange, group, groups }) {
  return (
    <>
      <div>
        <TextField
          id="group-select"
          select
          label="Groups"
          value={group}
          onChange={(e) => onGroupChange(e)}
          helperText="Please select a group"
        >
          {groups.map((group) => (
            <MenuItem key={group._id} value={group}>
              {group.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </>
  );
}
