import sjcl from 'sjcl'

export const tokenURL = state => {
  //   Token = base64 string => bits => unpadded base64url string
  //   WS auth token: protocol = 'Bearer+{Token}'
  let tokenBits = sjcl.codec.base64.toBits(state.tokens.content.token)
  return sjcl.codec.base64url.fromBits(tokenBits)
}
