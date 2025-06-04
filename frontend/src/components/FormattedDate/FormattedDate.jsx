function FormattedDate ({dateISO, hour=false}) {
    if(dateISO){
        const date = new Date(dateISO);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formatted = `${day}/${month}/${year} - ${hours}:${minutes}`;

        return (
            <p className="formattedDate">{formatted}</p>
        );
    }
}

export default FormattedDate;