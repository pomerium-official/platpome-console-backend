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

/**
 * AccountTermRequest
 * 계정 약관 업데이트
 */
export interface AccountTermRequest {
    /** 이용약관 식별자(배열) */
    termsIds: number[];
}

/**
 * AccountTermResponse
 * 통합회원 약관동의정보수정 응답VO
 */
export interface AccountTermResponse {
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    accountId?: number;
    error?: ErrorVo;
    /**
     * 이용약관 식별자(배열)
     * @example "1,2,3"
     */
    termsIds: number[];
}

/**
 * AccountTermStatusResponse
 * 통합회원 약관동의 정보 조회VO
 */
export interface AccountTermStatusResponse {
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    accountId?: number;
    error?: ErrorVo;
    /** 이용약관 동의 상태 목록 */
    termsStatusList: TermStatus[];
}

/** BlankResponse */
export interface BlankResponse {
    error?: ErrorVo;
}

/** CheckUsernameResponse */
export interface CheckUsernameResponse {
    error?: ErrorVo;
    /**
     * 중복여부
     * @example false
     */
    exist?: boolean;
}

/**
 * DelUserRequest
 * 통합회원삭제 요청VO
 */
export interface DelUserRequest {
    /**
     * 계정식별자
     * @example "[1, 2, 3]"
     */
    ids: number[];
}

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

/**
 * FindPasswordResponse
 * 빈객체 응답VO
 */
export interface FindPasswordResponse {
    error?: ErrorVo;
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    id?: number;
}

/**
 * FindUserResponse
 * 통합회원 아아디찾기 응답VO
 */
export interface FindUserResponse {
    error?: ErrorVo;
    /**
     * 로그인ID
     * @example "test"
     */
    username?: string;
}

/** Link */
export interface Link {
    href?: string;
    templated?: boolean;
}

/**
 * MatchUsernamePassword
 * 통합회원 로그인아이디,비밀번호 일치여부 요청
 */
export interface MatchUsernamePassword {
    /**
     * 비밀번호
     * @example "1234"
     */
    password: string;
    /**
     * 계정제공자
     * @example "GOOGLE, NAVER, KAKAO, APPLE 이중 하나"
     */
    provider?:
        | 'APPLE'
        | 'FACEBOOK'
        | 'GOOGLE'
        | 'INSTANTENEGY'
        | 'KAKAO'
        | 'NAVER'
        | 'SELF'
        | 'VIMUSE';
    /**
     * 서비스
     * @example "I"
     */
    service: string;
    /**
     * 로그인ID
     * @example "test"
     */
    username: string;
}

/**
 * ModUserRequest
 * 통합회원정보수정 요청VO
 */
export interface ModUserRequest {
    /**
     * 생년월일 (yyyyMMdd)
     * @example "19900101"
     */
    birthday?: string;
    /**
     * ci
     * @example "asdf1234"
     */
    ci?: string;
    /**
     * 이메일
     * @example "test@test.com"
     */
    email?: string;
    /**
     * 휴대폰번호
     * @example "01071178214"
     */
    mbtlnum?: string;
    /**
     * 이름
     * @example "홍길동"
     */
    name?: string;
    /**
     * 역할
     * @example "["USER","FOUNDATION","MANAGER"]"
     */
    roles?: ('ADMIN' | 'FOUNDATION' | 'MANAGER' | 'USER')[];
    /**
     * 성별 (M / F)
     * @example "M"
     */
    sexdstn?: string;
}

/**
 * ModUserResponse
 * 통합회원정보수정 응답VO
 */
