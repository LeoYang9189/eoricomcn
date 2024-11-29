import EoriService from '../services/eoriService.js';

class EoriController {
  async validate(req, res) {
    try {
      const { eoriNumber } = req.body;
      
      // 验证输入
      if (!eoriNumber) {
        return res.status(400).json({
          valid: false,
          message: 'EORI号码不能为空'
        });
      }

      // 验证格式
      if (!/^[A-Z]{2}[0-9A-Z]{1,15}$/.test(eoriNumber)) {
        return res.status(400).json({
          valid: false,
          message: 'EORI号码格式不正确'
        });
      }

      const result = await EoriService.validateEoriNumber(eoriNumber);
      res.json(result);

    } catch (error) {
      console.error('EORI验证控制器错误:', error);
      res.status(500).json({
        valid: false,
        message: '验证服务暂时不可用，请稍后再试'
      });
    }
  }
}

export default new EoriController(); 