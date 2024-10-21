import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking = {}, isLoading } = useBooking();
  const { checkin, isCheckingin } = useCheckin();
  const { settings = {}, isLoading: isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  useEffect(() => {
    setConfirmPaid(addBreakfast ? false : isPaid);
  }, [addBreakfast, isPaid]);

  const singleBreakfastPrice = settings.breakfastPrice;
  const breakfastPrice = singleBreakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            disabled={isLoadingSettings}
            id="breakfast"
          >
            Do you want to add breakfast for {formatCurrency(breakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={(isPaid && !addBreakfast) || isCheckingin}
          onChange={() => {
            setConfirmPaid((paid) => !paid);
          }}
          id="confirm"
        >
          I confirm that {booking.guests.fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(breakfastPrice)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