export interface ModUserResponse {
    /**
     * 생년월일
     * @example "19900101"
     */
    birthday?: string;
    /**
     * ci
     * @example "asdf1234"
     */
    ci?: string;
    /**
     * 이메일
     * @example "test@test.com"
     */
    email?: string;
    error?: ErrorVo;
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * 휴대폰번호
     * @example "01071178214"
     */
    mbtlnum?: string;
    /**
     * 수정일
     * @format date-time
     */
    modDt?: string;
    /**
     * 이름
     * @example "홍길동"
     */
    name?: string;
    /**
     * 역할
     * @example "["USER","FOUNDATION","MANAGER"]"
     */
    roles?: ('ADMIN' | 'FOUNDATION' | 'MANAGER' | 'USER')[];
    /**
     * 성별 (M / F)
     * @example "M"
     */
    sexdstn?: string;
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

/** PageInfo«UserInfo» */
export interface PageInfoUserInfo {
    /** @format int32 */
    endRow?: number;
    /** @format int32 */
    firstPage?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    /** @format int32 */
    lastPage?: number;
    list?: UserInfo[];
    /** @format int32 */
    navigateFirstPage?: number;
    /** @format int32 */
    navigateLastPage?: number;
    /** @format int32 */
    navigatePages?: number;
    navigatepageNums?: number[];
    /** @format int32 */
    nextPage?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    /** @format int32 */
    pages?: number;
    /** @format int32 */
    prePage?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    startRow?: number;
    /** @format int64 */
    total?: number;
}

/**
 * RegUserRequest
 * 통합회원가입 요청VO
 */
export interface RegUserRequest {
    /**
     * 주소
     * @example "서울시 강남구 도산대로8길"
     */
    address?: string;
    /**
     * 생년월일
     * @example "20020101"
     */
    birthday?: string;
    /**
     * CI (인증기관에서 받은 CI값)
     * @example "A000000000000001"
     */
    ci?: string;
    /**
     * 상세주소
     * @example "17-11 빌딩AN 2층"
     */
    detailaddress?: string;
    /**
     * 이메일
     * @example "test@test.com"
     */
    email?: string;
    /**
     * 휴대폰번호
     * @example "01012341234"
     */
    mbtlnum?: string;
    /**
     * 이름
     * @example "홍길동"
     */
    name: string;
    /** 비밀번호 */
    password?: string;
    /**
     * 계정제공자 (APPLE:애플, GOOGLE:구글, NAVER:네이버, KAKAO:카카오, VIMUSE:비뮤즈, SELF:서비스 자체가입,이메일가입등 )
     * @example "SELF"
     */
    provider?:
        | 'APPLE'
        | 'FACEBOOK'
        | 'GOOGLE'
        | 'INSTANTENEGY'
        | 'KAKAO'
        | 'NAVER'
        | 'SELF'
        | 'VIMUSE';
    /** 역할 */
    roles?: ('ADMIN' | 'FOUNDATION' | 'MANAGER' | 'USER')[];
    /**
     * 서비스코드 (C: 크립토차타드)
     * @example "C"
     */
    service: string;
    /**
     * 성별 (F:여자, M:남자)
     * @example "M"
     */
    sexdstn?: string;
    /** 이용약관 식별자(배열, terms_mast에 등록 된 아이디) */
    termsIds?: number[];
    /**
     * 로그인ID
     * @example "test"
     */
    username: string;
    /**
     * 계정공급자의 UUID (계정공급자가 SNS가 아니라면 값이 없어도 됨)
     * @example "1234567890"
     */
    uuid?: string;
    /**
     * 우편번호
     * @example "01100"
     */
    zipcode?: string;
}

/**
 * RegUserResponse
 * 통합회원가입 응답VO
 */
export interface RegUserResponse {
    /**
     * 생년월일
     * @example "19900101"
     */
    birthday?: string;
    /**
     * 이메일
     * @example "test@test.com"
     */
    email?: string;
    error?: ErrorVo;
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * 휴대폰번호
     * @example "01012341234"
     */
    mbtlnum?: string;
    /**
     * 이름
     * @example "홍길동"
     */
    name?: string;
    /**
     * 가입일
     * @format date-time
     */
    regDt?: string;
    /** 역할 */
    roles?: ('ADMIN' | 'FOUNDATION' | 'MANAGER' | 'USER')[];
    /**
     * 서비스
     * @example "V or I or etc..."
     */
    service?: string;
    /**
     * 성별
     * @example "M or F"
     */
    sexdstn?: string;
    /**
     * 로그인ID
     * @example "test"
     */
    username?: string;
}

/**
 * ResetPasswordRequest
 * 통합회원 비밀번호재설정 요청VO
 */
export interface ResetPasswordRequest {
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * 비밀번호
     * @example "1234"
     */
    password: string;
}

/**
 * ResetPasswordSelfRequest
 * 통합회원 비밀번호재설정 요청VO
 */
export interface ResetPasswordSelfRequest {
    /**
     * 이름
     * @example "홍길동"
     */
    name: string;
    /**
     * 재설정 비밀번호
     * @example "1234"
     */
    password: string;
    /**
     * 로그인아이디
     * @example "test@test.com"
     */
    username: string;
}

/**
 * SecedeRequest
 * 탈퇴요청 VO
 */
export interface SecedeRequest {
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    accountId: number;
    /**
     * 탈퇴사유
     * @example "탈퇴사유"
     */
    reason: string;
}

/**
 * TermStatus
 * 통합회원 약관동의 상태 VO
 */
export interface TermStatus {
    /**
     * 동의여부
     * @example "Y"
     */
    agreeYn?: string;
    name?: string;
    /**
     * 필수여부
     * @example "Y"
     */
    requireYn?: string;
    /**
     * 약관식별자
     * @format int64
     * @example 1
     */
    termsId?: number;
    ver?: string;
}

/**
 * UserInfo
 * 통합회원정보 VO
 */
export interface UserInfo {
    /**
     * 주소
     * @example "서울시 강남구 도산대로8길"
     */
    address?: string;
    /**
     * 생년월일
     * @example "19900101"
     */
    birthday?: string;
    /**
     * ci
     * @example "asdf1234"
     */
    ci?: string;
    /**
     * 상세주소
     * @example "17-11 빌딩AN 2층"
     */
    detailaddress?: string;
    /**
     * 이메일
     * @example "test@test.com"
     */
    email?: string;
    error?: ErrorVo;
    /**
     * 계정식별자
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * 휴대폰번호
     * @example "01071178214"
     */
    mbtlnum?: string;
    /**
     * 이름
     * @example "홍길동"
     */
    name?: string;
    /**
     * 성별 (F:여자, M:남자)
     * @example "M"
     */
    sexdstn?: string;
    /**
     * 로그인ID
     * @example "test"
     */
    username?: string;
    /**
     * 우편번호
     * @example "01100"
     */
    zipcode?: string;
}

/** View */
export interface View {
    contentType?: string;
}

export interface GetUserTermsUsingGetParams {
    /** 서비스명 */
    serviceName: string;
    /**
     * accountId
     * @format int64
     */
    accountId: number;
}

export interface UserListUsingGetParams {
    /**
     * 페이지번호
     * @format int32
     */
    offset: number;
    /**
     * 페이지당 리스트 수
     * @format int32
     */
    limit: number;
    /** 검색어-이름 */
    name?: string;
}

export interface CheckUsernameUsingGetParams {
    /** 로그인ID */
    username: string;
    /** 서비스 */
    service: string;
    /** 계정공급자 */
    provider: string;
}

export interface FindUserUsingGetParams {
    /** 이름 */
    name: string;
    /** 생년월일 */
    birthday: string;
}

export interface FindPwUsingGetParams {
    /** 로그인ID */
    username: string;
    /** 이름 */
    name: string;
    /** 생년월일 */
    birthday: string;
}

export interface FindPwByNameAndMbtlnumUsingGetParams {
    /** 이름 */
    name: string;
    /** 휴대폰번호 */
    mbtlnum: string;
}

export interface FindUserByNameAndMbtlnumUsingGetParams {
    /** 이름 */
    name: string;
    /** 휴대폰번호 */
    mbtlnum: string;
}

export interface FindPwByUsernameAndMbtlnumUsingGetParams {
    /** 휴대폰번호 */
    mbtlnum: string;
    /** username */
    username: string;
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
                'http://132-review-developmen-id0r3d.hqloud.xyz:80',
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
 * @baseUrl http://132-review-developmen-id0r3d.hqloud.xx.xyz:80
 * @contact
 *
 * Api Documentation
 */
export class Api<
    SecurityDataType extends unknown
    > extends HttpClient<SecurityDataType> {
    error = {
        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingGet
         * @summary errorHtml
         * @request GET:/error
         */
        errorHtmlUsingGet: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/error`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingPut
         * @summary errorHtml
         * @request PUT:/error
         */
        errorHtmlUsingPut: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/error`,
                method: 'PUT',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingPost
         * @summary errorHtml
         * @request POST:/error
         */
        errorHtmlUsingPost: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/error`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingDelete
         * @summary errorHtml
         * @request DELETE:/error
         */
        errorHtmlUsingDelete: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/error`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingOptions
         * @summary errorHtml
         * @request OPTIONS:/error
         */
        errorHtmlUsingOptions: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/error`,
                method: 'OPTIONS',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingHead
         * @summary errorHtml
         * @request HEAD:/error
         */
        errorHtmlUsingHead: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/error`,
                method: 'HEAD',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingPatch
         * @summary errorHtml
         * @request PATCH:/error
         */
        errorHtmlUsingPatch: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
                path: `/error`,
                method: 'PATCH',
                ...params,
            }),

