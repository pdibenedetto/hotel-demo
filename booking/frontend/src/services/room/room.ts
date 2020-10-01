import { fetchWrapper } from "../fetchWrapper";

type AddRoomBody = {
  roomNumber: number;
  description: string;
};
export async function addRoom(registerObject: AddRoomBody) {
  return await fetchWrapper.post("/rooms", registerObject);
}

export type RoomBooking = {
  id: string;
  startDate: string;
  endDate: string;
};
export type GetRoomResponse = {
  roomNumber: number;
  roomDescription: string;
  // "EMPTY" | "BOOKED"
  roomStatus: string;
  bookings: RoomBooking[];
  myFailedBookings: RoomBooking[];
};
export async function getRoom(roomNumber: number): Promise<GetRoomResponse> {
  const response = await fetchWrapper.get(`/rooms/${roomNumber}/availability`);
  return response.json();
}

export async function getRoomForAccount(
  roomNumber: number,
  accountId: string
): Promise<GetRoomResponse> {
  const response = await fetchWrapper.get(
    `/rooms/${roomNumber}/account/${accountId}/availability`
  );
  return response.json();
}

type BookRoomProps = {
  roomNumber: number;
};
type BookRoomBody = {
  startDate: string;
  endDate: string;
  accountID: string;
};
export async function bookRoom(props: BookRoomProps, body: BookRoomBody) {
  return await fetchWrapper.post(`/rooms/${props.roomNumber}/booked`, body);
}

export type CleaningScheduleItem = {
  roomNumber: number;
  deadlines: string[];
};
export type GetCleaningScheduleResponse = CleaningScheduleItem[];
export async function getCleaningSchedule(): Promise<
  GetCleaningScheduleResponse
> {
  const response = await fetchWrapper.get("/rooms/cleaningschedule");
  return await response.json();
}

type PrepareRoomProps = {
  roomNumber: number;
};
type PrepareRoomBody = {
  bookingId: string;
};
export async function prepareRoom(
  props: PrepareRoomProps,
  body: PrepareRoomBody
) {
  return await fetchWrapper.post(`/rooms/${props.roomNumber}/prepared`, body);
}

type CheckinRoomProps = {
  roomNumber: number;
};
type CheckinRoomBody = {
  bookingId: string;
};
export async function checkinRoom(
  props: CheckinRoomProps,
  body: CheckinRoomBody
) {
  return await fetchWrapper.post(`/rooms/${props.roomNumber}/checkedin`, body);
}

type CheckoutRoomProps = {
  roomNumber: number;
};
type CheckoutRoomBody = {
  bookingId: string;
};
export async function checkoutRoom(
  props: CheckoutRoomProps,
  body: CheckoutRoomBody
) {
  return await fetchWrapper.post(`/rooms/${props.roomNumber}/checkedout`, body);
}

export type GetCheckoutScheduleResponse = Array<{
  roomNumber: number;
  bookings: RoomBooking[];
}>;
export async function getCheckoutSchedule(): Promise<
  GetCheckoutScheduleResponse
> {
  const result = await fetchWrapper.get("/rooms/checkoutschedule");
  return await result.json();
}