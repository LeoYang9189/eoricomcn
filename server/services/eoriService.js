import soap from 'soap';
import { promisify } from 'util';

const WSDL_URL = 'https://ec.europa.eu/taxation_customs/dds2/eos/validation/services/validation?wsdl';

class EoriService {
  constructor() {
    this.client = null;
  }

  async getClient() {
    if (!this.client) {
      this.client = await soap.createClient(WSDL_URL);
    }
    return this.client;
  }

  async validateEoriNumber(eoriNumber) {
    try {
      const client = await this.getClient();
      const validateEORI = promisify(client.validateEORI).bind(client);
      
      const result = await validateEORI({ eori: eoriNumber });
      const eoriResult = result?.return?.result?.[0];

      if (!eoriResult) {
        throw new Error('无效的响应格式');
      }

      return {
        valid: eoriResult.status === 1,
        message: eoriResult.status === 1 
          ? '验证成功' 
          : (eoriResult.statusDescr || eoriResult.errorReason || '验证失败'),
        details: eoriResult.status === 1 ? {
          eori: eoriResult.eori,
          name: eoriResult.name,
          address: eoriResult.address,
          street: eoriResult.street,
          postalCode: eoriResult.postalCode,
          city: eoriResult.city,
          country: eoriResult.country
        } : null
      };
    } catch (error) {
      console.error('EORI验证服务错误:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      const client = await this.getClient();
      return !!client;
    } catch (error) {
      console.error('SOAP连接测试失败:', error);
      return false;
    }
  }
}

export default new EoriService(); 