        /**
         * No description
         *
         * @tags basic-error-controller
         * @name ErrorHtmlUsingTrace
         * @summary errorHtml
         * @request TRACE:/error
         */
        errorHtmlUsingTrace: (params: RequestParams = {}) =>
            this.request<ModelAndView, void>({
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
            this.request<object, void>({
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
            this.request<object, void>({
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
    api = {
        /**
         * @description 약관 동의 상태 조회
         *
         * @tags [회원] - 통합회원 API
         * @name GetUserTermsUsingGet
         * @summary 약관 동의 상태 조회
         * @request GET:/api/users/{accountId}/terms
         */
        getUserTermsUsingGet: (
            { accountId, ...query }: GetUserTermsUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<AccountTermStatusResponse, void>({
                path: `/api/users/${accountId}/terms`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 약관 동의 수정
         *
         * @tags [회원] - 통합회원 API
         * @name UpdateUserTermsUsingPut
         * @summary 약관 동의 수정
         * @request PUT:/api/users/{accountId}/terms
         */
        updateUserTermsUsingPut: (
            accountId: number,
            data: AccountTermRequest,
            params: RequestParams = {}
        ) =>
            this.request<AccountTermResponse, void>({
                path: `/api/users/${accountId}/terms`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 회원 리스트
         *
         * @tags [회원] - 통합회원 API
         * @name UserListUsingGet
         * @summary 회원 리스트
         * @request GET:/api/users
         */
        userListUsingGet: (
            query: UserListUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<PageInfoUserInfo, void>({
                path: `/api/users`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 회원 등록
         *
         * @tags [회원] - 통합회원 API
         * @name RegisterUserUsingPost
         * @summary 회원 등록
         * @request POST:/api/users
         */
        registerUserUsingPost: (data: RegUserRequest, params: RequestParams = {}) =>
            this.request<RegUserResponse, void>({
                path: `/api/users`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 다수 회원 삭제
         *
         * @tags [회원] - 통합회원 API
         * @name DeleteUsersUsingDelete
         * @summary 다수 회원 삭제
         * @request DELETE:/api/users
         */
        deleteUsersUsingDelete: (
            data: DelUserRequest,
            params: RequestParams = {}
        ) =>
            this.request<BlankResponse, void>({
                path: `/api/users`,
                method: 'DELETE',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 아이디 중복체크
         *
         * @tags [회원] - 통합회원 API
         * @name CheckUsernameUsingGet
         * @summary 아이디 중복체크
         * @request GET:/api/users/checkUsername
         */
        checkUsernameUsingGet: (
            query: CheckUsernameUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<CheckUsernameResponse, void>({
                path: `/api/users/checkUsername`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 아이디 찾기
         *
         * @tags [회원] - 통합회원 API
         * @name FindUserUsingGet
         * @summary 아이디 찾기
         * @request GET:/api/users/find
         */
        findUserUsingGet: (
            query: FindUserUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<FindUserResponse, void>({
                path: `/api/users/find`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 비밀번호재설정을 위한 최초 기본정보를 입력받고 데이터 존재유무를 반환합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name FindPwUsingGet
         * @summary 비밀번호재설정(1)
         * @request GET:/api/users/findpw
         * @deprecated
         */
        findPwUsingGet: (query: FindPwUsingGetParams, params: RequestParams = {}) =>
            this.request<FindPasswordResponse, void>({
                path: `/api/users/findpw`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 인증이 필요한 API입니다.
         *
         * @tags [회원] - 통합회원 API
         * @name IsAuthenticatedApiUsingPost
         * @summary 인증필요API예시
         * @request POST:/api/users/isAuthenticatedApi
         * @deprecated
         */
        isAuthenticatedApiUsingPost: (params: RequestParams = {}) =>
            this.request<Record<string, object>, void>({
                path: `/api/users/isAuthenticatedApi`,
                method: 'POST',
                ...params,
            }),

        /**
         * @description 통합회원 로그인아이디,비밀번호 일치여부
         *
         * @tags [회원] - 통합회원 API
         * @name MatchUsernamePasswordUsingPost
         * @summary 통합회원 로그인아이디,비밀번호 일치여부
         * @request POST:/api/users/matchUsernamePassword
         */
        matchUsernamePasswordUsingPost: (
            data: MatchUsernamePassword,
            params: RequestParams = {}
        ) =>
            this.request<boolean, void>({
                path: `/api/users/matchUsernamePassword`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingGet
         * @summary 내 정보 조회
         * @request GET:/api/users/me
         * @deprecated
         */
        userMeUsingGet: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'GET',
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingPut
         * @summary 내 정보 조회
         * @request PUT:/api/users/me
         * @deprecated
         */
        userMeUsingPut: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'PUT',
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingPost
         * @summary 내 정보 조회
         * @request POST:/api/users/me
         * @deprecated
         */
        userMeUsingPost: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'POST',
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingDelete
         * @summary 내 정보 조회
         * @request DELETE:/api/users/me
         * @deprecated
         */
        userMeUsingDelete: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingOptions
         * @summary 내 정보 조회
         * @request OPTIONS:/api/users/me
         * @deprecated
         */
        userMeUsingOptions: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'OPTIONS',
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingHead
         * @summary 내 정보 조회
         * @request HEAD:/api/users/me
         * @deprecated
         */
        userMeUsingHead: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'HEAD',
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingPatch
         * @summary 내 정보 조회
         * @request PATCH:/api/users/me
         * @deprecated
         */
        userMeUsingPatch: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'PATCH',
                ...params,
            }),

        /**
         * @description AccessToken에 명시된 회원식별자의 정보를 조회합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name UserMeUsingTrace
         * @summary 내 정보 조회
         * @request TRACE:/api/users/me
         * @deprecated
         */
        userMeUsingTrace: (params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/me`,
                method: 'TRACE',
                ...params,
            }),

        /**
         * @description 비밀번호재설정을 위한 최초 기본정보를 입력받고 데이터 존재유무를 반환합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name FindPwByNameAndMbtlnumUsingGet
         * @summary 비밀번호재설정(1) : 랜딩페이지 전용
         * @request GET:/api/users/password
         * @deprecated
         */
        findPwByNameAndMbtlnumUsingGet: (
            query: FindPwByNameAndMbtlnumUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<FindPasswordResponse, void>({
                path: `/api/users/password`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 비밀번호재설정을 위한 최초 기본정보를 입력받고 데이터 존재유무를 반환합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name ResetPwUsingPost1
         * @summary 비밀번호재설정(3)
         * @request POST:/api/users/password/self
         */
        resetPwUsingPost1: (
            data: ResetPasswordSelfRequest,
            params: RequestParams = {}
        ) =>
            this.request<FindPasswordResponse, void>({
                path: `/api/users/password/self`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Front로 부터 새로운 비밀번호를 입력받고 저장합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name ResetPwUsingPost
         * @summary 비밀번호재설정(2)
         * @request POST:/api/users/resetpw
         * @deprecated
         */
        resetPwUsingPost: (
            data: ResetPasswordRequest,
            params: RequestParams = {}
        ) =>
            this.request<BlankResponse, void>({
                path: `/api/users/resetpw`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 회원 탈퇴
         *
         * @tags [회원] - 통합회원 API
         * @name SecedeUsingPost
         * @summary 회원 탈퇴
         * @request POST:/api/users/secede
         */
        secedeUsingPost: (data: SecedeRequest, params: RequestParams = {}) =>
            this.request<boolean, void>({
                path: `/api/users/secede`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 아이디 찾기
         *
         * @tags [회원] - 통합회원 API
         * @name FindUserByNameAndMbtlnumUsingGet
         * @summary 아이디 찾기 : 랜딩페이지 전용
         * @request GET:/api/users/username
         * @deprecated
         */
        findUserByNameAndMbtlnumUsingGet: (
            query: FindUserByNameAndMbtlnumUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<FindUserResponse, void>({
                path: `/api/users/username`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 회원 단건 조회
         *
         * @tags [회원] - 통합회원 API
         * @name UserDetailUsingGet
         * @summary 회원 조회
         * @request GET:/api/users/{accountId}
         */
        userDetailUsingGet: (accountId: number, params: RequestParams = {}) =>
            this.request<UserInfo, void>({
                path: `/api/users/${accountId}`,
                method: 'GET',
                ...params,
            }),

        /**
         * @description 회원 수정
         *
         * @tags [회원] - 통합회원 API
         * @name UpdateUserUsingPut
         * @summary 회원 수정
         * @request PUT:/api/users/{accountId}
         */
        updateUserUsingPut: (
            accountId: number,
            data: ModUserRequest,
            params: RequestParams = {}
        ) =>
            this.request<ModUserResponse, void>({
                path: `/api/users/${accountId}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description 회원 삭제
         *
         * @tags [회원] - 통합회원 API
         * @name DeleteUserUsingDelete
         * @summary 회원 삭제
         * @request DELETE:/api/users/{accountId}
         */
        deleteUserUsingDelete: (accountId: number, params: RequestParams = {}) =>
            this.request<BlankResponse, void>({
                path: `/api/users/${accountId}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * @description 비밀번호재설정을 위한 최초 기본정보를 입력받고 데이터 존재유무를 반환합니다.
         *
         * @tags [회원] - 통합회원 API
         * @name FindPwByUsernameAndMbtlnumUsingGet
         * @summary 비밀번호재설정(1) : 랜딩페이지 전용
         * @request GET:/api/users/{username}/password
         * @deprecated
         */
        findPwByUsernameAndMbtlnumUsingGet: (
            { username, ...query }: FindPwByUsernameAndMbtlnumUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<FindPasswordResponse, void>({
                path: `/api/users/${username}/password`,
                method: 'GET',
                query: query,
                ...params,
            }),
    };
}
