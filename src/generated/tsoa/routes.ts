/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CommonController } from './../../common/common-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PingController } from './../../common/ping-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ActivityController } from './../../domains/activity/activity-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AppController } from './../../domains/app/app-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BlockchainController } from './../../domains/blockchain/blockchain-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BoardController } from './../../domains/board/board-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConsoleMemberController } from './../../domains/consolemember/consolemember-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ContractController } from './../../domains/contract/contract-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MarketplaceController } from './../../domains/marketplace/marketplace-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NftController } from './../../domains/nft/nft-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReleaseController } from './../../domains/release/release-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TokenController } from './../../domains/token/token-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WalletController } from './../../domains/wallet/wallet-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WebhookController } from './../../domains/webhook/webhook-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WorkspaceController } from './../../domains/workspace/workspace-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WorkspaceMemberController } from './../../domains/workspacemember/workspacemember-controller';
import { expressAuthentication } from './../../tsoa-auth-middleware';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "EventParamsType": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double"},
            "eventName": {"dataType":"string","required":true},
            "profile": {"dataType":"string"},
            "type": {"dataType":"string"},
            "txId": {"dataType":"string"},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorVo": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "messageCode": {"dataType":"string","required":true},
            "events": {"dataType":"array","array":{"dataType":"refObject","ref":"EventParamsType"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonCodeGroupQueryResponse": {
        "dataType": "refObject",
        "properties": {
            "codeGroup": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "order": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_CommonCodeGroupQueryResponse-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"CommonCodeGroupQueryResponse"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyCodeGroupsQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonCode": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"order":{"dataType":"double","required":true},"description":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"name":{"dataType":"string","required":true},"codeGroup":{"dataType":"string","required":true},"code":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_CommonCode-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refAlias","ref":"CommonCode"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyCodesQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "codeGroup": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttachFile": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"fileSize":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"fileExt":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"fileChgName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"fileName":{"dataType":"string","required":true},"fileUrl":{"dataType":"string","required":true},"path":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"attachFileId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AttachFile_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"AttachFile"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendCertificationSMSResponse": {
        "dataType": "refObject",
        "properties": {
            "messageId": {"dataType":"string","required":true},
            "expiryTime": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_SendCertificationSMSResponse_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"SendCertificationSMSResponse"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendCertificationSMSRequest": {
        "dataType": "refObject",
        "properties": {
            "consoleMemberName": {"dataType":"string","required":true},
            "nationCodeNumber": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"void"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CertificateCodeRequest": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"\"인증번호는 6자리 여야 합니다.\"","value":6},"maxLength":{"errorMsg":"\"인증번호는 6자리 여야 합니다.\"","value":6}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PingResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"any"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MethodType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["API"]},{"dataType":"enum","enums":["Console"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyActivityLogsQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "profile": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DEV"]},{"dataType":"enum","enums":["PRD"]}],"required":true},
            "from": {"dataType":"string"},
            "to": {"dataType":"string"},
            "types": {"dataType":"string"},
            "method": {"ref":"MethodType"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "App": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"siteUrl":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"detailDescription":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"bannerUrl":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"promotionalText":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"cardUrl":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"blockChainId":{"dataType":"string","required":true},"iconUrl":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"name":{"dataType":"string","required":true},"appId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_App_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"App"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAppRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"\"최소 3글자 이상 이어야 합니다.\"","value":1},"maxLength":{"errorMsg":"\"최대 50글자 까지 입력 가능합니다.\"","value":50}}},
            "iconUrl": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"\"iconUrl pattern does not match\"","value":"[^(?:/(?:\\*{1,2}|\\w+\\*{0,2}))+/?$]"}}},
            "blockChainId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateAppRequest.Exclude_keyofCreateAppRequest.blockChainId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"\"최소 3글자 이상 이어야 합니다.\"","value":1},"maxLength":{"errorMsg":"\"최대 50글자 까지 입력 가능합니다.\"","value":50}}},"iconUrl":{"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"\"iconUrl pattern does not match\"","value":"[^(?:/(?:\\*{1,2}|\\w+\\*{0,2}))+/?$]"}}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_CreateAppRequest.blockChainId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_CreateAppRequest.Exclude_keyofCreateAppRequest.blockChainId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAppRequest": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_CreateAppRequest.blockChainId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Platform": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["iOS"]},{"dataType":"enum","enums":["Android"]},{"dataType":"enum","enums":["Steam"]},{"dataType":"enum","enums":["Window"]},{"dataType":"enum","enums":["macOS"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlatformUrl": {
        "dataType": "refObject",
        "properties": {
            "platform": {"ref":"Platform","required":true},
            "url": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReleaseStatusCodeType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["IN_REVIEW"]},{"dataType":"enum","enums":["REQUESTED"]},{"dataType":"enum","enums":["REJECTED"]},{"dataType":"enum","enums":["CANCELED"]},{"dataType":"enum","enums":["RELEASED"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReleaseStatusCodeResponseType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"ReleaseStatusCodeType"},{"dataType":"enum","enums":["Preparation"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppDetailResponseType": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "iconUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "blockChainId": {"dataType":"string","required":true},
            "cardUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "promotionalText": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "bannerUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "screenUrls": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "detailDescription": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "siteUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "platformUrls": {"dataType":"array","array":{"dataType":"refObject","ref":"PlatformUrl"}},
            "languages": {"dataType":"array","array":{"dataType":"string"}},
            "createdId": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "status": {"ref":"ReleaseStatusCodeResponseType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppDetailResponseType_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"AppDetailResponseType"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyAppsQueryResponse": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "iconUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "appWorkspace": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"defaultYn":{"dataType":"string","required":true},"workspaceId":{"dataType":"double","required":true}}},"required":true},
            "appWallet": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_FindManyAppsQueryResponse-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"FindManyAppsQueryResponse"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindMAnyAppsQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppApiKey": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"key":{"dataType":"string","required":true},"expireDt":{"dataType":"datetime","required":true},"apiKeyKindCd":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"appId":{"dataType":"double","required":true},"apiKeyId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppApiKey_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"AppApiKey"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAppApiKeyRequest": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"integer","required":true},
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"\"웹훅명은 최소 1자에서 최대 50자 까지 입력 가능합니다.\"","value":1},"maxLength":{"errorMsg":"\"웹훅명은 최소 1자에서 최대 50자 까지 입력 가능합니다.\"","value":50}}},
            "apiKeyKindCode": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppApiKey-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refAlias","ref":"AppApiKey"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BigNumber": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"string","required":true},
            "hex": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppWalletBalance": {
        "dataType": "refObject",
        "properties": {
            "symbol": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "decimals": {"dataType":"double","required":true},
            "value": {"ref":"BigNumber","required":true},
            "displayValue": {"dataType":"string","required":true},
            "iconUrl": {"dataType":"string","required":true},
            "contractAddress": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppWalletBalance-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"AppWalletBalance"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SupportChainId": {
        "dataType": "refEnum",
        "enums": [137,80001,56,97],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BlockChainResponseType": {
        "dataType": "refObject",
        "properties": {
            "blockchainId": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "symbolImageUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_BlockChainResponseType-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"BlockChainResponseType"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Board": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"updatorId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"creatorId":{"dataType":"double","required":true},"boardCd":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"content":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"title":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_Board-or-null_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"union","subSchemas":[{"ref":"Board"},{"dataType":"enum","enums":[null]}]},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_Board-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refAlias","ref":"Board"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_Board_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"Board"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Board.title-or-content-or-creatorId_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"content":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"creatorId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BoardCreateParams": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Board.title-or-content-or-creatorId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BoardDeleteParams": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"boardIds":{"dataType":"array","array":{"dataType":"double"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConsoleMember": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"recoveryEmail":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"phoneCertificateYn":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"phone":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"string","required":true},"nickname":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"loginId":{"dataType":"string","required":true},"platformMemberId":{"dataType":"string","required":true},"memberId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_ConsoleMember_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"ConsoleMember"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateConsoleMemberRequest": {
        "dataType": "refObject",
        "properties": {
            "loginId": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"\"최소 8자 이상이어야 합니다\"","value":8}}},
            "name": {"dataType":"string","required":true},
            "nickname": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string"},
            "phoneCertificateYn": {"dataType":"string"},
            "recoveryEmail": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateConsoleMemberRequest.Exclude_keyofCreateConsoleMemberRequest.loginId-or-platformMemberId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"nickname":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"phone":{"dataType":"string"},"phoneCertificateYn":{"dataType":"string"},"recoveryEmail":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_CreateConsoleMemberRequest.loginId-or-platformMemberId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_CreateConsoleMemberRequest.Exclude_keyofCreateConsoleMemberRequest.loginId-or-platformMemberId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateConsoleMemberRequest": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_CreateConsoleMemberRequest.loginId-or-platformMemberId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_ConsoleMember-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refAlias","ref":"ConsoleMember"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyConsoleMembersQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "nickName": {"dataType":"string"},
            "email": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DirectListingResponse": {
        "dataType": "refObject",
        "properties": {
            "listingId": {"dataType":"string","required":true},
            "txHash": {"dataType":"string","required":true},
            "rowData": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_DirectListingResponse_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"DirectListingResponse"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DirectListingRequest": {
        "dataType": "refObject",
        "properties": {
            "contractAddress": {"dataType":"string"},
            "tokenId": {"dataType":"string","required":true},
            "pricePerToken": {"dataType":"string","required":true},
            "currencyContractAddress": {"dataType":"string"},
            "isReservedListing": {"dataType":"boolean"},
            "quantity": {"dataType":"string"},
            "startTimestamp": {"dataType":"string"},
            "endTimestamp": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CancelListingRequest": {
        "dataType": "refObject",
        "properties": {
            "tokenId": {"dataType":"string","required":true},
            "appId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChangePriceRequest": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double","required":true},
            "price": {"dataType":"string","required":true},
            "tokenId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatorQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NFTList": {
        "dataType": "refObject",
        "properties": {
            "price": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "listingId": {"dataType":"string","required":true},
            "tokenId": {"dataType":"string","required":true},
            "availableQuantity": {"dataType":"string","required":true},
            "nftImageUrl": {"dataType":"string","required":true},
            "ipfsUrl": {"dataType":"string","required":true},
            "nftName": {"dataType":"string","required":true},
            "nftDescription": {"dataType":"string","required":true},
            "createdAt": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyValue": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"string","required":true},
            "displayValue": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Trait": {
        "dataType": "refObject",
        "properties": {
            "trait_type": {"dataType":"string","required":true},
            "value": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}],"required":true},
            "display_type": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TraitWithBoost": {
        "dataType": "refObject",
        "properties": {
            "trait_type": {"dataType":"string","required":true},
            "value": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}],"required":true},
            "display_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["boost_number"]},{"dataType":"enum","enums":["boost_percentage"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TraitWithLevel": {
        "dataType": "refObject",
        "properties": {
            "trait_type": {"dataType":"string","required":true},
            "value": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}],"required":true},
            "display_type": {"dataType":"enum","enums":["number"],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Metadata": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "image": {"dataType":"string","required":true},
            "attributes": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Trait"},{"ref":"TraitWithBoost"},{"ref":"TraitWithLevel"}]}},
            "properties": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Trait"},{"ref":"TraitWithBoost"},{"ref":"TraitWithLevel"}]}},
            "external_url": {"dataType":"string"},
            "background_color": {"dataType":"string"},
            "id": {"dataType":"string"},
            "uri": {"dataType":"string"},
            "customImage": {"dataType":"string"},
            "customAnimationUrl": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Status": {
        "dataType": "refEnum",
        "enums": [0,1,2,3,4,5],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ListingNFT": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "creatorAddress": {"dataType":"string","required":true},
            "assetContractAddress": {"dataType":"string","required":true},
            "tokenId": {"dataType":"string","required":true},
            "quantity": {"dataType":"string","required":true},
            "currencyContractAddress": {"dataType":"string","required":true},
            "currencyValuePerToken": {"ref":"CurrencyValue","required":true},
            "pricePerToken": {"dataType":"string","required":true},
            "asset": {"ref":"Metadata","required":true},
            "startTimeInSeconds": {"dataType":"double","required":true},
            "endTimeInSeconds": {"dataType":"double","required":true},
            "isReservedListing": {"dataType":"boolean","required":true},
            "status": {"ref":"Status","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ListingResponse": {
        "dataType": "refObject",
        "properties": {
            "list": {"dataType":"array","array":{"dataType":"refObject","ref":"NFTList"},"required":true},
            "rowData": {"dataType":"array","array":{"dataType":"refObject","ref":"ListingNFT"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_ListingResponse_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"ListingResponse"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetValidListingsQueryParams": {
        "dataType": "refObject",
        "properties": {
            "includeRowData": {"dataType":"boolean","required":true},
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "sellerAddress": {"dataType":"string"},
            "tokenContract": {"dataType":"string"},
            "tokenId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IpfsResponse": {
        "dataType": "refObject",
        "properties": {
            "ipfsUrl": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_IpfsResponse_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"IpfsResponse"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MetadataWithSupply": {
        "dataType": "refObject",
        "properties": {
            "supply": {"dataType":"string","required":true},
            "metadata": {"ref":"Metadata","required":true},
            "imageUrl": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MintBatchRequest": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double"},
            "listing": {"dataType":"boolean","required":true},
            "price": {"dataType":"string","required":true},
            "contractAddress": {"dataType":"string"},
            "metadatas": {"dataType":"array","array":{"dataType":"refObject","ref":"MetadataWithSupply"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MintBatchToRequest": {
        "dataType": "refAlias",
        "type": {"ref":"MintBatchRequest","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MintAdditionalSupplyRequest": {
        "dataType": "refObject",
        "properties": {
            "contractAddress": {"dataType":"string","required":true},
            "tokenId": {"dataType":"double","required":true},
            "additionalSupply": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftItemDataType": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "imgSrc": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "nftName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "sales": {"dataType":"boolean","required":true},
            "price": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "total": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "rest": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_NftItemDataType-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"NftItemDataType"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftItemDetailDataType": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "imgSrc": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "nftName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "sales": {"dataType":"boolean","required":true},
            "price": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "total": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "rest": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "type": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "contractAddress": {"dataType":"string"},
            "properties": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"type":{"dataType":"string","required":true}}}},
            "createdAt": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_NftItemDetailDataType_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"NftItemDetailDataType"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetNFTQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageCursor": {"dataType":"string"},
            "format": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["decimal"]},{"dataType":"enum","enums":["hex"]}]},
            "normalizeMetadata": {"dataType":"boolean"},
            "mediaItems": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NFTOwnersDataType": {
        "dataType": "refObject",
        "properties": {
            "tokenId": {"dataType":"string","required":true},
            "tokenAddress": {"dataType":"string","required":true},
            "ownerAddress": {"dataType":"string","required":true},
            "amount": {"dataType":"string","required":true},
            "blockNumber": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NFTOwnersResponseType": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","required":true},
            "page_size": {"dataType":"double","required":true},
            "cursor": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "result": {"dataType":"array","array":{"dataType":"refObject","ref":"NFTOwnersDataType"},"required":true},
            "hasNext": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_NFTOwnersResponseType_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"NFTOwnersResponseType"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NFTTransactionDataType": {
        "dataType": "refObject",
        "properties": {
            "tokenId": {"dataType":"string","required":true},
            "amount": {"dataType":"string","required":true},
            "fromAddress": {"dataType":"string","required":true},
            "toAddress": {"dataType":"string","required":true},
            "tokenAddress": {"dataType":"string","required":true},
            "blockNumber": {"dataType":"string","required":true},
            "blockTimeStamp": {"dataType":"string","required":true},
            "txId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NFTTransactionResponseType": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","required":true},
            "page_size": {"dataType":"double","required":true},
            "cursor": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "result": {"dataType":"array","array":{"dataType":"refObject","ref":"NFTTransactionDataType"},"required":true},
            "hasNext": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_NFTTransactionResponseType_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"NFTTransactionResponseType"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetNFTTransactionsByTokenIdQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageCursor": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageOptions": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ko"]},{"dataType":"enum","enums":["en"]},{"dataType":"enum","enums":["cn"]},{"dataType":"enum","enums":["jp"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApplyReleaseRequest": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double","required":true},
            "promotionalText": {"dataType":"string","required":true},
            "bannerUrl": {"dataType":"string","required":true},
            "cardUrl": {"dataType":"string","required":true},
            "screenUrls": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "detailDescription": {"dataType":"string","required":true},
            "siteUrl": {"dataType":"string","required":true},
            "platformUrls": {"dataType":"array","array":{"dataType":"refObject","ref":"PlatformUrl"},"required":true},
            "selectedLanguages": {"dataType":"array","array":{"dataType":"refAlias","ref":"LanguageOptions"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyReleaseHistoryResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "appId": {"dataType":"double","required":true},
            "reviewId": {"dataType":"string","required":true},
            "statusCd": {"dataType":"string","required":true},
            "createdId": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_FindManyReleaseHistoryResponse-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"FindManyReleaseHistoryResponse"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GasCost": {
        "dataType": "refObject",
        "properties": {
            "ether": {"dataType":"string","required":true},
            "wei": {"ref":"BigNumber","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SimulateTxResponse": {
        "dataType": "refObject",
        "properties": {
            "gasCost": {"ref":"GasCost","required":true},
            "gasLimit": {"ref":"BigNumber","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_SimulateTxResponse_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"SimulateTxResponse"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenTransferRequest": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double"},
            "walletId": {"dataType":"double","required":true},
            "symbol": {"dataType":"string","required":true},
            "toAddress": {"dataType":"string","required":true},
            "amount": {"dataType":"double","required":true},
            "chainId": {"ref":"SupportChainId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransferNativeResponse": {
        "dataType": "refObject",
        "properties": {
            "fromAddress": {"dataType":"string"},
            "toAddress": {"dataType":"string"},
            "amount": {"dataType":"double","required":true},
            "txHash": {"dataType":"string","required":true},
            "rowData": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransferTokenResponse": {
        "dataType": "refAlias",
        "type": {"ref":"TransferNativeResponse","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_TransferTokenResponse_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"TransferTokenResponse"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransferTokenRequest": {
        "dataType": "refObject",
        "properties": {
            "toAddress": {"dataType":"string","required":true},
            "amount": {"dataType":"double","required":true},
            "appId": {"dataType":"double"},
            "tokenContractAddress": {"dataType":"string","required":true},
            "privateKey": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindWalletByAppIdQueryResponse": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double","required":true},
            "walletId": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "encPrivateKey": {"dataType":"string","required":true},
            "autoSignYn": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Y"]},{"dataType":"enum","enums":["N"]}],"required":true},
            "tokenCount": {"dataType":"double","required":true},
            "PMG_balance": {"dataType":"string","required":true},
            "memberAccessYn": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Y"]},{"dataType":"enum","enums":["N"]}],"required":true},
            "createdId": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_FindWalletByAppIdQueryResponse_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"FindWalletByAppIdQueryResponse"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletTransactionDataType": {
        "dataType": "refObject",
        "properties": {
            "txId": {"dataType":"string","required":true},
            "nonce": {"dataType":"string","required":true},
            "blockNumber": {"dataType":"string","required":true},
            "receiptStatus": {"dataType":"string","required":true},
            "fromAddress": {"dataType":"string","required":true},
            "toAddress": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
            "gas": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "gasPrice": {"dataType":"string","required":true},
            "blockTimestamp": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletTransactionsResponseType": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","required":true},
            "page_size": {"dataType":"double","required":true},
            "cursor": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "result": {"dataType":"array","array":{"dataType":"refObject","ref":"WalletTransactionDataType"},"required":true},
            "hasNext": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_WalletTransactionsResponseType_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"WalletTransactionsResponseType"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetTransactionsQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "fromDate": {"dataType":"string"},
            "toDate": {"dataType":"string"},
            "pageCursor": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Webhook": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"requireYn":{"dataType":"string","required":true},"retryCount":{"dataType":"double","required":true},"webhookKindCd":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"webhookId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_Webhook_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"Webhook"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateWebhookRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "webhookKindCode": {"dataType":"string","required":true},
            "requireYn": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_Webhook-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refAlias","ref":"Webhook"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppWebhook": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"encryptionYn":{"dataType":"string","required":true},"endpointUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"profile":{"dataType":"string","required":true},"appId":{"dataType":"double","required":true},"webhookId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppWebhook_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"AppWebhook"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAppWebhookRequest": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double","required":true},
            "profile": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"\"웹훅명은 최소 1자에서 최대 20자 까지 입력 가능합니다.\"","value":1},"maxLength":{"errorMsg":"\"웹훅명은 최소 1자에서 최대 20자 까지 입력 가능합니다.\"","value":20}}},
            "encryptionYn": {"dataType":"string","required":true},
            "endpointUrl": {"dataType":"string","required":true},
            "webhookId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAppWebhookRequest": {
        "dataType": "refAlias",
        "type": {"ref":"CreateAppWebhookRequest","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppWebhook-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refAlias","ref":"AppWebhook"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyAppWebhooksQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "profile": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DEV"]},{"dataType":"enum","enums":["PRD"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteAppWebhookRequest": {
        "dataType": "refObject",
        "properties": {
            "appId": {"dataType":"double","required":true},
            "profile": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DEV"]},{"dataType":"enum","enums":["PRD"]}],"required":true},
            "webhookId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppWebhookLogsQueryResponse": {
        "dataType": "refObject",
        "properties": {
            "no": {"dataType":"string","required":true},
            "profile": {"dataType":"string","required":true},
            "webhookKindCode": {"dataType":"string","required":true},
            "webhookName": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "date": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
            "requestBody": {"dataType":"string","required":true},
            "responseBody": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppWebhookLogsQueryResponse-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"AppWebhookLogsQueryResponse"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyAppWebhookLogsQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "from": {"dataType":"string"},
            "to": {"dataType":"string"},
            "profile": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DEV"]},{"dataType":"enum","enums":["PRD"]}]},
            "webhookKindCd": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["SWAP"]},{"dataType":"enum","enums":["TOKEN_IN"]},{"dataType":"enum","enums":["NFT_MINT"]},{"dataType":"enum","enums":["REVIEW_RESULT"]}]},
            "logStatus": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Success"]},{"dataType":"enum","enums":["Fail"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppWebhookLog": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"responseBody":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"responseCd":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"requestBody":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"retriedCount":{"dataType":"double","required":true},"status":{"dataType":"string","required":true},"url":{"dataType":"string","required":true},"webhookKindNm":{"dataType":"string","required":true},"webhookKindCd":{"dataType":"string","required":true},"profile":{"dataType":"string","required":true},"webhookId":{"dataType":"double","required":true},"appId":{"dataType":"double","required":true},"processDt":{"dataType":"datetime","required":true},"no":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_AppWebhookLog_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"AppWebhookLog"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResendAppWebhookRequest": {
        "dataType": "refObject",
        "properties": {
            "no": {"dataType":"double","required":true},
            "processDt": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Workspace": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"name":{"dataType":"string","required":true},"workspaceId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_Workspace_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"Workspace"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateWorkspaceRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "appId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateWorkspaceRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyWorkspacesResponse": {
        "dataType": "refObject",
        "properties": {
            "workspaceId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "isDefault": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_FindManyWorkspacesResponse-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"FindManyWorkspacesResponse"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindMAnyWorkspacesQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "appId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindManyWorkspaceMembersResponse": {
        "dataType": "refObject",
        "properties": {
            "consoleMemberId": {"dataType":"string","required":true},
            "nickName": {"dataType":"string","required":true},
            "loginId": {"dataType":"string","required":true},
            "authorityCode": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_FindManyWorkspaceMembersResponse-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"FindManyWorkspaceMembersResponse"}},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindMAnyWorkspaceMembersQueryParams": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNo": {"dataType":"double"},
            "appId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WorkspaceMember": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"alarmYn":{"dataType":"string","required":true},"authCd":{"dataType":"string","required":true},"workspaceId":{"dataType":"double","required":true},"memberId":{"dataType":"string","required":true},"workspaceMemberId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_WorkspaceMember_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"WorkspaceMember"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateWorkspaceMemberRequest": {
        "dataType": "refObject",
        "properties": {
            "workspaceId": {"dataType":"double","required":true},
            "memberId": {"dataType":"double","required":true},
            "authorityCode": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["MASTER"]},{"dataType":"enum","enums":["NORMAL"]}],"default":"\"NORMAL\"","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateWorkspaceMemberRequest": {
        "dataType": "refAlias",
        "type": {"ref":"CreateWorkspaceMemberRequest","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteWorkspaceMemberRequest": {
        "dataType": "refObject",
        "properties": {
            "workspaceId": {"dataType":"double","required":true},
            "memberId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InviteWorkspaceMemberRequest": {
        "dataType": "refObject",
        "properties": {
            "workspaceId": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
            "authorityCode": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WorkspaceInvitation": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"createdAt":{"dataType":"datetime","required":true},"updatedId":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"createdId":{"dataType":"double","required":true},"acceptDt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"inviteDt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"statusCd":{"dataType":"string","required":true},"receiverMemberId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"senderMemberId":{"dataType":"string","required":true},"workspaceId":{"dataType":"double","required":true},"invitationId":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse_WorkspaceInvitation_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double"},"data":{"ref":"WorkspaceInvitation"},"error":{"ref":"ErrorVo","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateInvitationRequest": {
        "dataType": "refObject",
        "properties": {
            "statusCode": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/common/code-groups',
            ...(fetchMiddlewares<RequestHandler>(CommonController)),
            ...(fetchMiddlewares<RequestHandler>(CommonController.prototype.findManyCodeGroups)),

            function CommonController_findManyCodeGroups(request: any, response: any, next: any) {
            const args = {
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindManyCodeGroupsQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CommonController();


              const promise = controller.findManyCodeGroups.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/common/codes',
            ...(fetchMiddlewares<RequestHandler>(CommonController)),
            ...(fetchMiddlewares<RequestHandler>(CommonController.prototype.findManyCodes)),

            function CommonController_findManyCodes(request: any, response: any, next: any) {
            const args = {
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindManyCodesQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CommonController();


              const promise = controller.findManyCodes.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/common/s3',
            upload.single('file'),
            ...(fetchMiddlewares<RequestHandler>(CommonController)),
            ...(fetchMiddlewares<RequestHandler>(CommonController.prototype.createAttachFile)),

            function CommonController_createAttachFile(request: any, response: any, next: any) {
            const args = {
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CommonController();


              const promise = controller.createAttachFile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/common/sms/certification',
            ...(fetchMiddlewares<RequestHandler>(CommonController)),
            ...(fetchMiddlewares<RequestHandler>(CommonController.prototype.sendCertificationSMS)),

            function CommonController_sendCertificationSMS(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SendCertificationSMSRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CommonController();


              const promise = controller.sendCertificationSMS.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/common/sms/certification/:messageId',
            ...(fetchMiddlewares<RequestHandler>(CommonController)),
            ...(fetchMiddlewares<RequestHandler>(CommonController.prototype.certificateCode)),

            function CommonController_certificateCode(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CertificateCodeRequest"},
                    messageId: {"in":"path","name":"messageId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CommonController();


              const promise = controller.certificateCode.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/ping',
            ...(fetchMiddlewares<RequestHandler>(PingController)),
            ...(fetchMiddlewares<RequestHandler>(PingController.prototype.getMessage)),

            function PingController_getMessage(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PingController();


              const promise = controller.getMessage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/ping/db',
            ...(fetchMiddlewares<RequestHandler>(PingController)),
            ...(fetchMiddlewares<RequestHandler>(PingController.prototype.getMessageDB)),

            function PingController_getMessageDB(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PingController();


              const promise = controller.getMessageDB.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/ping/security',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PingController)),
            ...(fetchMiddlewares<RequestHandler>(PingController.prototype.getMessageSecurity)),

            function PingController_getMessageSecurity(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PingController();


              const promise = controller.getMessageSecurity.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/activities/console/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ActivityController)),
            ...(fetchMiddlewares<RequestHandler>(ActivityController.prototype.findManyActivities)),

            function ActivityController_findManyActivities(request: any, response: any, next: any) {
            const args = {
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindManyActivityLogsQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ActivityController();


              const promise = controller.findManyActivities.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/apps',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.createApp)),

            function AppController_createApp(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateAppRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.createApp.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/apps/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.updateApp)),

            function AppController_updateApp(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateAppRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.updateApp.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/apps/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.findApp)),

            function AppController_findApp(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.findApp.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/apps',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.findManyApps)),

            function AppController_findManyApps(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindMAnyAppsQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.findManyApps.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/apps/api-keys',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.createAppApiKeys)),

            function AppController_createAppApiKeys(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateAppApiKeyRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.createAppApiKeys.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/apps/api-keys/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.findManyAppApiKeys)),

            function AppController_findManyAppApiKeys(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.findManyAppApiKeys.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/apps/:appId/chains/:chainId/tokens',
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.getAppWalletBalance)),

            function AppController_getAppWalletBalance(request: any, response: any, next: any) {
            const args = {
                    chainId: {"default":97,"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.getAppWalletBalance.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/apps/api-keys/:apiKeyId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AppController)),
            ...(fetchMiddlewares<RequestHandler>(AppController.prototype.deleteAppApiKey)),

            function AppController_deleteAppApiKey(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    apiKeyId: {"in":"path","name":"apiKeyId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AppController();


              const promise = controller.deleteAppApiKey.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/common/blockchains',
            ...(fetchMiddlewares<RequestHandler>(BlockchainController)),
            ...(fetchMiddlewares<RequestHandler>(BlockchainController.prototype.findManyBlockChains)),

            function BlockchainController_findManyBlockChains(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BlockchainController();


              const promise = controller.findManyBlockChains.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/board/:id',
            authenticateMiddleware([{"token":[]},{"basic":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BoardController)),
            ...(fetchMiddlewares<RequestHandler>(BoardController.prototype.getItem)),

            function BoardController_getItem(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BoardController();


              const promise = controller.getItem.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/board',
            authenticateMiddleware([{"token":[]},{"basic":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BoardController)),
            ...(fetchMiddlewares<RequestHandler>(BoardController.prototype.getItems)),

            function BoardController_getItems(request: any, response: any, next: any) {
            const args = {
                    pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                    pageNo: {"in":"query","name":"pageNo","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BoardController();


              const promise = controller.getItems.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/board',
            authenticateMiddleware([{"token":[]},{"basic":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BoardController)),
            ...(fetchMiddlewares<RequestHandler>(BoardController.prototype.saveItem)),

            function BoardController_saveItem(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"BoardCreateParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BoardController();


              const promise = controller.saveItem.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/board',
            authenticateMiddleware([{"token":[]},{"basic":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BoardController)),
            ...(fetchMiddlewares<RequestHandler>(BoardController.prototype.deleteItems)),

            function BoardController_deleteItems(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"BoardDeleteParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BoardController();


              const promise = controller.deleteItems.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/board/:id',
            authenticateMiddleware([{"token":[]},{"basic":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BoardController)),
            ...(fetchMiddlewares<RequestHandler>(BoardController.prototype.editItem)),

            function BoardController_editItem(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"BoardCreateParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BoardController();


              const promise = controller.editItem.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/members/check',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController)),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController.prototype.checkMemberExist)),

            function ConsoleMemberController_checkMemberExist(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ConsoleMemberController();


              const promise = controller.checkMemberExist.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/members/me',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController)),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController.prototype.findMe)),

            function ConsoleMemberController_findMe(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ConsoleMemberController();


              const promise = controller.findMe.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/members',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController)),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController.prototype.createConsoleMember)),

            function ConsoleMemberController_createConsoleMember(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateConsoleMemberRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ConsoleMemberController();


              const promise = controller.createConsoleMember.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/members/:memberId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController)),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController.prototype.updateConsoleMember)),

            function ConsoleMemberController_updateConsoleMember(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    memberId: {"in":"path","name":"memberId","required":true,"dataType":"double"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateConsoleMemberRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ConsoleMemberController();


              const promise = controller.updateConsoleMember.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/members/:memberId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController)),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController.prototype.findConsoleMember)),

            function ConsoleMemberController_findConsoleMember(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    memberId: {"in":"path","name":"memberId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ConsoleMemberController();


              const promise = controller.findConsoleMember.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/members',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController)),
            ...(fetchMiddlewares<RequestHandler>(ConsoleMemberController.prototype.findManyConsoleMembers)),

            function ConsoleMemberController_findManyConsoleMembers(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindManyConsoleMembersQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ConsoleMemberController();


              const promise = controller.findManyConsoleMembers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/platform-contracts',
            ...(fetchMiddlewares<RequestHandler>(ContractController)),
            ...(fetchMiddlewares<RequestHandler>(ContractController.prototype.reloadPlatformContracts)),

            function ContractController_reloadPlatformContracts(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ContractController();


              const promise = controller.reloadPlatformContracts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/chains/:chainId/marketplace/:appId/direct-listings',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.createDirectListing)),

            function MarketplaceController_createDirectListing(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    includeRawData: {"default":false,"in":"query","name":"includeRawData","dataType":"boolean"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DirectListingRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MarketplaceController();


              const promise = controller.createDirectListing.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/chains/:chainId/marketplace/remove-listings',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.removeFromListing)),

            function MarketplaceController_removeFromListing(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CancelListingRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MarketplaceController();


              const promise = controller.removeFromListing.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/chains/:chainId/marketplace/change-price',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.changePriceFromListing)),

            function MarketplaceController_changePriceFromListing(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ChangePriceRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MarketplaceController();


              const promise = controller.changePriceFromListing.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/marketplace/listings',
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.getListings)),

            function MarketplaceController_getListings(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MarketplaceController();


              const promise = controller.getListings.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/marketplace/listings/:tokenId',
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.findManyTokenActivities)),

            function MarketplaceController_findManyTokenActivities(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    tokenId: {"in":"path","name":"tokenId","required":true,"dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"PaginatorQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MarketplaceController();


              const promise = controller.findManyTokenActivities.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/marketplace/direct-listings',
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.getValidListings)),

            function MarketplaceController_getValidListings(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetValidListingsQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MarketplaceController();


              const promise = controller.getValidListings.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/chains/:chainId/ipfs/upload',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            upload.single('file'),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.ipfsUpload)),

            function NftController_ipfsUpload(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    title: {"in":"formData","name":"title","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.ipfsUpload.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/chains/:chainId/erc1155/mint-batch',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.mintBatch)),

            function NftController_mintBatch(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"MintBatchRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.mintBatch.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/chains/:chainId/wallets/:toAddress/erc1155/mint-batch',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.mintBatchTo)),

            function NftController_mintBatchTo(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    toAddress: {"in":"path","name":"toAddress","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"MintBatchToRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.mintBatchTo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/chains/:chainId/erc1155/mint-additional',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.mintAdditionalSupply)),

            function NftController_mintAdditionalSupply(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"MintAdditionalSupplyRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.mintAdditionalSupply.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/erc1155',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.getNFTs)),

            function NftController_getNFTs(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.getNFTs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/wallets/:walletAddress/erc1155',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.getOwnedNFTs)),

            function NftController_getOwnedNFTs(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    walletAddress: {"in":"path","name":"walletAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.getOwnedNFTs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/erc1155/:tokenId',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.getNFT)),

            function NftController_getNFT(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    tokenId: {"in":"path","name":"tokenId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.getNFT.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/erc1155/holders/:contractAddress',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.getNFTOwners)),

            function NftController_getNFTOwners(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    contractAddress: {"in":"path","name":"contractAddress","required":true,"dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetNFTQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.getNFTOwners.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/erc1155/:contractAddress/:tokenId/holders',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.getNFTOwnersByTokenId)),

            function NftController_getNFTOwnersByTokenId(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    contractAddress: {"in":"path","name":"contractAddress","required":true,"dataType":"string"},
                    tokenId: {"in":"path","name":"tokenId","required":true,"dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetNFTQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.getNFTOwnersByTokenId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/chains/:chainId/erc1155/:contractAddress/:tokenId/transactions',
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.getNFTTransactionsByTokenId)),

            function NftController_getNFTTransactionsByTokenId(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    contractAddress: {"in":"path","name":"contractAddress","required":true,"dataType":"string"},
                    tokenId: {"in":"path","name":"tokenId","required":true,"dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetNFTTransactionsByTokenIdQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NftController();


              const promise = controller.getNFTTransactionsByTokenId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/release',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController)),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController.prototype.applyRelease)),

            function ReleaseController_applyRelease(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ApplyReleaseRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ReleaseController();


              const promise = controller.applyRelease.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/release/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController)),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController.prototype.cancelApplyRelease)),

            function ReleaseController_cancelApplyRelease(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ReleaseController();


              const promise = controller.cancelApplyRelease.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/release/approve/:reviewId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController)),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController.prototype.approveRelease)),

            function ReleaseController_approveRelease(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    reviewId: {"in":"path","name":"reviewId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ReleaseController();


              const promise = controller.approveRelease.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/release/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController)),
            ...(fetchMiddlewares<RequestHandler>(ReleaseController.prototype.getReleaseHistories)),

            function ReleaseController_getReleaseHistories(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    requestParams: {"in":"queries","name":"requestParams","required":true,"ref":"PaginatorQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ReleaseController();


              const promise = controller.getReleaseHistories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/tokens/simulates',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(TokenController)),
            ...(fetchMiddlewares<RequestHandler>(TokenController.prototype.simulatesTransferToken)),

            function TokenController_simulatesTransferToken(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"TokenTransferRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TokenController();


              const promise = controller.simulatesTransferToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/tokens',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(TokenController)),
            ...(fetchMiddlewares<RequestHandler>(TokenController.prototype.transferToken)),

            function TokenController_transferToken(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"TokenTransferRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TokenController();


              const promise = controller.transferToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/wallets/:appId/member-access/:walletId',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.toggleMemberAccess)),

            function WalletController_toggleMemberAccess(request: any, response: any, next: any) {
            const args = {
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    walletId: {"in":"path","name":"walletId","required":true,"dataType":"double"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.toggleMemberAccess.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/wallets/:appId/auto-sign/:walletId',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.toggleAutoSign)),

            function WalletController_toggleAutoSign(request: any, response: any, next: any) {
            const args = {
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    walletId: {"in":"path","name":"walletId","required":true,"dataType":"double"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.toggleAutoSign.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/wallets/:chainId/wallets/transfer-token',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.transferToken)),

            function WalletController_transferToken(request: any, response: any, next: any) {
            const args = {
                    chainId: {"default":80001,"in":"path","name":"chainId","required":true,"dataType":"double"},
                    includeRawdata: {"default":true,"in":"query","name":"includeRawData","dataType":"boolean"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"TransferTokenRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.transferToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallets/:chainId/wallets/:appId/detail',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.findWalletDetailByAppId)),

            function WalletController_findWalletDetailByAppId(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.findWalletDetailByAppId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallets/:chainId/wallets/:appId/address',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.findWalletByAppId)),

            function WalletController_findWalletByAppId(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.findWalletByAppId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallets/:chainId/wallets/:walletAddress/transactions',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.getTransactions)),

            function WalletController_getTransactions(request: any, response: any, next: any) {
            const args = {
                    chainId: {"default":97,"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    walletAddress: {"in":"path","name":"walletAddress","required":true,"dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetTransactionsQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.getTransactions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallets/:chainId/:walletAddress/balances',
            authenticateMiddleware([{"cookie":[]},{"token":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.getWalletNFTTokens)),

            function WalletController_getWalletNFTTokens(request: any, response: any, next: any) {
            const args = {
                    chainId: {"in":"path","name":"chainId","required":true,"ref":"SupportChainId"},
                    walletAddress: {"in":"path","name":"walletAddress","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.getWalletNFTTokens.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/webhooks',
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.createWebhook)),

            function WebhookController_createWebhook(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateWebhookRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.createWebhook.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/webhooks',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.findManyWebhooks)),

            function WebhookController_findManyWebhooks(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"PaginatorQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.findManyWebhooks.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/webhooks/apps',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.createAppWebhook)),

            function WebhookController_createAppWebhook(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateAppWebhookRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.createAppWebhook.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/webhooks/apps',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.updateAppWebhook)),

            function WebhookController_updateAppWebhook(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateAppWebhookRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.updateAppWebhook.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/webhooks/apps/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.findManyAppWebhooks)),

            function WebhookController_findManyAppWebhooks(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindManyAppWebhooksQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.findManyAppWebhooks.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/webhooks/apps',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.deleteAppWebhook)),

            function WebhookController_deleteAppWebhook(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DeleteAppWebhookRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.deleteAppWebhook.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/webhooks/logs/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.findManyAppWebhookLogs)),

            function WebhookController_findManyAppWebhookLogs(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindManyAppWebhookLogsQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.findManyAppWebhookLogs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/webhooks/logs/:appId/:no',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.findAppWebhookLog)),

            function WebhookController_findAppWebhookLog(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    no: {"in":"path","name":"no","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.findAppWebhookLog.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/webhooks/resend',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.resendAppWebhook)),

            function WebhookController_resendAppWebhook(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ResendAppWebhookRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.resendAppWebhook.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/webhooks/excel/logs/:appId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WebhookController)),
            ...(fetchMiddlewares<RequestHandler>(WebhookController.prototype.downloadAppWebhookLogsExcel)),

            function WebhookController_downloadAppWebhookLogsExcel(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    appId: {"in":"path","name":"appId","required":true,"dataType":"double"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindManyAppWebhookLogsQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebhookController();


              const promise = controller.downloadAppWebhookLogsExcel.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/workspaces',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController.prototype.createWorkspace)),

            function WorkspaceController_createWorkspace(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateWorkspaceRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceController();


              const promise = controller.createWorkspace.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/workspaces/:id',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController.prototype.updateWorkspace)),

            function WorkspaceController_updateWorkspace(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateWorkspaceRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceController();


              const promise = controller.updateWorkspace.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/workspaces/:id',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController.prototype.findWorkspace)),

            function WorkspaceController_findWorkspace(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceController();


              const promise = controller.findWorkspace.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/workspaces',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceController.prototype.findManyWorkspaces)),

            function WorkspaceController_findManyWorkspaces(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindMAnyWorkspacesQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceController();


              const promise = controller.findManyWorkspaces.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/workspace-members',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController.prototype.findManyWorkspaceMembers)),

            function WorkspaceMemberController_findManyWorkspaceMembers(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"FindMAnyWorkspaceMembersQueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceMemberController();


              const promise = controller.findManyWorkspaceMembers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/workspace-members',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController.prototype.createWorkspaceMember)),

            function WorkspaceMemberController_createWorkspaceMember(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateWorkspaceMemberRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceMemberController();


              const promise = controller.createWorkspaceMember.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/workspace-members',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController.prototype.updateWorkspaceMember)),

            function WorkspaceMemberController_updateWorkspaceMember(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateWorkspaceMemberRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceMemberController();


              const promise = controller.updateWorkspaceMember.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/workspace-members',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController.prototype.deleteWorkspaceMember)),

            function WorkspaceMemberController_deleteWorkspaceMember(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DeleteWorkspaceMemberRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceMemberController();


              const promise = controller.deleteWorkspaceMember.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/workspace-members/invitation',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController.prototype.inviteWorkspaceMember)),

            function WorkspaceMemberController_inviteWorkspaceMember(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"InviteWorkspaceMemberRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceMemberController();


              const promise = controller.inviteWorkspaceMember.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/workspace-members/invitation/:invitationId',
            authenticateMiddleware([{"token":[]},{"cookie":[]},{"devAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController)),
            ...(fetchMiddlewares<RequestHandler>(WorkspaceMemberController.prototype.updateInvitation)),

            function WorkspaceMemberController_updateInvitation(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    invitationId: {"in":"path","name":"invitationId","required":true,"dataType":"double"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateInvitationRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkspaceMemberController();


              const promise = controller.updateInvitation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
