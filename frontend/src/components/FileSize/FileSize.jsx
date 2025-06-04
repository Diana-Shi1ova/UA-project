function FileSize({bytes}) {
    if (typeof bytes !== 'number' || bytes <= 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const value = bytes / Math.pow(k, i);

    return (
        <p>{`${value.toFixed(2)} ${sizes[i]}`}</p>
    );
}

export default FileSize;