import moment from "moment";
export default function TableDateFormat({ datetime }) {
  return moment(datetime).format("DD-MMM-YYYY");
}
