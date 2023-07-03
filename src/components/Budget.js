import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import ManualEntry from "./svg/IconManuallyEnter";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { DataContext } from "../context/DataContext"; //importing datacontext
import BudgetCard from "./BudgetCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";

import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ReactComponent as IconAddNew } from "./svgCategories/add-new.svg";
import { ReactComponent as IconBills } from "./svgCategories/bills.svg";
import { ReactComponent as IconCommunication } from "./svgCategories/communication.svg";
import { ReactComponent as IconEatingOut } from "./svgCategories/eating-out.svg";
import { ReactComponent as IconEducation } from "./svgCategories/education.svg";
import { ReactComponent as IconEntertainment } from "./svgCategories/entertainment.svg";
import { ReactComponent as IconGroceries } from "./svgCategories/groceries.svg";
import { ReactComponent as IconInsurance } from "./svgCategories/insurance.svg";
import { ReactComponent as IconMedicine } from "./svgCategories/medicine.svg";
import { ReactComponent as IconOthers } from "./svgCategories/others.svg";
import { ReactComponent as IconPets } from "./svgCategories/pets.svg";
import { ReactComponent as IconRent } from "./svgCategories/rent.svg";
import { ReactComponent as IconRepairs } from "./svgCategories/repairs.svg";
import { ReactComponent as IconTransportation } from "./svgCategories/transportation.svg";
import { ReactComponent as IconWork } from "./svgCategories/work.svg";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Budget() {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedCat, setExpandedCat] = React.useState("");
  const {
    categories,
    setCategories,
    categoriesObj,
    budgetData,
    setBudgetData,
    tranData,
    setTranData,
  } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const actions = [
    { icon: <ManualEntry />, name: "Add Budget", route: "/addbudget" },
  ];

  const handleActionClick = (route) => {
    navigate(route);
    setOpen(false);
  };
  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
  };

  const categoryIcons = {
    bills: IconBills,
    communication: IconCommunication,
    eatingOut: IconEatingOut,
    education: IconEducation,
    entertainment: IconEntertainment,
    groceries: IconGroceries,
    insurance: IconInsurance,
    medicine: IconMedicine,
    others: IconOthers,
    pets: IconPets,
    rent: IconRent,
    repairs: IconRepairs,
    transport: IconTransportation,
    work: IconWork,
    food: IconEatingOut,
    others: IconOthers,
  };

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });
  let pounds = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <Container
      sx={{
        paddingTop: "100px",
      }}
    >
      <Box
        sx={{
          height: 600,
          transform: "translateZ(0px)",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {budgetData.length ? null : "You have not added a Budget Limit yet."}

        {budgetData?.map((element) => (
          <Box>
            <Card
              sx={{
                minWidth: 275,
                mt: 1,
                borderRadius: "15px",
                display: "column",
              }}
              className="budget_card"
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: 0,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {(() => {
                    const Icon =
                      categoryIcons[
                        element.category_name ? element.category_name : "others"
                      ];

                    return <Icon style={{ marginRight: "0.5rem" }} />;
                  })()}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography sx={{ fontSize: 16, fontWeight: "700" }}>
                      {element.category_name.replace(/^[\w]/, (c) =>
                        c.toUpperCase()
                      )}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "300" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {/* Budget {element.limit_amount}€/Month */}
                      {Number(element.limit_amount) - Number(element.spent)} $
                      remaining
                    </Typography>
                  </Box>
                </Box>
                <div className="linear-progress-container2">
                  <h6 className="progress-left" style={{ fontSize: "14px" }}>
                    {categoriesObj?.hasOwnProperty(element.category_name)
                      ? `${categoriesObj[element.category_name].spent} $`
                      : "0 $"}
                  </h6>
                  <span className="progress-right" style={{ fontSize: "14px" }}>
                    {element.limit_amount} $
                  </span>
                  <LinearProgress
                    variant="determinate"
                    // value={categoriesObj[element.category_name] ? 90 : 20}
                    value={
                      categoriesObj[element.category_name]
                        ? (categoriesObj[element.category_name].spent * 100) /
                          categoriesObj[element.category_name].limit
                        : 0
                    }
                  />
                </div>
                <CardActions disableSpacing sx={{ p: 0 }}>
                  <ExpandMore
                    /* expand={expanded} */
                    expand={
                      expandedCat === element.category_name ? true : false
                    }
                    // onClick={() => setExpanded(!expanded)}
                    onClick={() => setExpandedCat(element.category_name)}
                    /* aria-expanded={expanded} */
                    aria-expanded={
                      expandedCat === element.category_name ? true : false
                    }
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  /* in={expanded} */ in={
                    expandedCat === element.category_name ? true : false
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent sx={{ p: 0 }}>
                    {tranData
                      .filter(
                        (item) =>
                          item.tran_sign === "DR" &&
                          item.category_name === element.category_name
                      )
                      .sort(
                        (a, b) => new Date(b.tran_date) - new Date(a.tran_date)
                      )
                      .slice(0, 10)
                      .map((element) => {
                        const origDate = element.tran_date;
                        const newDate = new Date(origDate);
                        const newLocalDate = newDate
                          .toLocaleDateString("en-GB") //ADD different Country code here to format it
                          .replace(/[/]/g, ".");

                        const capitalizedDesc =
                          element.tran_description.replace(/./, (c) =>
                            c.toUpperCase()
                          );
                        return (
                          <Box
                            component="div"
                            className="transaction-div"
                            key={element._id}
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="p"
                              component="p"
                              className="transaction-item"
                              sx={{ fontWeight: "bold" }}
                            >
                              {USDollar.format(element.tran_amount)}
                            </Typography>
                            <Typography
                              variant="p"
                              component="p"
                              className="transaction-item"
                            >
                              {capitalizedDesc}
                            </Typography>
                            <Typography
                              variant="p"
                              component="p"
                              className="transaction-item"
                            >
                              {newLocalDate}
                            </Typography>
                          </Box>
                        );
                      })}
                  </CardContent>
                </Collapse>
              </CardContent>
              {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
            </Card>
            {/* <div className="swiper-slide">

<div className="dash-budget">
  {(() => {
    const Icon =
      categoryIcons[
        each.category_name ? each.category_name : "others"
      ];

    return <Icon />;
  })()}
  <div className="dash-budget-title">
    <h2 className="dash-budget-title">{each.category_name}</h2>
    <p className="dash-budget-info">
      {Number(each.limit_amount) - Number(each.spent)} $ remaining
    </p>
  </div>
</div>

<div className="linear-progress-container2">
  <h6 className="progress-left">
    {categoriesObj?.hasOwnProperty(each.category_name)
      ? `${categoriesObj[each.category_name].spent} $`
      : "0 $"}
  </h6>
  <span className="progress-right">{each.limit_amount} $</span>
  <LinearProgress
    variant="determinate"
    // value={categoriesObj[each.category_name] ? 90 : 20}
    value={
      categoriesObj[each.category_name]
        ? (categoriesObj[each.category_name].spent * 100) /
          categoriesObj[each.category_name].limit
        : 0
    }
  />
</div>
</div> */}
          </Box>
        ))}
        {/* {budgetData.map((element) => (
          <BudgetCard element={element} />
        ))} */}
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon sx={{ color: "#FFFF" }} />}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          open={open}
          FabProps={{
            style: paperStyles,
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleActionClick(action.route)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Container>
  );
}
