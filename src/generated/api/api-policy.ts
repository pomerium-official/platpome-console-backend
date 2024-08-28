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
 * CollectionModel«ServiceEntity»
 * Resources of ServiceEntity
 */
export interface CollectionModelServiceEntity {
    /** Embedded collection of ServiceEntity */
    _embedded: EmbeddedCollectionServiceEntity;
    /** Link collection */
    _links: Record<string, Link>;
}

/**
 * CollectionModel«TermsEntity»
 * Resources of TermsEntity
 */
export interface CollectionModelTermsEntity {
    /** Embedded collection of TermsEntity */
    _embedded: EmbeddedCollectionTermsEntity;
    /** Link collection */
    _links: Record<string, Link>;
}

/**
 * CollectionModel«TermsGroupEntity»
 * Resources of TermsGroupEntity
 */
export interface CollectionModelTermsGroupEntity {
    /** Embedded collection of TermsGroupEntity */
    _embedded: EmbeddedCollectionTermsGroupEntity;
    /** Link collection */
    _links: Record<string, Link>;
}

/**
 * EmbeddedCollection«ServiceEntity»
 * Embedded collection of ServiceEntity
 */
export interface EmbeddedCollectionServiceEntity {
    /** Resource collection */
    serviceEntities: ServiceEntity[];
}

/**
 * EmbeddedCollection«TermsEntity»
 * Embedded collection of TermsEntity
 */
export interface EmbeddedCollectionTermsEntity {
    /** Resource collection */
    termsEntities: TermsEntity[];
}

/**
 * EmbeddedCollection«TermsGroupEntity»
 * Embedded collection of TermsGroupEntity
 */
export interface EmbeddedCollectionTermsGroupEntity {
    /** Resource collection */
    termsGroupEntities: TermsGroupEntity[];
}

/** EntityModel«ServiceEntity» */
export interface EntityModelServiceEntity {
    contents?: string;
    delYn?: 'N' | 'Y';
    /** @format int64 */
    id?: number;
    links?: Links;
    /** @format date-time */
    modDt?: string;
    /** @format int64 */
    modId?: number;
    name?: string;
    /** @format date-time */
    regDt?: string;
    /** @format int64 */
    regId?: number;
    termsEntityList?: TermsEntity[];
}

/** EntityModel«TermsEntity» */
export interface EntityModelTermsEntity {
    contents?: string;
    delYn?: 'N' | 'Y';
    /** @format int64 */
    id?: number;
    links?: Links;
    /** @format date-time */
    modDt?: string;
    /** @format int64 */
    modId?: number;
    name?: string;
    /** @format date-time */
    regDt?: string;
    /** @format int64 */
    regId?: number;
    requireYn?: 'N' | 'Y';
    serviceEntity?: ServiceEntity;
    termsGroupEntity?: TermsGroupEntity;
    ver?: string;
}

