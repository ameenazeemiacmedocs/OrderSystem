import React, { useEffect, useState } from "react";
import { TextField, makeStyles, MenuItem } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  menu: {
    // padding: theme.spacing(1),
  }
}));
export const DropdownSelector = ({
  textFieldProps,
  onSelected,
  values,
  valueId,
  displayName
}) => {
  const [value, setValue] = useState(null);
  const classes = useStyles();
  return (
    <div>
      <TextField
        select={true}
        {...textFieldProps}
        onChange={e => {
          setValue(e.target.value);
          onSelected(e.target.value);
        }}
        value={value}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
      >
        {values !== null &&
          values !== undefined &&
          values.length > 0 &&
          values.map(p => {
            return (
              <MenuItem key={p[valueId]} value={p[valueId]}>
                {p[displayName]}
              </MenuItem>
            );
          })}
      </TextField>
    </div>
  );
};
