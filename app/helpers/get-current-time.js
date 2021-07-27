async function getCurrentTime() {
  try {
    const ts = Date.now();
    const date = new Date(ts);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const seconds = date.getSeconds();
    const dateAsString = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    return dateAsString;
  } catch (err) {
    return err.message;
  }
}

module.exports = getCurrentTime;
