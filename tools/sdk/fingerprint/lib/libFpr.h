#ifndef _fm_sdk_
#define _fm_sdk_

#define PS_OK					0x00
#define PS_COMM_ERR				0x01
#define PS_NO_FINGER			0x02
#define PS_GET_IMG_ERR			0x03
#define PS_FP_TOO_DRY			0x04
#define PS_FP_TOO_WET			0x05
#define PS_FP_DISORDER			0x06
#define PS_LITTLE_FEATURE		0x07
#define PS_NOT_MATCH			0x08
#define PS_NOT_SEARCHED			0x09
#define PS_MERGE_ERR			0x0a
#define PS_ADDRESS_OVER			0x0b
#define PS_READ_ERR				0x0c
#define PS_UP_TEMP_ERR			0x0d
#define PS_RECV_ERR				0x0e
#define PS_UP_IMG_ERR			0x0f
#define PS_DEL_TEMP_ERR			0x10
#define PS_CLEAR_TEMP_ERR		0x11
#define PS_SLEEP_ERR			0x12
#define PS_INVALID_PASSWORD		0x13
#define PS_RESET_ERR			0x14
#define PS_INVALID_IMAGE		0x15
#define PS_HANGOVER_UNREMOVE	0X17
#define PS_Unkown				0xff

#define BAUD_RATE_9600			0x01
#define BAUD_RATE_19200			0x02
#define BAUD_RATE_38400			0x04
#define BAUD_RATE_57600			0x06 
#define BAUD_RATE_115200		0x0C

#define DEVICE_USB				0
#define DEVICE_COM				1
#define DEVICE_UDisk			2

#define IMAGE_MAX_W				(256)		
#define IMAGE_MAX_H				(360)		
#define BMP_HEADER_SIZE			(1078)		

#define FTP_MAX_SIZE			(512)		
#define FTP_MAX_CNT				(10000)		
#define MATCH_LOW_LEVEL			(1)			
#define MATCH_HIGH_LEVEL		(5)	

#pragma pack(push,1)
typedef struct
{
	UINT16 wSSR;
	UINT16 wSenType;
	UINT16 wDataSize;
	UINT16 wSecurLevel;
	UINT16 wDeviceAddr[2];
	UINT16 wCFG_PktSize;
	UINT16 wCFG_BaudRate;
	UINT16 wCFG_VID;
	UINT16 wCFG_PID;
	UINT16 wReserved_a[4];
	UINT16 wProductSN[4];
	UINT16 wSWVersion[4];
	UINT16 wManuFacture[4];
	UINT16 wSensorName[4];
	UINT16 wPassWord[2];
	UINT16 wJTAGLockFlg[2];
	UINT16 wSensorInitEntry;
	UINT16 wSensorGetImageEntry;
	UINT16 wReserved_b[19];
	UINT16 wKeyFlag;
	UINT16 wImageWidth;
	UINT16 wImageHeight;
	UINT16 wImageDPI;
	UINT16 wFPTemplateSize;
	UINT16 wEnrollTime;
	UINT16 wbyAuraLed;
	UINT16 wParaBcc;
	UINT16 wParaTabFlg;
}FM_PARAM_CONFIG_TAB;



