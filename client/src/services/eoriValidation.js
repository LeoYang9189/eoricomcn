import axios from 'axios';

// EORI 验证 API 端点
const EORI_API_URL = 'https://ec.europa.eu/taxation_customs/dds2/eos/validation/services/validation';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// 构建 SOAP 请求
const buildSoapRequest = (eoriNumber) => `
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope 
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:val="http://eori.ws.eos.dds.s/">
  <soapenv:Header/>
  <soapenv:Body>
    <val:validateEORI>
      <eori>${eoriNumber}</eori>
    </val:validateEORI>
  </soapenv:Body>
</soapenv:Envelope>
`;

// 解析 SOAP 响应
const parseSoapResponse = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  const result = xmlDoc.querySelector("result");
  if (!result) {
    const errorDesc = xmlDoc.querySelector("errorDescription");
    throw new Error(errorDesc ? errorDesc.textContent : '验证服务暂时不可用');
  }

  return {
    eori: result.querySelector("eori")?.textContent,
    status: parseInt(result.querySelector("status")?.textContent),
    statusDescr: result.querySelector("statusDescr")?.textContent,
    name: result.querySelector("name")?.textContent,
    address: result.querySelector("address")?.textContent,
    street: result.querySelector("street")?.textContent,
    postalCode: result.querySelector("postalCode")?.textContent,
    city: result.querySelector("city")?.textContent,
    country: result.querySelector("country")?.textContent
  };
};

export const validateEORI = async (eoriNumber) => {
  try {
    // 输入验证
    if (!eoriNumber) {
      throw new Error('EORI号码不能为空');
    }

    if (!/^[A-Z]{2}[0-9A-Z]{1,15}$/.test(eoriNumber)) {
      throw new Error('EORI号码格式不正确');
    }

    // 发送 SOAP 请求
    const response = await axios.post(
      `${CORS_PROXY}${encodeURIComponent(EORI_API_URL)}`, 
      buildSoapRequest(eoriNumber),
      {
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': ''
        }
      }
    );

    // 解析响应
    const result = parseSoapResponse(response.data);
    
    return {
      isValid: result.status === 1,
      message: result.status === 1 
        ? `EORI号码有效 - ${result.name || ''} ${result.country || ''}`
        : result.statusDescr || '验证失败',
      details: result.status === 1 ? {
        eori: result.eori,
        name: result.name,
        address: result.address,
        street: result.street,
        postalCode: result.postalCode,
        city: result.city,
        country: result.country
      } : null
    };

  } catch (error) {
    console.error('EORI验证失败:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });

    // 处理不同类型的错误
    let errorMessage = '验证服务暂时不可用，请稍后再试';
    
    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = 'EORI号码不存在';
      } else if (error.response.status === 400) {
        errorMessage = 'EORI号码格式错误';
      }
    } else if (error.message.includes('Network Error')) {
      errorMessage = '网络连接失败，请检查您的网络';
    } else if (error.message.includes('timeout')) {
      errorMessage = '请求超时，请稍后重试';
    }

    throw new Error(errorMessage);
  }
};

// 添加一些测试用例
export const testCases = {
  valid: ['GB123456789000', 'DE987654321000', 'FR123456789000'],
  invalid: ['XX999999999999', 'INVALID', '123456789']
}; 