/** EntityModel«TermsGroupEntity» */
export interface EntityModelTermsGroupEntity {
    description?: string;
    /** @format int64 */
    id?: number;
    links?: Links;
    /** @format date-time */
    modDt?: string;
    /** @format int64 */
    modId?: number;
    name?: string;
    refPage?: string;
    /** @format date-time */
    regDt?: string;
    /** @format int64 */
    regId?: number;
    serviceEntity?: ServiceEntity;
    /** @format int32 */
    sort?: number;
    termsEntityList?: TermsEntity[];
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

/** Link */
export interface Link {
    href?: string;
    templated?: boolean;
}

/** LinkRelation */
export type LinkRelation = object;

/** Links */
export interface Links {
    empty?: boolean;
}

/** ListVo«TermsInfo» */
export interface ListVoTermsInfo {
    content?: TermsInfo[];
    error?: ErrorVo;
    /** @format int32 */
    size?: number;
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

/** RepresentationModel«object» */
export interface RepresentationModelObject {
    links?: Links;
}

/** ServiceEntity */
export interface ServiceEntity {
    contents?: string;
    delYn?: 'N' | 'Y';
    /** @format int64 */
    id?: number;
    /** @format date-time */
    modDt?: string;
    /** @format int64 */
    modId?: number;
    name?: string;
    /** @format date-time */
    regDt?: string;
    /** @format int64 */
    regId?: number;
    termsEntityList?: TermsEntity[];
}

/** TemplateVariable */
export interface TemplateVariable {
    description?: string;
    name?: string;
    type?:
        | 'COMPOSITE_PARAM'
        | 'FRAGMENT'
        | 'PATH_VARIABLE'
        | 'REQUEST_PARAM'
        | 'REQUEST_PARAM_CONTINUED'
        | 'SEGMENT';
}

/**
 * TermsDetail
 * 약관정보 상세 VO
 */
export interface TermsDetail {
    /**
     * 약관내용
     * @example "1조1항 개인정보동의 ........"
     */
    contents?: string;
    error?: ErrorVo;
    /**
     * 약관식별자
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * 약관제목
     * @example "개인정보이용동의"
     */
    name?: string;
    /**
     * 약관등록일
     * @format date-time
     */
    regDt?: string;
    /**
     * 필수여부
     * @example "Y"
     */
    require?: 'N' | 'Y';
    /**
     * 약관버전
     * @example "0.1"
     */
    ver?: string;
}

/** TermsEntity */
export interface TermsEntity {
    contents?: string;
    delYn?: 'N' | 'Y';
    /** @format int64 */
    id?: number;
    /** @format date-time */
    modDt?: string;
    /** @format int64 */
    modId?: number;
    name?: string;
    /** @format date-time */
    regDt?: string;
    /** @format int64 */
    regId?: number;
    requireYn?: 'N' | 'Y';
    serviceEntity?: ServiceEntity;
    termsGroupEntity?: TermsGroupEntity;
    ver?: string;
}

/** TermsGroupEntity */
export interface TermsGroupEntity {
    description?: string;
    /** @format int64 */
    id?: number;
    /** @format date-time */
    modDt?: string;
    /** @format int64 */
    modId?: number;
    name?: string;
    refPage?: string;
    /** @format date-time */
    regDt?: string;
    /** @format int64 */
    regId?: number;
    serviceEntity?: ServiceEntity;
    /** @format int32 */
    sort?: number;
    termsEntityList?: TermsEntity[];
}

/**
 * TermsInfo
 * 약관정보 VO
 */
export interface TermsInfo {
    /**
     * 약관내용
     * @example "1조1항 개인정보동의 ........"
     */
    contents?: string;
    /**
     * 약관그룹명
     * @example "서비스 이용약관 전체 동의"
     */
    groupName?: string;
    /**
     * 약관내용 유무, includeContentYn과 관련없이 나옵니다.
     * @example false
     */
    hasContents?: boolean;
    /**
     * 약관식별자
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * 약관제목
     * @example "개인정보이용동의"
     */
    name?: string;
    /**
     * 참조페이지
     * @example "LOGIN"
     */
    refPage?: string;
    /**
     * 약관등록일
     * @format date-time
     */
    regDt?: string;
    /**
     * 필수여부
     * @example "Y"
     */
    require?: 'N' | 'Y';
    /**
     * 약관버전
     * @example "0.1"
     */
    ver?: string;
}

/** UriTemplate */
export interface UriTemplate {
    variableNames?: string[];
    variables?: TemplateVariable[];
}

/** View */
export interface View {
    contentType?: string;
}

export interface FindAllServiceEntityUsingGetParams {
    /**
     * page
     * @format int32
     */
    page?: number;
    /**
     * size
     * @format int32
     */
    size?: number;
    /** sort */
    sort?: string;
}

export interface FindByNameAndDelYnServiceEntityUsingGetParams {
    /** name */
    name?: string;
    /** delYn */
    delYn?: 'N' | 'Y';
}

export interface FindAllTermsEntityUsingGetParams {
    /**
     * page
     * @format int32
     */
    page?: number;
    /**
     * size
     * @format int32
     */
    size?: number;
    /** sort */
    sort?: string;
}

export interface FindByNameAndDelYnTermsEntityUsingGetParams {
    /** name */
    name?: string;
    /** delYn */
    delYn?: 'N' | 'Y';
}

export interface FindByNameAndServiceEntityIdTermsEntityUsingGetParams {
    /** name */
    name?: string;
    /**
     * serviceId
     * @format int64
     */
    serviceId?: number;
}

export interface GetLatestTermsListTermsEntityUsingGetParams {
    /**
     * id
     * @format int64
     */
    id?: number;
}

export interface FindAllTermsGroupEntityUsingGetParams {
    /**
     * page
     * @format int32
     */
    page?: number;
    /**
     * size
     * @format int32
     */
    size?: number;
    /** sort */
    sort?: string;
}

export interface FindByRefPageAndServiceEntityIdTermsGroupEntityUsingGetParams {
    /** refPage */
    refPage?: string;
    /**
     * serviceEntityId
     * @format int64
     */
    serviceEntityId?: number;
}

export interface TermsListUsingGetParams {
    /** 서비스명(크립토차타드: C) */
    serviceName: string;
}

export interface TermsLatestListUsingGet1Params {
    /** 서비스명(크립토차타드: C) */
    serviceName: string;
    /** 약관명 */
    termsName: string;
}

export interface TermsLatestListUsingGetParams {
    /** 서비스명 */
    name: string;
    /** 참조페이지(미입력시 무관) */
    refPage?: string;
    /** 내용포함여부(Y:포함,N:미포함) */
    includeContentYn?: string;
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
                'https://134-review-developmen-id0r3d.hqloud.blocksmith.xyz:443',
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
 * @baseUrl https://134-review-developmen-id0r3d.hqloud.blocksmith.xyz:443
 * @contact
 *
 * Api Documentation
 */
export class Api<
    SecurityDataType extends unknown
    > extends HttpClient<SecurityDataType> {
    serviceEntities = {
        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name ServiceEntityTermsEntityListUsingGet
         * @summary serviceEntityTermsEntityList
         * @request GET:/serviceEntities/{id}/termsEntityList
         */
        serviceEntityTermsEntityListUsingGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/serviceEntities/${id}/termsEntityList`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name ServiceEntityTermsEntityListUsingPut
         * @summary serviceEntityTermsEntityList
         * @request PUT:/serviceEntities/{id}/termsEntityList
         */
        serviceEntityTermsEntityListUsingPut: (
            id: number,
            data: string[],
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/serviceEntities/${id}/termsEntityList`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name ServiceEntityTermsEntityListUsingPost
         * @summary serviceEntityTermsEntityList
         * @request POST:/serviceEntities/{id}/termsEntityList
         */
        serviceEntityTermsEntityListUsingPost: (
            id: number,
            data: string[],
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/serviceEntities/${id}/termsEntityList`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name ServiceEntityTermsEntityListUsingDelete1
         * @summary serviceEntityTermsEntityList
         * @request DELETE:/serviceEntities/{id}/termsEntityList
         */
        serviceEntityTermsEntityListUsingDelete1: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/serviceEntities/${id}/termsEntityList`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name ServiceEntityTermsEntityListUsingPatch
         * @summary serviceEntityTermsEntityList
         * @request PATCH:/serviceEntities/{id}/termsEntityList
         */
        serviceEntityTermsEntityListUsingPatch: (
            id: number,
            data: string[],
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/serviceEntities/${id}/termsEntityList`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name ServiceEntityTermsEntityListUsingGet1
         * @summary serviceEntityTermsEntityList
         * @request GET:/serviceEntities/{id}/termsEntityList/{termsentityId}
         */
        serviceEntityTermsEntityListUsingGet1: (
            id: number,
            termsentityId: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsEntity, void>({
                path: `/serviceEntities/${id}/termsEntityList/${termsentityId}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name ServiceEntityTermsEntityListUsingDelete
         * @summary serviceEntityTermsEntityList
         * @request DELETE:/serviceEntities/{id}/termsEntityList/{termsentityId}
         */
        serviceEntityTermsEntityListUsingDelete: (
            id: number,
            termsentityId: string,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/serviceEntities/${id}/termsEntityList/${termsentityId}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name FindAllServiceEntityUsingGet
         * @summary findAllServiceEntity
         * @request GET:/serviceEntities
         */
        findAllServiceEntityUsingGet: (
            query: FindAllServiceEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelServiceEntity, void>({
                path: `/serviceEntities`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name SaveServiceEntityUsingPost
         * @summary saveServiceEntity
         * @request POST:/serviceEntities
         */
        saveServiceEntityUsingPost: (
            data: ServiceEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/serviceEntities`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name FindByNameAndDelYnServiceEntityUsingGet
         * @summary findByNameAndDelYnServiceEntity
         * @request GET:/serviceEntities/search/findByNameAndDelYn
         */
        findByNameAndDelYnServiceEntityUsingGet: (
            query: FindByNameAndDelYnServiceEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/serviceEntities/search/findByNameAndDelYn`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name FindByIdServiceEntityUsingGet
         * @summary findByIdServiceEntity
         * @request GET:/serviceEntities/{id}
         */
        findByIdServiceEntityUsingGet: (id: number, params: RequestParams = {}) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/serviceEntities/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name SaveServiceEntityUsingPut
         * @summary saveServiceEntity
         * @request PUT:/serviceEntities/{id}
         */
        saveServiceEntityUsingPut: (
            id: number,
            data: ServiceEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/serviceEntities/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name DeleteServiceEntityUsingDelete
         * @summary deleteServiceEntity
         * @request DELETE:/serviceEntities/{id}
         */
        deleteServiceEntityUsingDelete: (id: number, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/serviceEntities/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ServiceEntity Entity
         * @name SaveServiceEntityUsingPatch
         * @summary saveServiceEntity
         * @request PATCH:/serviceEntities/{id}
         */
        saveServiceEntityUsingPatch: (
            id: number,
            data: ServiceEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/serviceEntities/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    termsEntities = {
        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityServiceEntityUsingGet
         * @summary termsEntityServiceEntity
         * @request GET:/termsEntities/{id}/serviceEntity
         */
        termsEntityServiceEntityUsingGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsEntities/${id}/serviceEntity`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityServiceEntityUsingPut
         * @summary termsEntityServiceEntity
         * @request PUT:/termsEntities/{id}/serviceEntity
         */
        termsEntityServiceEntityUsingPut: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsEntities/${id}/serviceEntity`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityServiceEntityUsingPost
         * @summary termsEntityServiceEntity
         * @request POST:/termsEntities/{id}/serviceEntity
         */
        termsEntityServiceEntityUsingPost: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsEntities/${id}/serviceEntity`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityServiceEntityUsingDelete
         * @summary termsEntityServiceEntity
         * @request DELETE:/termsEntities/{id}/serviceEntity
         */
        termsEntityServiceEntityUsingDelete: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/termsEntities/${id}/serviceEntity`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityServiceEntityUsingPatch
         * @summary termsEntityServiceEntity
         * @request PATCH:/termsEntities/{id}/serviceEntity
         */
        termsEntityServiceEntityUsingPatch: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsEntities/${id}/serviceEntity`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityTermsGroupEntityUsingGet
         * @summary termsEntityTermsGroupEntity
         * @request GET:/termsEntities/{id}/termsGroupEntity
         */
        termsEntityTermsGroupEntityUsingGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsEntities/${id}/termsGroupEntity`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityTermsGroupEntityUsingPut
         * @summary termsEntityTermsGroupEntity
         * @request PUT:/termsEntities/{id}/termsGroupEntity
         */
        termsEntityTermsGroupEntityUsingPut: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsEntities/${id}/termsGroupEntity`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityTermsGroupEntityUsingPost
         * @summary termsEntityTermsGroupEntity
         * @request POST:/termsEntities/{id}/termsGroupEntity
         */
        termsEntityTermsGroupEntityUsingPost: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsEntities/${id}/termsGroupEntity`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityTermsGroupEntityUsingDelete
         * @summary termsEntityTermsGroupEntity
         * @request DELETE:/termsEntities/{id}/termsGroupEntity
         */
        termsEntityTermsGroupEntityUsingDelete: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/termsEntities/${id}/termsGroupEntity`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name TermsEntityTermsGroupEntityUsingPatch
         * @summary termsEntityTermsGroupEntity
         * @request PATCH:/termsEntities/{id}/termsGroupEntity
         */
        termsEntityTermsGroupEntityUsingPatch: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsEntities/${id}/termsGroupEntity`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name FindAllTermsEntityUsingGet
         * @summary findAllTermsEntity
         * @request GET:/termsEntities
         */
        findAllTermsEntityUsingGet: (
            query: FindAllTermsEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/termsEntities`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name SaveTermsEntityUsingPost
         * @summary saveTermsEntity
         * @request POST:/termsEntities
         */
        saveTermsEntityUsingPost: (data: TermsEntity, params: RequestParams = {}) =>
            this.request<EntityModelTermsEntity, void>({
                path: `/termsEntities`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name FindByNameAndDelYnTermsEntityUsingGet
         * @summary findByNameAndDelYnTermsEntity
         * @request GET:/termsEntities/search/findByNameAndDelYn
         */
        findByNameAndDelYnTermsEntityUsingGet: (
            query: FindByNameAndDelYnTermsEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsEntity, void>({
                path: `/termsEntities/search/findByNameAndDelYn`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name FindByNameAndServiceEntityIdTermsEntityUsingGet
         * @summary findByNameAndServiceEntityIdTermsEntity
         * @request GET:/termsEntities/search/findByNameAndServiceEntityId
         */
        findByNameAndServiceEntityIdTermsEntityUsingGet: (
            query: FindByNameAndServiceEntityIdTermsEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/termsEntities/search/findByNameAndServiceEntityId`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name GetLatestTermsListTermsEntityUsingGet
         * @summary getLatestTermsListTermsEntity
         * @request GET:/termsEntities/search/getLatestTermsList
         */
        getLatestTermsListTermsEntityUsingGet: (
            query: GetLatestTermsListTermsEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/termsEntities/search/getLatestTermsList`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name FindByIdTermsEntityUsingGet
         * @summary findByIdTermsEntity
         * @request GET:/termsEntities/{id}
         */
        findByIdTermsEntityUsingGet: (id: number, params: RequestParams = {}) =>
            this.request<EntityModelTermsEntity, void>({
                path: `/termsEntities/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name SaveTermsEntityUsingPut
         * @summary saveTermsEntity
         * @request PUT:/termsEntities/{id}
         */
        saveTermsEntityUsingPut: (
            id: number,
            data: TermsEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsEntity, void>({
                path: `/termsEntities/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name DeleteTermsEntityUsingDelete
         * @summary deleteTermsEntity
         * @request DELETE:/termsEntities/{id}
         */
        deleteTermsEntityUsingDelete: (id: number, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/termsEntities/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsEntity Entity
         * @name SaveTermsEntityUsingPatch
         * @summary saveTermsEntity
         * @request PATCH:/termsEntities/{id}
         */
        saveTermsEntityUsingPatch: (
            id: number,
            data: TermsEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsEntity, void>({
                path: `/termsEntities/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    termsGroupEntities = {
        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityServiceEntityUsingGet
         * @summary termsGroupEntityServiceEntity
         * @request GET:/termsGroupEntities/{id}/serviceEntity
         */
        termsGroupEntityServiceEntityUsingGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsGroupEntities/${id}/serviceEntity`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityServiceEntityUsingPut
         * @summary termsGroupEntityServiceEntity
         * @request PUT:/termsGroupEntities/{id}/serviceEntity
         */
        termsGroupEntityServiceEntityUsingPut: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsGroupEntities/${id}/serviceEntity`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityServiceEntityUsingPost
         * @summary termsGroupEntityServiceEntity
         * @request POST:/termsGroupEntities/{id}/serviceEntity
         */
        termsGroupEntityServiceEntityUsingPost: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsGroupEntities/${id}/serviceEntity`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityServiceEntityUsingDelete
         * @summary termsGroupEntityServiceEntity
         * @request DELETE:/termsGroupEntities/{id}/serviceEntity
         */
        termsGroupEntityServiceEntityUsingDelete: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/termsGroupEntities/${id}/serviceEntity`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityServiceEntityUsingPatch
         * @summary termsGroupEntityServiceEntity
         * @request PATCH:/termsGroupEntities/{id}/serviceEntity
         */
        termsGroupEntityServiceEntityUsingPatch: (
            id: number,
            data: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelServiceEntity, void>({
                path: `/termsGroupEntities/${id}/serviceEntity`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityTermsEntityListUsingGet
         * @summary termsGroupEntityTermsEntityList
         * @request GET:/termsGroupEntities/{id}/termsEntityList
         */
        termsGroupEntityTermsEntityListUsingGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/termsGroupEntities/${id}/termsEntityList`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityTermsEntityListUsingPut
         * @summary termsGroupEntityTermsEntityList
         * @request PUT:/termsGroupEntities/{id}/termsEntityList
         */
        termsGroupEntityTermsEntityListUsingPut: (
            id: number,
            data: string[],
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/termsGroupEntities/${id}/termsEntityList`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityTermsEntityListUsingPost
         * @summary termsGroupEntityTermsEntityList
         * @request POST:/termsGroupEntities/{id}/termsEntityList
         */
        termsGroupEntityTermsEntityListUsingPost: (
            id: number,
            data: string[],
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/termsGroupEntities/${id}/termsEntityList`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityTermsEntityListUsingDelete1
         * @summary termsGroupEntityTermsEntityList
         * @request DELETE:/termsGroupEntities/{id}/termsEntityList
         */
        termsGroupEntityTermsEntityListUsingDelete1: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/termsGroupEntities/${id}/termsEntityList`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityTermsEntityListUsingPatch
         * @summary termsGroupEntityTermsEntityList
         * @request PATCH:/termsGroupEntities/{id}/termsEntityList
         */
        termsGroupEntityTermsEntityListUsingPatch: (
            id: number,
            data: string[],
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsEntity, void>({
                path: `/termsGroupEntities/${id}/termsEntityList`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityTermsEntityListUsingGet1
         * @summary termsGroupEntityTermsEntityList
         * @request GET:/termsGroupEntities/{id}/termsEntityList/{termsentityId}
         */
        termsGroupEntityTermsEntityListUsingGet1: (
            id: number,
            termsentityId: string,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsEntity, void>({
                path: `/termsGroupEntities/${id}/termsEntityList/${termsentityId}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name TermsGroupEntityTermsEntityListUsingDelete
         * @summary termsGroupEntityTermsEntityList
         * @request DELETE:/termsGroupEntities/{id}/termsEntityList/{termsentityId}
         */
        termsGroupEntityTermsEntityListUsingDelete: (
            id: number,
            termsentityId: string,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/termsGroupEntities/${id}/termsEntityList/${termsentityId}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name FindAllTermsGroupEntityUsingGet
         * @summary findAllTermsGroupEntity
         * @request GET:/termsGroupEntities
         */
        findAllTermsGroupEntityUsingGet: (
            query: FindAllTermsGroupEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsGroupEntity, void>({
                path: `/termsGroupEntities`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name SaveTermsGroupEntityUsingPost
         * @summary saveTermsGroupEntity
         * @request POST:/termsGroupEntities
         */
        saveTermsGroupEntityUsingPost: (
            data: TermsGroupEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsGroupEntities`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name FindByRefPageAndServiceEntityIdTermsGroupEntityUsingGet
         * @summary findByRefPageAndServiceEntityIdTermsGroupEntity
         * @request GET:/termsGroupEntities/search/findByRefPageAndServiceEntityId
         */
        findByRefPageAndServiceEntityIdTermsGroupEntityUsingGet: (
            query: FindByRefPageAndServiceEntityIdTermsGroupEntityUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<CollectionModelTermsGroupEntity, void>({
                path: `/termsGroupEntities/search/findByRefPageAndServiceEntityId`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name FindByIdTermsGroupEntityUsingGet
         * @summary findByIdTermsGroupEntity
         * @request GET:/termsGroupEntities/{id}
         */
        findByIdTermsGroupEntityUsingGet: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsGroupEntities/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name SaveTermsGroupEntityUsingPut
         * @summary saveTermsGroupEntity
         * @request PUT:/termsGroupEntities/{id}
         */
        saveTermsGroupEntityUsingPut: (
            id: number,
            data: TermsGroupEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsGroupEntities/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name DeleteTermsGroupEntityUsingDelete
         * @summary deleteTermsGroupEntity
         * @request DELETE:/termsGroupEntities/{id}
         */
        deleteTermsGroupEntityUsingDelete: (
            id: number,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/termsGroupEntities/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags TermsGroupEntity Entity
         * @name SaveTermsGroupEntityUsingPatch
         * @summary saveTermsGroupEntity
         * @request PATCH:/termsGroupEntities/{id}
         */
        saveTermsGroupEntityUsingPatch: (
            id: number,
            data: TermsGroupEntity,
            params: RequestParams = {}
        ) =>
            this.request<EntityModelTermsGroupEntity, void>({
                path: `/termsGroupEntities/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
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
            this.request<LinkRelation, void>({
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
            this.request<LinkRelation, void>({
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
    profile = {
        /**
         * No description
         *
         * @tags profile-controller
         * @name ListAllFormsOfMetadataUsingGet
         * @summary listAllFormsOfMetadata
         * @request GET:/profile
         */
        listAllFormsOfMetadataUsingGet: (params: RequestParams = {}) =>
            this.request<RepresentationModelObject, void>({
                path: `/profile`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags profile-controller
         * @name ProfileOptionsUsingOptions
         * @summary profileOptions
         * @request OPTIONS:/profile
         */
        profileOptionsUsingOptions: (params: RequestParams = {}) =>
            this.request<LinkRelation, void>({
                path: `/profile`,
                method: 'OPTIONS',
                ...params,
            }),
    };
    api = {
        /**
         * @description 약관 전체 리스트
         *
         * @tags [정책] - 이용약관 API
         * @name TermsListUsingGet
         * @summary 약관 전체 리스트
         * @request GET:/api/terms
         */
        termsListUsingGet: (
            query: TermsListUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<ListVoTermsInfo, void>({
                path: `/api/terms`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 약관 이력
         *
         * @tags [정책] - 이용약관 API
         * @name TermsLatestListUsingGet1
         * @summary 약관 이력
         * @request GET:/api/terms/history
         */
        termsLatestListUsingGet1: (
            query: TermsLatestListUsingGet1Params,
            params: RequestParams = {}
        ) =>
            this.request<ListVoTermsInfo, void>({
                path: `/api/terms/history`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 약관 최신 리스트
         *
         * @tags [정책] - 이용약관 API
         * @name TermsLatestListUsingGet
         * @summary 약관 최신 리스트
         * @request GET:/api/terms/latest
         */
        termsLatestListUsingGet: (
            query: TermsLatestListUsingGetParams,
            params: RequestParams = {}
        ) =>
            this.request<ListVoTermsInfo, void>({
                path: `/api/terms/latest`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * @description 약관 상세
         *
         * @tags [정책] - 이용약관 API
         * @name TermsDetailUsingGet
         * @summary 약관 상세
         * @request GET:/api/terms/{termsId}
         */
        termsDetailUsingGet: (termsId: number, params: RequestParams = {}) =>
            this.request<TermsDetail, void>({
                path: `/api/terms/${termsId}`,
                method: 'GET',
                ...params,
            }),
    };
}
