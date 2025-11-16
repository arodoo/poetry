// File: R503Commands.ts
// Purpose: R503 sensor command and response code definitions
// for fingerprint operations.
// All Rights Reserved. Arodi Emmanuel

export enum R503Command {
  GET_IMAGE = 0x01,
  IMAGE_TO_BUFFER1 = 0x02,
  IMAGE_TO_BUFFER2 = 0x03,
  CREATE_TEMPLATE = 0x05,
  STORE_TEMPLATE = 0x06,
  LOAD_TEMPLATE = 0x07,
  SEARCH = 0x04,
  DELETE = 0x0c,
  EMPTY_DB = 0x0d,
  TEMPLATE_COUNT = 0x1d,
  VERIFY_PASSWORD = 0x13,
}

export enum R503Response {
  OK = 0x00,
  ERROR_RECEIVE = 0x01,
  NO_FINGER = 0x02,
  ENROLL_FAIL = 0x03,
  IMAGE_MESSY = 0x06,
  IMAGE_FEW_FEATURE = 0x07,
  NO_MATCH = 0x08,
  NOT_FOUND = 0x09,
  COMBINE_FAIL = 0x0a,
  BAD_LOCATION = 0x0b,
  DB_RANGE = 0x0c,
  TEMPLATE_LOAD_ERROR = 0x0d,
  UPLOAD_FEATURE_FAIL = 0x0e,
  NO_DATA_RECEIVE = 0x0f,
  UPLOAD_IMAGE_FAIL = 0x10,
  DELETE_FAIL = 0x11,
  CLEAR_DB_FAIL = 0x12,
  WRONG_PASSWORD = 0x13,
  INVALID_IMAGE = 0x15,
  FLASH_ERROR = 0x18,
}
