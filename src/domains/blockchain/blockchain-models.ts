export interface BlockChainResponseType {
  /**
   * 블록체인 ID(심볼)
   * @example "BTC"
   */
  blockchainId: string;
  /**
   * 블록 체인 명
   * @example "BitCoin"
   */
  name: string;
  /**
   * 심볼 이미지 URL
   * @example "http://example.url/btc
   */
  symbolImageUrl: string;
}
