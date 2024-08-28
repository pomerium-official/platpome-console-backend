/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ErrorVo */
export interface ErrorVo {
    /**
     * 성공/에러코드
     * @example "00"
     */
    code?: string;
    /** 에러의 경우 에러메시지 */
    message?: string;
    /**
     * 메세지 코드
     * @example "ERROR.SYS.999"
     */
    messageCode?: string;
}

/** Link */
export interface Link {
    href?: string;
    templated?: boolean;
}

/** LoginRequest */
export interface LoginRequest {
    /**
     * 비밀번호
     * @example "1234"
     */
    password: string;
    /**
     * 계정제공자 (APPLE:애플, GOOGLE:구글, NAVER:네이버, KAKAO:카카오, 사이트:SELF)
     * @example "SELF"
     */
    provider?: string;
    /**
     * 서비스코드 (C:크립토차터드)
     * @example "C"
     */
    service: string;
    /**
     * 로그인ID
     * @example "crypto123"
     */
    username: string;
}

/** LoginResponse */
export interface LoginResponse {
    /**
     * 액세스토큰
     * @example "인증서버가 발행한 access_token"
     */
    accessToken?: string;
    error?: ErrorVo;
    /**
     * 리프레시토큰
     * @example "인증서버가 발행한 refresh_token"
     */
    refreshToken?: string;
}

/** ManagerLoginRequest */
export interface ManagerLoginRequest {
    /**
     * 관리자식별자
     * @format int64
     * @example 1
     */
    managerId: number;
    /**
     * 계정제공자
     * @example "C (크립토 차타드)"
     */
    provider?: string;
    /**
     * 역할
     * @example "ROLE_CS"
     */
    roles: string[];
    /**
     * 서비스
     * @example "C(크립토 차타드)"
     */
    service: string;
    /**
     * 로그인ID
     * @example "test"
     */
    username: string;
}

/** ModelAndView */
export interface ModelAndView {
    empty?: boolean;
    model?: object;
    modelMap?: Record<string, object>;
    reference?: boolean;
    status?:
        | 'ACCEPTED'
        | 'ALREADY_REPORTED'
        | 'BAD_GATEWAY'
        | 'BAD_REQUEST'
        | 'BANDWIDTH_LIMIT_EXCEEDED'
        | 'CHECKPOINT'
        | 'CONFLICT'
        | 'CONTINUE'
        | 'CREATED'
        | 'DESTINATION_LOCKED'
        | 'EXPECTATION_FAILED'
        | 'FAILED_DEPENDENCY'
        | 'FORBIDDEN'
        | 'FOUND'
        | 'GATEWAY_TIMEOUT'
        | 'GONE'
        | 'HTTP_VERSION_NOT_SUPPORTED'
        | 'IM_USED'
        | 'INSUFFICIENT_SPACE_ON_RESOURCE'
        | 'INSUFFICIENT_STORAGE'
        | 'INTERNAL_SERVER_ERROR'
        | 'I_AM_A_TEAPOT'
        | 'LENGTH_REQUIRED'
        | 'LOCKED'
        | 'LOOP_DETECTED'
        | 'METHOD_FAILURE'
        | 'METHOD_NOT_ALLOWED'
        | 'MOVED_PERMANENTLY'
        | 'MOVED_TEMPORARILY'
        | 'MULTIPLE_CHOICES'
        | 'MULTI_STATUS'
        | 'NETWORK_AUTHENTICATION_REQUIRED'
        | 'NON_AUTHORITATIVE_INFORMATION'
        | 'NOT_ACCEPTABLE'
        | 'NOT_EXTENDED'
        | 'NOT_FOUND'
        | 'NOT_IMPLEMENTED'
        | 'NOT_MODIFIED'
        | 'NO_CONTENT'
        | 'OK'
        | 'PARTIAL_CONTENT'
        | 'PAYLOAD_TOO_LARGE'
        | 'PAYMENT_REQUIRED'
        | 'PERMANENT_REDIRECT'
        | 'PRECONDITION_FAILED'
        | 'PRECONDITION_REQUIRED'
        | 'PROCESSING'
        | 'PROXY_AUTHENTICATION_REQUIRED'
        | 'REQUESTED_RANGE_NOT_SATISFIABLE'
        | 'REQUEST_ENTITY_TOO_LARGE'
        | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
        | 'REQUEST_TIMEOUT'
        | 'REQUEST_URI_TOO_LONG'
        | 'RESET_CONTENT'
        | 'SEE_OTHER'
        | 'SERVICE_UNAVAILABLE'
        | 'SWITCHING_PROTOCOLS'
        | 'TEMPORARY_REDIRECT'
        | 'TOO_EARLY'
        | 'TOO_MANY_REQUESTS'
        | 'UNAUTHORIZED'
        | 'UNAVAILABLE_FOR_LEGAL_REASONS'
        | 'UNPROCESSABLE_ENTITY'
        | 'UNSUPPORTED_MEDIA_TYPE'
        | 'UPGRADE_REQUIRED'
        | 'URI_TOO_LONG'
        | 'USE_PROXY'
        | 'VARIANT_ALSO_NEGOTIATES';
    view?: View;
    viewName?: string;
}