#pragma pack(pop)
#ifdef __cplusplus
extern "C" {
#endif

	int _stdcall FMGetSdkVerison(char*pChSdkVer);

	int _stdcall FMOpenDeviceTiny(HANDLE* pHandle, int nDeviceType, int iCom = 1, int iBaud = 1, int nPackageSize = 2, int iDevNum = 0);

	int _stdcall FMOpenDeviceEx(HANDLE* pHandle, int nDeviceType, int iCom = 1, int iBaud = 1, int nPackageSize = 2, int iDevNum = 0);

	int _stdcall FMAutoOpen(HANDLE* pHandle, int *type, int nAddr = 0xFFFFFFFF, UINT uPwd = 0x00, int bVfy = 1);

	int _stdcall FMGetDevVerison(char*pChDevVer);

	int _stdcall FMCloseDeviceEx(HANDLE hHandle);

	int _stdcall FMGetImage(HANDLE hHandle, int nAddr);

	int _stdcall FMGenChar(HANDLE hHandle, int nAddr, int iBufferID);

	int _stdcall FMMatch(HANDLE hHandle, int nAddr, int* iScore);

	int _stdcall FMSearch(HANDLE hHandle, int nAddr, int iBufferID, int iStartPage, int iPageNum, int *iMbAddress, int *iscore);

	int _stdcall FMRegModule(HANDLE hHandle, int nAddr);

	int _stdcall FMStoreChar(HANDLE hHandle, int nAddr, int iBufferID, int iPageID);

	int _stdcall FMLoadChar(HANDLE hHandle, int nAddr, int iBufferID, int iPageID);

	int _stdcall FMUpChar(HANDLE hHandle, int nAddr, int iBufferID, unsigned char* pTemplet, int* iTempletLength);

	int _stdcall FMDownChar(HANDLE hHandle, int nAddr, int iBufferID, unsigned char* pTemplet, int iTempletLength);

	int _stdcall FMStoreMultChar(HANDLE hHandle, int nAddr, int num, int iPageID);

	int _stdcall FMLoadMultChar(HANDLE hHandle, int nAddr, int num, int iPageID);

	int _stdcall FMUpMultChar(HANDLE hHandle, int nAddr, int num, unsigned char* pTemplet, int* iTempletLength);

	int _stdcall FMDownMultChar(HANDLE hHandle, int nAddr, int num, unsigned char* pTemplet, int iTempletLength);

	int _stdcall FMUpImage(HANDLE hHandle, int nAddr, unsigned char* pImageData);

	int _stdcall FMDownImage(HANDLE hHandle, int nAddr, unsigned char *pImageData, int iLength);

	int _stdcall FMImgData2BMP(unsigned char* pImgData, int imageWidth, int imageHeight, const char* pImageFile);

	int _stdcall FMImgData2BMPData(unsigned char* pImgData, int imageWidth, int imageHeight, unsigned char* pBmpData);

	int _stdcall FMGetImgDataFromBMP(HANDLE hHandle, const char *pImageFile, unsigned char *pImageData, int *pimageWidth, int *pimageHeight);

	int _stdcall FMDelChar(HANDLE hHandle, int nAddr, int iStartPageID, int nDelPageNum);

	int _stdcall FMEmpty(HANDLE hHandle, int nAddr);

	int _stdcall FMReadParTable(HANDLE hHandle, int nAddr, unsigned char* pParTable);

	int _stdcall FMReadInfPage(HANDLE hHandle, int nAddr, unsigned char* pInf);

	int _stdcall FMTemplateNum(HANDLE hHandle, int nAddr, int *iMbNum);

	int _stdcall FMGenBinImage(HANDLE hHandle, int nAddr, int nImgType);

	int _stdcall FMSetPwd(HANDLE hHandle, int nAddr, unsigned char* pPassword);

	int _stdcall FMVfyPwd(HANDLE hHandle, int nAddr, unsigned char* pPassword);

	int _stdcall FMSetKey(HANDLE hHandle, int nAddr, unsigned char* pKey);

	int _stdcall FMEncrypt(HANDLE hHandle, int nAddr, unsigned char* pData, int iDataLen);

	int _stdcall FMReadInfo(HANDLE hHandle, int nAddr, int nPage, unsigned char* UserContent);

	int _stdcall FMWriteInfo(HANDLE hHandle, int nAddr, int nPage, unsigned char* UserContent);

	int _stdcall FMWriteReg(HANDLE hHandle, int nAddr, int iRegAddr, int iRegValue);

	int _stdcall FMSetBaud(HANDLE hHandle, int nAddr, int nBaudNum);

	int _stdcall FMSetSecurLevel(HANDLE hHandle, int nAddr, int nLevel);

	int _stdcall FMSetPacketSize(HANDLE hHandle, int nAddr, int nSize);

	int _stdcall FMUpChar2File(HANDLE hHandle, int nAddr, int iBufferID, const char* pFileName);

	int _stdcall FMDownCharFromFile(HANDLE hHandle, int nAddr, int iBufferID, const char* pFileName);

	int _stdcall FMGetRandomData(HANDLE hHandle, int nAddr, unsigned char* pRandom);

	int _stdcall FMSetChipAddr(HANDLE hHandle, int nAddr, unsigned char* pChipAddr);

	int _stdcall FMReadIndexTable(HANDLE hHandle, int nAddr, int nPage, unsigned char* UserContent);

	char* _stdcall FMErr2Str(int nErrCode);

	int _stdcall FMGetCharLen(int *pnLen);

	int _stdcall FMReadAuth(HANDLE hHandle, int nAddr, int *isAuth);

	int _stdcall FMCheckFinger(HANDLE hHandle, int nAddr, int *isPressed);

	int _stdcall FMGetChipSN(HANDLE hHandle, int nAddr, unsigned char *pChipSn);

	int _stdcall FMWriteAuth(HANDLE hHandle, int nAddr, unsigned char *pText);

	int _stdcall FMDetectDev(HANDLE hHandle);

	int _stdcall FMAuraLedCtl(HANDLE hHandle, int nAddr, unsigned char chCtlCode, unsigned char chSpeed, unsigned char chColor, unsigned char chTime);


	int _stdcall FMFeatureMatch(unsigned char * pFeatureData1, unsigned char* pFeatureData2, int iLevel);

	int _stdcall FMFeatureSearch(unsigned char *pFeatureData, unsigned char *pFeatureDatas, int iFeatureCnt, int*pIndex);

	int _stdcall FMBurnCode(HANDLE hHandle, int nAddr);
	int _stdcall FMStartUSBUpgrade(HANDLE hHandle, int nAddr, unsigned char type, unsigned int ucrc, unsigned char *pdata, int datalen);
	int _stdcall FMFinishUSBUpgrade(HANDLE hHandle, int nAddr);

	int _stdcall FMStartUartUpgrade(HANDLE hHandle, int nAddr, unsigned char type, unsigned int ucrc, int datalen);
	int _stdcall FMTransUartUpgradeData(HANDLE hHandle, int nAddr, unsigned char *pdata, int packIndex, int packLenth);
	int _stdcall FMFinishUartUpgrade(HANDLE hHandle, int nAddr);
#ifdef __cplusplus
};
#endif

#endif