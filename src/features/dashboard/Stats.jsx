import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numOfDays, cabinsCount }) => {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numOfDays * cabinsCount) * 100;
  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<BusinessCenterOutlinedIcon />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<PaymentsOutlinedIcon />}
      />
      <Stat
        title="Check ins"
        value={checkins}
        color="indigo"
        icon={<CalendarMonthOutlinedIcon />}
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupation) + '%'}
        color="yellow"
        icon={<BarChartOutlinedIcon />}
      />
    </>
  );
};

export default Stats;
