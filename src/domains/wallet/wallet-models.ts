import { DefaultTransactionResponseType } from '@/domains/nft/nft-models';

export interface TransferNativeRequest {
  /**
   * recipient wallet address
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  toAddress: string;

  /**
   * amount of native token
   * @example 1.0
   */
  amount: number;
}

export interface TransferTokenRequest extends TransferNativeRequest {
  appId?: number;
  /**
   * Include the smart contract address of the token you want to transfer
   * @example "0x507f60A808C4e69E4Af0395F9265C7F89CE03D04"
   */
  tokenContractAddress: string;

  /**
   * private key
   * @example ""
   */
  privateKey: string;
}

export interface TransferNativeResponse {
  /**
   * sender's wallet address
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  fromAddress?: string;
  /**
   * recipient wallet address
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  toAddress?: string;

  /**
   * amount of native token
   * @example 1.0
   */
  amount: number;
  /**
   * transaction hash
   * @example "0x426eb17979ade27411a8209ff65305c14e892268bc66a074017ddd4a9c3f7d7e"
   */
  txHash: string;

  /**
   * rawdata from rpc result including receipt, logs, event
   */
  rowData: any;
}

export type TransferTokenResponse = TransferNativeResponse;

export interface FindWalletByAppIdQueryResponse {
  /**
   * 앱 id
   */
  appId: number;
  /**
   * 콘솔 지갑 id
   */
  walletId: string;
  /**
   * 콘솔 지갑 주소
   */
  address: string;
  /**
   * 암호화 프라이빗키
   */
  encPrivateKey: string;
  /**
   * 자동 서명 여부
   */
  autoSignYn: 'Y' | 'N';
  /**
   * 보유 토큰 수량
   */
  tokenCount: number;
  /**
   * 보유 PMG(기준 재화 토큰) 토큰 수량
   */
  PMG_balance: string;
  /**
   * 지갑 설정 멤버 접근 허용 여부
   */
  memberAccessYn: 'Y' | 'N';
  /**
   * 앱 생성자 id
   */
  createdId: number;
  /**
   * 콘솔 지갑 생성일
   */
  createdAt: Date;
}

export type TransactionsSearchOption = {
  /**
   * The desired page size of the result.
   * @example 10
   */
  limit?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  cursor?: string | '';
  /**
   * If the result should contain the internal transactions.
   * @example "internal_transactions"
   */
  include?: 'internal_transactions' | undefined;

  fromDate?: string;

  toDate?: string;
};

export interface WalletTransactionsResponseType
  extends DefaultTransactionResponseType {
  result: WalletTransactionDataType[];
}

export interface WalletTransactionDataType {
  txId: string;
  nonce: string;
  blockNumber: string;
  receiptStatus: string;
  fromAddress: string;
  toAddress: string;
  value: string;
  gas?: string | null;
  gasPrice: string;
  blockTimestamp: string;
}

export interface GetTransactionsQueryParams {
  /**
   * The desired page size of the result.
   * @example 10
   */
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
}
