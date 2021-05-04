import FormatDate from '../Utils/FormatDate';
import FormatAmount from '../Utils/FormatAmount';

export default function TicketTableFragment({ticket}){
    return (
        <tr>
            <td> {ticket.description} </td>
            <td> <FormatAmount amount={ticket.amount} /> </td>
            <td> {ticket.type_id.type} </td>
            <td> {ticket.status_id.status} </td>
            <td> <FormatDate created={ticket.submitted} /> </td>
            <td> <FormatDate created={ticket.resolved} /> </td>
            <td>null</td>
            <td> <a href={"/tickets/receipt/" + ticket.reimb_id}>View Receipt</a> </td>
        </tr>
    )
}