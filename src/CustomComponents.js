import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { IconButton, Chip } from "@material-ui/core";

export const QuantitySelecter = ({ handleAdd, handleRemove, value }) => {
  return (
    <>
      <IconButton size="small" onClick={handleRemove}>
        <RemoveIcon />
      </IconButton>
      <Chip label={value} variant="outlined" style={{ maxWidth: "33pt" }} />
      <IconButton size="small" onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </>
  );
};
