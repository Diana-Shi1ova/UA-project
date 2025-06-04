function Ellipsis ({text, numChar=20}) {
    const truncateMiddle = (str, maxLength = 20) => {
        if (str.length <= maxLength) return str;

        const keep = Math.floor((maxLength - 3) / 2);
        return str.slice(0, keep) + '...' + str.slice(-keep);

        /*const endLength = 7; // cuantos caracteres dejar al final
        const startLength = maxLength - endLength - 3; // -3 puntos

        if (startLength <= 0) return '...' + str.slice(-endLength); // si queda paqueña

        return str.slice(0, startLength) + '...' + str.slice(-endLength);*/
    }

    /*const filename = 'nombre_script.cpp';
    const result = truncateMiddle(filename, 13);
    console.log(result);*/

    return (
        <p className="ellipsis-text">
            {truncateMiddle(text, numChar)}
        </p>
    );
}

export default Ellipsis;