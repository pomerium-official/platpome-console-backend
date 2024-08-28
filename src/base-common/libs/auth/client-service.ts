import axios from 'axios';
import { verifyJwt } from '@/base-common/libs/auth/libs/server/verify-jwt';

let globalAdminToken: string | null = null;
const REALM = process.env.NEXT_PUBLIC_AUTH_SERVER_REALM!;
const AUTH_SERVER = process.env.NEXT_PUBLIC_AUTH_SERVER_URL!;
const ADMIN_CLIENT_ID = process.env.ADMIN_CLIENT_ID!;
const ADMIN_CLIENT_SECRET = process.env.ADMIN_CLIENT_SECRET!;

const ADMIN_CERT_URL = `${process.env.NEXT_PUBLIC_AUTH_SERVER_URL}/realms/master/protocol/openid-connect/certs`;

async function getAdminToken() {
  try {
    const response = await axios.post(
      `${AUTH_SERVER}/realms/master/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: ADMIN_CLIENT_ID,
        client_secret: ADMIN_CLIENT_SECRET,
      })
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

async function ensureAccessToken() {
  try {
    if (!globalAdminToken) {
      globalAdminToken = await getAdminToken();
    } else {
      if (globalAdminToken) {
        const verifyResult = await verifyJwt(
          globalAdminToken,
          undefined,
          undefined,
          ADMIN_CERT_URL
        );
        console.log('verifyResult>>>>>>>>>', verifyResult);
        if (!verifyResult) {
          globalAdminToken = await getAdminToken();
        }
      }
    }

    console.log(
      '>>>>>>>>>>>ensureAccessToken>globalAdminToken',
      globalAdminToken
    );
  } catch (e) {
    console.error('ensureAccessToken catch e >>> ', JSON.stringify(e));
    throw e;
  }
}

export type CreateClientParam = {
  // protocol: string;
  clientId: string;
  name?: string;
  description?: string;
};

/**
 * 클라이언트 생성 (admin Token)
 * @param params
 */
export async function createClient(params: CreateClientParam) {
  try {
    const { clientId, name = '', description = '' } = params;

    await ensureAccessToken();

    const endpoint = `${AUTH_SERVER}/admin/realms/${REALM}/clients`;

    const headers = {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Bearer ${globalAdminToken}`,
      'Content-Type': 'application/json',
    };

    const clientData = {
      protocol: 'openid-connect',
      clientId,
      name,
      description,
      publicClient: false,
      authorizationServicesEnabled: false,
      serviceAccountsEnabled: true,
      implicitFlowEnabled: true,
      directAccessGrantsEnabled: true,
      standardFlowEnabled: true,
      frontchannelLogout: true,
      attributes: {
        saml_idp_initiated_sso_url_name: '',
        'oauth2.device.authorization.grant.enabled': false,
        'oidc.ciba.grant.enabled': false,
      },
      alwaysDisplayInConsole: false,
      rootUrl: '',
      baseUrl: '',
      webOrigins: ['*'],
    };

    const response = await axios.post(endpoint, clientData, { headers });
    return response.status === 201;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data.errorMessage
    ) {
      throw error.response.data.errorMessage;
    }
    throw error;
  }
}

interface ProtocolMapperConfig {
  [key: string]: string;
}

interface ProtocolMapper {
  id: string;
  name: string;
  protocol: string;
  protocolMapper: string;
  consentRequired: boolean;
  config: ProtocolMapperConfig;
}

interface ClientAttributes {
  [key: string]: string;
}

interface Access {
  view: boolean;
  configure: boolean;
  manage: boolean;
}

export interface GetClientResponseData {
  id: string;
  clientId: string;
  name: string;
  description: string;
  rootUrl: string;
  adminUrl: string;
  baseUrl: string;
  surrogateAuthRequired: boolean;
  enabled: boolean;
  alwaysDisplayInConsole: boolean;
  clientAuthenticatorType: string;
  secret: string;
  redirectUris: string[];
  webOrigins: string[];
  notBefore: number;
  bearerOnly: boolean;
  consentRequired: boolean;
  standardFlowEnabled: boolean;
  implicitFlowEnabled: boolean;
  directAccessGrantsEnabled: boolean;
  serviceAccountsEnabled: boolean;
  publicClient: boolean;
  frontchannelLogout: boolean;
  protocol: string;
  attributes: ClientAttributes;
  authenticationFlowBindingOverrides: any;
  fullScopeAllowed: boolean;
  nodeReRegistrationTimeout: number;
  protocolMappers: ProtocolMapper[];
  defaultClientScopes: string[];
  optionalClientScopes: string[];
  access: Access;
}

/**
 * client 정보를 가져옵니다.
 * @param clientId 등록시 입력한 client id
 */
export async function getClientInfo(clientId: string) {
  const endpoint = `${AUTH_SERVER}/admin/realms/${REALM}/clients?clientId=${clientId}`;
  await ensureAccessToken();

  const headers = {
    Authorization: `Bearer ${globalAdminToken}`,
  };

  try {
    const response = await axios.get(endpoint, { headers });

    console.log(
      '>>>>>>>>>>>>getClientInfo',
      clientId,
      endpoint,
      response.status,
      JSON.stringify(response.data)
    );

    if (response.data.length > 0) {
      return response.data[0] as GetClientResponseData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Client secret generate ( 기존 키 초기화되고 재발급됩니다. 주의! )
 * @param clientUid client의 고유 id
 */
export async function regenerateClientSecret(clientUid: string) {
  const endpoint = `${AUTH_SERVER}/admin/realms/${REALM}/clients/${clientUid}/client-secret`;
  await ensureAccessToken();

  const headers = {
    Authorization: `Bearer ${globalAdminToken}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post(endpoint, undefined, { headers });

  // {
  //     "type": "secret",
  //     "value": "Qt5VD3mvWbb7ECJBiWG87Dc1PNXNu5Dd"
  // }
  return response.data.value as string;
}
