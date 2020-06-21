export default (dateStr) => {
  const year = dateStr.slice(0,4);
  const month = dateStr.slice(5,7);
  const day = dateStr.slice(8,10);
  return `${month}/${day}/${year}`;
}