export const HEADER_USER = 'HEADER_USER'
export const HEADER_ADMIN = 'HEADER_ADMIN'

export const getRFCTime = function () {
  function ISODateString (d) {
    function pad (n) {
      return n < 10 ? '0' + n : n
    }
    return d.getUTCFullYear() + '-' +
          pad(d.getUTCMonth() + 1) + '-' +
          pad(d.getUTCDate()) + 'T' +
          pad(d.getUTCHours()) + ':' +
          pad(d.getUTCMinutes()) + ':' +
          pad(d.getUTCSeconds()) + 'Z'
  }

  return ISODateString(new Date())
}
