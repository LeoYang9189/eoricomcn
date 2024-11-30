router.post('/google/verify', async (req, res) => {
  try {
    const { token } = req.body;
    
    // 验证 Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // 在数据库中查找或创建用户
    let user = await User.findOne({ email: payload.email });
    
    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        googleId: payload.sub,
      });
    }
    
    // 生成 JWT token
    const jwtToken = generateToken(user);
    
    res.json({
      success: true,
      user,
      token: jwtToken,
    });
  } catch (error) {
    console.error('Google verify error:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid token',
    });
  }
}); 