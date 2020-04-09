export const GuestItem = props => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <ListItem alignItems="flex-start" className={classes.nested}>
        <ListItemAvatar>
          <Avatar alt={props.prodName} src={props.productImage} />
        </ListItemAvatar>
        <ListItemText
          key={props.prodId}
          primary={props.prodName}           
          secondary={props.prodDescr}
          // secondary={
          //   <React.Fragment>
          //     <Typography
          //       component="span"
          //       variant="body2"
          //       className={classes.inline}
          //       color="textPrimary"
          //     >
          //       Ali Connors
          //     </Typography>
          //     {" — I'll be in your neighborhood doing errands this…"}
          //   </React.Fragment>
          // }
        />
        <ListItemSecondaryAction >
          <IconButton onClick={()=>{alert("add")}} ><AddCircleIcon/></IconButton>
          <IconButton ><RemoveCircleOutlineIcon/></IconButton>        
         {props.qty>0 && <span className={classes.primary}>{props.qty}</span>}
          </ListItemSecondaryAction>
          
      </ListItem>
    </div>
  );
};

export const GroupItems=props=>{

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const prodItems=props.items.map(
    (gp)=>
    <GuestItem
            prodId={gp.id}
            prodName={gp.prodName}
            prodDescr={gp.prodDescr}
            prodRate={gp.prodRate}
            qty={gp.qty}
          />
  );

  return (
  <div className={classes.root}>
      <ListItem key={props.groupId} button onClick={handleClick}>
        <ListItemText primary={props.groupName}>
        {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemText>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {prodItems}
        </List>
        </Collapse>
  </div>);
};