/** Mono«LoginResponse» */
export type MonoLoginResponse = object;

/** OAuth2AccessToken */
export interface OAuth2AccessToken {
    additionalInformation?: object;
    /** @format date-time */
    expiration?: string;
    expired?: boolean;
    /** @format int32 */
    expiresIn?: number;
    refreshToken?: OAuth2RefreshToken;
    /** @uniqueItems true */
    scope?: string[];
    tokenType?: string;
    value?: string;
}

/** OAuth2RefreshToken */
export type OAuth2RefreshToken = object;

/** RefreshTokenRequest */
export interface RefreshTokenRequest {
    /**
     * 리프레시토큰
     * @example "최초인증시 발행한 리프레시토큰"
     */
    refreshToken: string;
}

/** SnsLoginRequest */
export interface SnsLoginRequest {
    /**
     * 계정제공자
     * @example "GOOGLE, NAVER, KAKAO, APPLE 중 하나"
     */
    provider?: string;
    /**
     * 서비스
     * @example "C : 크립토 차타드"
     */
    service: string;
    /**
     * 로그인ID
     * @example "test"
     */
    username: string;
}

/** View */
export interface View {
    contentType?: string;
}

export interface AuthorizeUsingGetParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface AuthorizeUsingPutParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface AuthorizeUsingPostParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface AuthorizeUsingDeleteParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface AuthorizeUsingOptionsParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface AuthorizeUsingHeadParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface AuthorizeUsingPatchParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface AuthorizeUsingTraceParams {
    complete?: boolean;
    /** model */
    model?: object;
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface CheckTokenUsingPostParams {
    /** token */
    token: string;
}

export interface GetAccessTokenUsingGetParams {
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface PostAccessTokenUsingPostParams {
    name?: string;
    /** parameters */
    parameters: Record<string, string>;
}

export interface GetKeyUsingGetParams {
    name?: string;
}

export interface GetAccessConfirmationUsingGetParams {
    /** model */
    model?: object;
}

export interface GetAccessConfirmationUsingPutParams {
    /** model */
    model?: object;
}

export interface GetAccessConfirmationUsingPostParams {
    /** model */
    model?: object;
}

export interface GetAccessConfirmationUsingDeleteParams {
    /** model */
    model?: object;
}

export interface GetAccessConfirmationUsingOptionsParams {
    /** model */
    model?: object;
}

export interface GetAccessConfirmationUsingHeadParams {
    /** model */
    model?: object;
}

export interface GetAccessConfirmationUsingPatchParams {
    /** model */
    model?: object;
}

export interface GetAccessConfirmationUsingTraceParams {
    /** model */
    model?: object;
}

import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    ResponseType,
} from 'axios';
import * as qs from 'qs';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
    extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}

