import React, { useState } from "react";
import { IResource } from "../../models/resource";
import { ListItem, ListItemText, Collapse, List, TextField, Typography, Box } from "@material-ui/core";
import { getBaseURL } from "../../util/agent";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

interface ICollapsibleResourceProps {
  readonly examId: number;
  readonly examName: string;
  readonly resources: IResource[];
  readonly setSelected: () => void;
  readonly selected?: boolean;
}

export function CollapsibleResource(props: ICollapsibleResourceProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    props.setSelected();
    setOpen(open => !open);
  }

  return (
    <>
      <ListItem button selected={props.selected} onClick={handleClick}>
        <ListItemText>{props.examName}: <Typography variant="caption">{props.resources.length} Dateien</Typography></ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List>
          {props.resources.map(resource => (
            <ListItem key={resource.id!}>
              <Box display="flex" flexDirection="row" width="100%">
                <ListItemText><Typography variant="caption">{resource.title}</Typography></ListItemText>
                <TextField label="Sharelink" value={`${getBaseURL()}/resources/${props.examId}?resource_id=${resource.id!}`} fullWidth />
              </Box>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}