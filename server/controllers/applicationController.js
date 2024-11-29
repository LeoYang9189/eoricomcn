const Application = require('../models/application');

exports.createApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    const application = new Application({
      ...applicationData,
      applicationId: generateApplicationId(),
      status: 'PENDING',
      createdAt: new Date()
    });

    await application.save();

    res.status(201).json({
      success: true,
      applicationId: application.applicationId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '创建申请失败'
    });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findOneAndUpdate(
      { applicationId },
      { status },
      { new: true }
    );

    res.json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '更新状态失败'
    });
  }
}; 