export type RequestParams = Omit<
    FullRequestParams,
    'body' | 'method' | 'query' | 'path'
    >;

export interface ApiConfig<SecurityDataType = unknown>
    extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({
                    securityWorker,
                    secure,
                    format,
                    ...axiosConfig
                }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({
            ...axiosConfig,
            baseURL:
                axiosConfig.baseURL ||
                'https://133-review-developmen-id0r3d.hqloud.blocksmith.xyz:443',
        });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    private mergeRequestParams(
        params1: AxiosRequestConfig,
        params2?: AxiosRequestConfig
    ): AxiosRequestConfig {
        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            // @ts-ignore
            headers: {
                ...(this.instance.defaults.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    public request = async <T = any, _E = any>({
                                                   secure,
                                                   path,
                                                   type,
                                                   query,
                                                   format,
                                                   body,
                                                   ...params
                                               }: FullRequestParams): Promise<AxiosResponse<T>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = (format && this.format) || void 0;

        if (type === ContentType.FormData) {
            const formData = new FormData();
            // @ts-ignore
            requestParams.headers.common = { Accept: '*/*' };
            // @ts-ignore
            requestParams.headers.post = {};
            // @ts-ignore
            requestParams.headers.put = {};

            const fromBody = body as any;
            for (const property in fromBody) {
                formData.append(property, fromBody[property]);
            }
            body = formData;
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                ...(type && type !== ContentType.FormData
                    ? { 'Content-Type': type }
                    : {}),
                ...(requestParams.headers || {}),
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path,
            paramsSerializer: {
                encode: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
            }
        });
    };
}

/**
 * @title Api Documentation
 * @version 1.0
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * @termsOfService urn:tos
 * @baseUrl https://133-review-developmen-id0r3d.hqloud.blocksmith.xyz:443
 * @contact
 *
 * Api Documentation
 */
export class Api<
    SecurityDataType extends unknown
    > extends HttpClient<SecurityDataType> {
    auth = {
        /**
         * @description 계정/비번 로그인입니다.
         *
         * @tags [인증] - 통합인증 API
         * @name LoginUsingPost
         * @summary 로그인
         * @request POST:/auth/login
         */
        loginUsingPost: (data: LoginRequest, params: RequestParams = {}) =>
            this.request<MonoLoginResponse, void>({
                path: `/auth/login`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 관리자로그인입니다.
         *
         * @tags [인증] - 통합인증 API
         * @name ManagerLoginUsingPost
         * @summary 관리자로그인
         * @request POST:/auth/managerlogin
         */
        managerLoginUsingPost: (
            data: ManagerLoginRequest,
            params: RequestParams = {}
        ) =>
            this.request<LoginResponse, void>({
                path: `/auth/managerlogin`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 모듈간 인증입니다.
         *
         * @tags [인증] - 통합인증 API
         * @name ModuleLoginUsingPost
         * @summary 모듈로그인
         * @request POST:/auth/moduleLogin
         */
        moduleLoginUsingPost: (params: RequestParams = {}) =>
            this.request<MonoLoginResponse, void>({
                path: `/auth/moduleLogin`,
                method: 'POST',
                ...params,
            }),

        /**
         * @description 리프레시토큰으로 액세스토큰을 새로 발행합니다.
         *
         * @tags [인증] - 통합인증 API
         * @name RefreshTokenUsingPost
         * @summary 리프레시토큰 요청
         * @request POST:/auth/refresh
         */
        refreshTokenUsingPost: (
            data: RefreshTokenRequest,
            params: RequestParams = {}
        ) =>
            this.request<MonoLoginResponse, void>({
                path: `/auth/refresh`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description SNS로그인
         *
         * @tags [인증] - 통합인증 API
         * @name SnsLoginUsingPost
         * @summary SNS로그인
         * @request POST:/auth/snsLogin
         */
        snsLoginUsingPost: (data: SnsLoginRequest, params: RequestParams = {}) =>
            this.request<MonoLoginResponse, void>({
                path: `/auth/snsLogin`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    oauth = {
        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingGet
         * @summary authorize
         * @request GET:/oauth/authorize
         * @deprecated
         */
        authorizeUsingGet: (
            query: AuthorizeUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingPut
         * @summary authorize
         * @request PUT:/oauth/authorize
         * @deprecated
         */
        authorizeUsingPut: (
            query: AuthorizeUsingPutParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'PUT',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingPost
         * @summary authorize
         * @request POST:/oauth/authorize
         * @deprecated
         */
        authorizeUsingPost: (
            query: AuthorizeUsingPostParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'POST',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingDelete
         * @summary authorize
         * @request DELETE:/oauth/authorize
         * @deprecated
         */
        authorizeUsingDelete: (
            query: AuthorizeUsingDeleteParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'DELETE',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingOptions
         * @summary authorize
         * @request OPTIONS:/oauth/authorize
         * @deprecated
         */
        authorizeUsingOptions: (
            query: AuthorizeUsingOptionsParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'OPTIONS',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingHead
         * @summary authorize
         * @request HEAD:/oauth/authorize
         * @deprecated
         */
        authorizeUsingHead: (
            query: AuthorizeUsingHeadParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'HEAD',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingPatch
         * @summary authorize
         * @request PATCH:/oauth/authorize
         * @deprecated
         */
        authorizeUsingPatch: (
            query: AuthorizeUsingPatchParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'PATCH',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authorization-endpoint
         * @name AuthorizeUsingTrace
         * @summary authorize
         * @request TRACE:/oauth/authorize
         * @deprecated
         */
        authorizeUsingTrace: (
            query: AuthorizeUsingTraceParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/authorize`,
                method: 'TRACE',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags check-token-endpoint
         * @name CheckTokenUsingPost
         * @summary checkToken
         * @request POST:/oauth/check_token
         * @deprecated
         */
        checkTokenUsingPost: (
            query: CheckTokenUsingPostParams,
            params: RequestParams = {}
        ) =>
            this.request<MonoLoginResponse, void>({
                path: `/oauth/check_token`,
                method: 'POST',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags token-endpoint
         * @name GetAccessTokenUsingGet
         * @summary getAccessToken
         * @request GET:/oauth/token
         * @deprecated
         */
        getAccessTokenUsingGet: (
            query: GetAccessTokenUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<OAuth2AccessToken, void>({
                path: `/oauth/token`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags token-endpoint
         * @name PostAccessTokenUsingPost
         * @summary postAccessToken
         * @request POST:/oauth/token
         * @deprecated
         */
        postAccessTokenUsingPost: (
            query: PostAccessTokenUsingPostParams,
            params: RequestParams = {}
        ) =>
            this.request<OAuth2AccessToken, void>({
                path: `/oauth/token`,
                method: 'POST',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags token-key-endpoint
         * @name GetKeyUsingGet
         * @summary getKey
         * @request GET:/oauth/token_key
         * @deprecated
         */
        getKeyUsingGet: (query: GetKeyUsingGetParams, params: RequestParams = {}) =>
            this.request<Record<string, string>, void>({
                path: `/oauth/token_key`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingGet
         * @summary getAccessConfirmation
         * @request GET:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingGet: (
            query: GetAccessConfirmationUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingPut
         * @summary getAccessConfirmation
         * @request PUT:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingPut: (
            query: GetAccessConfirmationUsingPutParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'PUT',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingPost
         * @summary getAccessConfirmation
         * @request POST:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingPost: (
            query: GetAccessConfirmationUsingPostParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'POST',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingDelete
         * @summary getAccessConfirmation
         * @request DELETE:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingDelete: (
            query: GetAccessConfirmationUsingDeleteParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'DELETE',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingOptions
         * @summary getAccessConfirmation
         * @request OPTIONS:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingOptions: (
            query: GetAccessConfirmationUsingOptionsParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'OPTIONS',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingHead
         * @summary getAccessConfirmation
         * @request HEAD:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingHead: (
            query: GetAccessConfirmationUsingHeadParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'HEAD',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingPatch
         * @summary getAccessConfirmation
         * @request PATCH:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingPatch: (
            query: GetAccessConfirmationUsingPatchParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'PATCH',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-approval-endpoint
         * @name GetAccessConfirmationUsingTrace
         * @summary getAccessConfirmation
         * @request TRACE:/oauth/confirm_access
         * @deprecated
         */
        getAccessConfirmationUsingTrace: (
            query: GetAccessConfirmationUsingTraceParams,
            params: RequestParams = {}
        ) =>
            this.request<ModelAndView, void>({
                path: `/oauth/confirm_access`,
                method: 'TRACE',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingGet
         * @summary handleError
         * @request GET:/oauth/error
         * @deprecated
         */
        handleErrorUsingGet: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingPut
         * @summary handleError
         * @request PUT:/oauth/error
         * @deprecated
         */
        handleErrorUsingPut: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'PUT',
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingPost
         * @summary handleError
         * @request POST:/oauth/error
         * @deprecated
         */
        handleErrorUsingPost: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingDelete
         * @summary handleError
         * @request DELETE:/oauth/error
         * @deprecated
         */
        handleErrorUsingDelete: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingOptions
         * @summary handleError
         * @request OPTIONS:/oauth/error
         * @deprecated
         */
        handleErrorUsingOptions: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'OPTIONS',
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingHead
         * @summary handleError
         * @request HEAD:/oauth/error
         * @deprecated
         */
        handleErrorUsingHead: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'HEAD',
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingPatch
         * @summary handleError
         * @request PATCH:/oauth/error
         * @deprecated
         */
        handleErrorUsingPatch: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'PATCH',
                ...params,
            }),

        /**
         * No description
         *
         * @tags whitelabel-error-endpoint
         * @name HandleErrorUsingTrace
         * @summary handleError
         * @request TRACE:/oauth/error
         * @deprecated
         */
        handleErrorUsingTrace: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/oauth/error`,
                method: 'TRACE',
                ...params,
            }),
    };
    error = {
        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingGet
         * @summary error
         * @request GET:/error
         */
        errorUsingGet: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingPut
         * @summary error
         * @request PUT:/error
         */
        errorUsingPut: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'PUT',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingPost
         * @summary error
         * @request POST:/error
         */
        errorUsingPost: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingDelete
         * @summary error
         * @request DELETE:/error
         */
        errorUsingDelete: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingOptions
         * @summary error
         * @request OPTIONS:/error
         */
        errorUsingOptions: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'OPTIONS',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingHead
         * @summary error
         * @request HEAD:/error
         */
        errorUsingHead: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'HEAD',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingPatch
         * @summary error
         * @request PATCH:/error
         */
        errorUsingPatch: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'PATCH',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorUsingTrace
         * @summary error
         * @request TRACE:/error
         */
        errorUsingTrace: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/error`,
                method: 'TRACE',
                ...params,
            }),
    };
    actuator = {
        /**
         * No description
         *
         * @tags operation-handler
         * @name HandleUsingGet
         * @summary handle
         * @request GET:/actuator/health
         */
        handleUsingGet: (
            data: Record<string, string>,
            params: RequestParams = {}
        ) =>
            this.request<MonoLoginResponse, void>({
                path: `/actuator/health`,
                method: 'GET',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags operation-handler
         * @name HandleUsingGet1
         * @summary handle
         * @request GET:/actuator/health/**
         */
        handleUsingGet1: (
            data: Record<string, string>,
            params: RequestParams = {}
        ) =>
            this.request<MonoLoginResponse, void>({
                path: `/actuator/health/**`,
                method: 'GET',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags web-mvc-links-handler
         * @name LinksUsingGet
         * @summary links
         * @request GET:/actuator
         */
        linksUsingGet: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/actuator`,
                method: 'GET',
                format: 'json',
                ...params,
            }),
    };
}
