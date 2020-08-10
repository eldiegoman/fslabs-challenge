import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Typography } from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({ id, description }) => {
  const classes = useStyles();
  return (
    <Box className={classes.block}>
      <Typography className={classes.blockId} variant="body1">
        {id}
      </Typography>
      <Typography variant="subtitle2">{description}</Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  block: {
    marginTop: "5px",
    padding: "5px",
    borderRadius: "2px",
    backgroundColor: colors.blocksBackgroud,
    width: "100%",
  },
  blockId: {
    fontSize: theme.typography.pxToRem(12),
    color: colors.detail,
    fontWeight: "bold",
  },
  blockDescription: {
    fontSize: theme.typography.pxToRem(14),
    color: "#3D484D",
  },
}));

Block.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
};

export default Block;
