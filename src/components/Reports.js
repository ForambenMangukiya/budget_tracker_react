import Container from "@mui/material/Container";
export default function Reports() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: "100px",
      }}
    >
      I'm in the Reports
    </Container>
  );
  const { categories } = useContext(DataContext);
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
  return (
    <Container
      sx={{
        paddingTop: "100px",
        maxWidth: "sm",
        minHeight: "100vh",
      }}
    >
      <h3 className="dash-title">Top spending</h3>
      <div className="dash-topSpending">
        {categories?.map((category) => {
          const IconComponent = categoryIcons[category.name]
            ? categoryIcons[category.name]
            : categoryIcons["others"];
          return (
            <div>
              <IconComponent />
              <p className="dash-icon-title">{category.name}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
